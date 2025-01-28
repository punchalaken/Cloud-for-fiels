from datetime import datetime
import json

from django.contrib.auth.hashers import make_password
from django.views.generic import TemplateView
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from app.models import User
from app.serializers import UserSerializer
from django.contrib.auth.hashers import Argon2PasswordHasher
import os

from django.core import serializers


class Site(TemplateView):
    template_name = "index.html"


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "login"
    ph = Argon2PasswordHasher()

    @action(detail=True, methods=["get"])
    def is_used_login(self, request, login=None):
        print(login)
        return Response(
            data={
                "message": login
            },
            status=status.HTTP_200_OK
        )
        # login = request.query_params["login"]
        # is_already_used = User.objects.filter(login=login)
        #
        # if is_already_used:
        #     return Response(
        #         data={
        #             "status": "Error",
        #             "message": "Login is already used"
        #         },
        #         status=status.HTTP_200_OK
        #     )
        #
        # return Response(
        #     data={
        #         "status": "Success",
        #         "message": "Login is not used"
        #     },
        #     status=status.HTTP_200_OK
        # )

    @action(detail=False, methods=["get"])
    def is_used_email(self, request):
        email = request.query_params["email"]
        is_already_used = User.objects.filter(email=email)

        if is_already_used:
            return Response(
                data={
                    "status": "Error",
                    "message": "Email is already used"
                },
                status=status.HTTP_200_OK
            )

        return Response(
            data={
                "status": "Success",
                "message": "Email is not used"
            },
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=["post"])
    def create_user(self, request):
        salt = self.ph.salt()

        # psw = make_password(request.data["password"])

        # new_user = self.serializer_class(data=request.data)
        # new_user.is_valid(raise_exception=True)
        # new_user.save()
        # print(new_user)
        # data.password = psw
        #
        # User.objects.user_create(data)

        return Response(data={"hash": self.ph.encode("npukojiucm", salt),
                              "salt": salt,
                              "verify": self.ph.verify("npukojiucm", "")}, status=status.HTTP_201_CREATED)


class Files(ModelViewSet):
    def create_folder(self, request):
        folder_name = request.data.get("folder_name")
