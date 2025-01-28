from lib2to3.fixes.fix_input import context

from Scripts.bottle import response
from django.contrib.auth import login
from django.core.files.storage import default_storage
from django.http import HttpResponse, FileResponse, Http404
from django.template.defaultfilters import first
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet

from app.models import Users, Files, Demo
from app.serializers import UserSerializer, FileSerializer, DemoSer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import uuid

# Create your views here.

HOST_NAME = 'http://127.0.0.1:8000/'

# @api_view(["GET"])
# def get_all_users(req):
#     users = Users.objects.all()
#     user_ser = UserSerializer(users, many=True)
#     return Response(user_ser.data)
#
# @api_view(["GET"])
# def create_admin(req):
#     user = Users(id=1, name="admin", login="admin", password="1", admin=True)
#     user.save()
#     user_ser = UserSerializer(user)
#     cont = {
#         "code": 200,
#         "msg": "READY",
#         "user_info": user_ser.data
#     }
#     return Response(cont)
#     # return Response(UserSerializer(user).data)

class UsersViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class FilesViewSet(ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializer

    def create(self, request):
        file_name, user_id = request.data["file_name"],  request.data["user_id"]
        file = Files(file_name=file_name, file_link="", user_id=user_id)
        file.save()
        file_data = FileSerializer(file).data
        content = {
            "status_code": 200,
            "status": "OK",
            "create_object": file_data
        }
        return Response(content)

# def create_file(req):
#     demo = Demo(text="test", user_id=1)
#     demo.save()
#
#     return HttpResponse(demo)

# class DemoViewSet(ModelViewSet):
#     queryset = Demo.objects.all()
#     serializer_class = DemoSer
#     def create(self, req): #Создание
#         text, user_id = req.data["text"], req.data["user_id"]
#         demo = Demo(text=text, user_id=user_id)
#         demo.save()
#         demo_data = DemoSer(demo).data
#         return Response({"statys": demo_data})

@api_view(['GET'])
def getLinkForFile(request, file_id): #Сгенерировать ссылку по file_id GET запросом

    file_link = HOST_NAME + str(uuid.uuid5(uuid.NAMESPACE_URL, file_id))

    counts_update = Files.objects.filter(id=file_id).update(file_link=file_link)


    if counts_update:
        content = {
            "status_code": 200,
            "status": "OK",
            "file_id": file_id,
            "file_link": file_link,
        }
    else:
        content = {
            "status_code": 400,
            "status": "ERROR",
            "error_message": "Ничего не обновилось, хер знает почему"
        }


    return Response(content)

@api_view(["POST"])
def check_password(req):
    # print(req.data)
    user_login, user_password = req.data["login"], req.data["password"]
    search_user = Users.objects.filter(login=user_login, password=user_password)
    user_data = UserSerializer(search_user, many=True).data
    if search_user:
        print("все ок")
        context = {
            "status_code": 200,
            "status": "OK",
            "user": user_data
        }
    else:
        print("нифига не ок")
        context = {
            "status_code": 400,
            "status": "ERROR",
            "error_message": "Неверный логин или пароль"
        }

    return Response(context)

@api_view(["GET"])
def get_files_user(req, user_id):
    files_user = Files.objects.filter(user_id=user_id)
    files_user_data = FileSerializer(files_user, many=True).data
    return Response(files_user_data)

@api_view(['POST'])
def upload_file(request):
    if request.method == 'POST':
        # Проверяем, что файл был загружен
        file = request.FILES["files"]
        user_id = int(request.data.get('user_id')) if request.data.get('user_id') != "undefined" else None

        if not file or not user_id:
            return Response({'error': 'Файл и user_id обязательны.'}, status=status.HTTP_400_BAD_REQUEST)

            # Создаем запись в базе данных
        file_instance = Files(
            file_name=file.name,
            file_link="",
            user_id=user_id
        )
        file_instance.save()

            # Сохраняем файл на жестком диске
        file_name = default_storage.save(str(file_instance.id), file)

            # files_return.append(FileSerializer(file_instance).data)

        return Response({ "files": FileSerializer(file_instance).data }, status=status.HTTP_201_CREATED)

    return Response({'error': 'Неверный метод запроса.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

import os
from django.http import HttpResponse, Http404
from django.conf import settings
from .models import Files

@api_view(['GET'])
def download_file(request, id):
    try:
        # Получаем объект файла по ID
        file_obj = Files.objects.get(id=id)
        file_name_in_media = str(FileSerializer(file_obj).data["id"])
        # print(FileSerializer(file_obj).data["id"])
        # Полный путь к файлу
        file_path = os.path.join(settings.MEDIA_ROOT, file_name_in_media)
        print(file_path)
        # Проверяем, существует ли файл
        if not os.path.exists(file_path):
            raise Http404("File does not exist")

        # Открываем файл для чтения в бинарном режиме
        with open(file_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{file_obj.file_name}"'
            return response
        return Response({"data": 123})
    except Files.DoesNotExist:
        raise Http404("File not found")
    # return Response({"data": id})
