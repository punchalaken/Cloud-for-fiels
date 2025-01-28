from django.db import models
from django.contrib.auth.hashers import make_password

class Users(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    login = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # Храните зашифрованный пароль
    admin = models.BooleanField(default=False)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.login

class Files(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    # id = models.AutoField(primary_key=True)
    file_name = models.CharField(max_length=255)
    file_link = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name


class Demo(models.Model):
    text = models.CharField()
    user = models.ForeignKey(Users, on_delete=models.CASCADE)