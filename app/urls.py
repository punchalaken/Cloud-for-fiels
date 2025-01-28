from django.urls import path
from rest_framework import routers


from . import views


# router = routers.DefaultRouter()
# router.register(r'cutarea', DualFcaPlanUseViewSet.as_view(), base_name='cutareadel')

urlpatterns = [
    path("", views.Site.as_view(), name="home"),
    path("signup/", views.Site.as_view(), name="signup"),




    path(
        "api/create-user/",
        views.UserViewSet.as_view({
            "post": "create_user"
        }),
        name="create_user",
    ),
    path(
        "api/is-used-login/<str:login>/",
        views.UserViewSet.as_view({
            "get": "is_used_login"
        }),
        name="is_used_login"
    ),
    path(
        "api/is-used-login/<str:email>/",
        views.UserViewSet.as_view({
            "get": "is_used_email"
        }),
        name="is_used_email"
    ),
]
