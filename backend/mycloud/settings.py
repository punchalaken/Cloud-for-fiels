"""
Django settings for mycloud project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []
# ALLOWED_HOSTS = ["89.111.154.37"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "server",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",  # Должен быть первым для обеспечения безопасности.
    "django.middleware.csrf.CsrfViewMiddleware",  # Защита от CSRF-атак.
    "django.contrib.sessions.middleware.SessionMiddleware",  # Управление сессиями.
    "corsheaders.middleware.CorsMiddleware",  # Должен идти до CommonMiddleware, чтобы CORS заголовки добавлялись к ответам.
    "django.middleware.common.CommonMiddleware",  # Обработка общих запросов, таких как перенаправления.
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Управление аутентификацией.
    "django.contrib.messages.middleware.MessageMiddleware",  # Работа с сообщениями.
    "django.middleware.clickjacking.XFrameOptionsMiddleware",  # Защита от clickjacking.
]

# MIDDLEWARE = [
#     "django.middleware.security.SecurityMiddleware",  # Должен быть первым для обеспечения безопасности.
#     "django.contrib.sessions.middleware.SessionMiddleware",  # Управление сессиями.
#     "django.middleware.common.CommonMiddleware",  # Обработка общих запросов, таких как перенаправления.
#     "django.middleware.csrf.CsrfViewMiddleware",  # Защита от CSRF-атак.
#     "django.contrib.auth.middleware.AuthenticationMiddleware",  # Управление аутентификацией.
#     "django.contrib.messages.middleware.MessageMiddleware",  # Работа с сообщениями.
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",  # Защита от clickjacking.
#     "corsheaders.middleware.CorsMiddleware",  # Должен идти до CommonMiddleware, чтобы CORS заголовки добавлялись к ответам.
# ]

ROOT_URLCONF = "mycloud.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "mycloud.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", "default_db"),
        "HOST": os.getenv("DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("DB_PORT", "5432"),
        "USER": os.getenv("DB_USER", "default_user"),
        "PASSWORD": os.getenv("DB_PASSWORD", "default_password"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CORS_ALLOWED_ORIGIN_REGEXES = [
    "http://localhost:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

AUTH_USER_MODEL = "server.User"

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",  # Стандартный бэкенд
]

STATIC_URL = "/static/"
MEDIA_ROOT = BASE_DIR / "uploads"
MEDIA_URL = "/uploads/"
