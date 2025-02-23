from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User, File


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'password',
            'last_login',
            'is_superuser',
            'username',
            'is_staff',
            'date_joined',
            'email',
            # 'first_name',
            # 'last_name',
            'is_active',
            'folder_name',
        ]

    def create(self, validated_date):
        validated_date['password'] = make_password(validated_date['password'])
        return super().create(validated_date)
    
    def update(self, instance, validated_date):
        if 'password' in validated_date:
            validated_date['password'] = make_password(validated_date['password'])
        return super().update(instance, validated_date)


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = [
            'id',
            'file_name',
            'upload_date',
            'size',
            'path',
            'unique_id',
            'user_id',
            'last_download_date',
            'comment',
            'file'
        ]

    # проверяем, есть ли уже файл с таким же именем
    def validate(self, attributes):
        if self.instance is None:
            
            name = attributes.get('file_name')

            user_id = attributes.get('user_id') or getattr(self.instance, 'user_id', None) or self.context.get('user_id')
            
            # Если `user_id` не найден в данных, берём его из контекста запроса
            if not user_id and 'request' in self.context:
                user_id = self.context['request'].user.id

            # Проверка существования файла с таким же именем
            file_exists = File.objects.filter(user=user_id, file_name=name).exists()
            
            # Обработка случая, если `name` и `file` не заданы
            if not name and 'file' not in attributes:
                raise serializers.ValidationError("Имя файла или сам файл должны быть указаны.")

            # Генерация пути для нового имени файла
            final_file_name = name or attributes.get('file', None).name
            if file_exists:
                if final_file_name:
                    path, file_name = File().created_path_and_file_name(user_id, final_file_name)
                    attributes['path'] = path
                    attributes['file_name'] = file_name
                else:
                    print("Имя файла не указано и не передано в запросе.")
            else:
                path, file_name = File().created_path_and_file_name(user_id, final_file_name)
                attributes['path'] = path
                attributes['file_name'] = file_name

            return attributes
        else:
            name = attributes.get('file_name')

            user_id = attributes.get('user_id') or getattr(self.instance, 'user_id', None) or self.context.get('user_id')
            # Если `user_id` не найден в данных, берём его из контекста запроса

            # Проверка существования файла с таким же именем
            file_exists = File.objects.filter(user=user_id, file_name=name).exists()
            new_comment = attributes.get('comment')
            if new_comment and self.instance:
                self.instance.comment = new_comment  # Обновляем комментарий в экземпляре
            return attributes



    # создание файла
    def create(self, validated_datа):
        user = validated_datа.get('user_id')
        file_name = validated_datа.get('file_name')
        existing_file = File.objects.filter(user=user, file_name=file_name).first()

        if existing_file:
            # Если объект существует, обновляем его поля, если нужно
            for key, value in validated_datа.items():
                setattr(existing_file, key, value)
            existing_file.save()
            return existing_file
        else:
            # Если объект не существует, создаем новый
            file_instance = File.objects.create(**validated_datа)
            return file_instance

    # обновление файла
    def update(self, instance, validated_data):
        # Обрабатываем `file` только если оно есть в данных для обновления
        for attr, value in validated_data.items():
            if attr == 'file' and value:
                if instance.file and instance.file.name != value.name:
                    instance.file = value
                    instance.size = value.size  # Обновляем размер
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance