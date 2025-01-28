from rest_framework import serializers

from app.models import Users, Files, Demo


# class UserSerializer(serializers.Serializer):
#
#     # id = serializers.IntegerField()
#     # name = serializers.CharField()
#     # login = serializers.CharField()
#     # password = serializers.CharField()
#     # admin = serializers.BooleanField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'login', 'password', 'admin']

# class FileSerializer(serializers.Serializer):
#
#     id = serializers.IntegerField()
#     user = serializers.IntegerField()
#     file_name = serializers.CharField()
#     file_link = serializers.CharField()
#     date = serializers.DateTimeField()

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'file_name', 'file_link', 'date', 'user_id']

class DemoSer(serializers.ModelSerializer):
    class Meta:
        model = Demo
        fields = ['id', 'text', 'user_id']