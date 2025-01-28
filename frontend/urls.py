from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index),
    path('files/', views.index),
    path('register/', views.index),
]