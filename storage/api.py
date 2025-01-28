from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .serializers import FilesSerializer
from .models import Files
from django.http import FileResponse
from .decoder import decoded_file_path
import os.path


class FileListAPI(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Files.objects.all()
        else:
            return Files.objects.filter(owner_id=user)


class FileUploadAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Files.objects.all()
    serializer_class = FilesSerializer

    def get_queryset(self):
        user = self.request.user
        return Files.objects.filter(owner_id=user)

    def perform_create(self, serializer):
        files = self.request.FILES['file']
        name, extension = os.path.splitext(files.name)
        new_file_name = self.request.POST['filename'] + extension
        with open(f'files/{new_file_name}', 'wb+') as destination:
            for chunk in files.chunks():
                destination.write(chunk)
        serializer.is_valid()
        serializer.save(owner_id=self.request.user)


class FileSharedLinkAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Files.objects.all()
    serializer_class = FilesSerializer

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'link': f'api/file/download/{serializer.data["download_link"]}'})


class FileDownloadAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    allowed_methods = ['GET']
    queryset = Files.objects.all()
    serializer_class = FilesSerializer

    def retrieve(self, request, pk=None):
        filtered_queryset = self.get_queryset().filter(download_link=pk)
        serializer = self.get_serializer(filtered_queryset, many=True)
        return FileResponse(open(decoded_file_path(serializer), 'rb'))


