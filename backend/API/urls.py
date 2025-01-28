"""
URL configuration for API project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.routers import DefaultRouter

# from app.views import UsersViewSet, FilesViewSet, get_files_user, getLinkForFile, check_password
from django.contrib import admin
from django.urls import path

from app.views import UsersViewSet, FilesViewSet, getLinkForFile, check_password, get_files_user, upload_file, download_file

# from backend.app.views import download_file

# from app.views import testing

router = DefaultRouter()

router.register("users", UsersViewSet)
router.register("files", FilesViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get_link_for_file/<file_id>/', getLinkForFile),
    path("check_password/", check_password),
    path("get_files_user/<user_id>/", get_files_user),
    path("upload_file/", upload_file),
    path('download_file/<id>/', download_file)
] + router.urls

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
