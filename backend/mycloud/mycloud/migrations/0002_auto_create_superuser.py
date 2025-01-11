# Generated by Django 5.1.4 on 2024-12-21 21:18

from django.db import migrations
from django.contrib.auth import get_user_model


def create_superuser(apps, schema_editor):
    User = get_user_model()
    if not User.objects.filter(is_superuser=True).exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='1qaz@WSX'
        )

class Migration(migrations.Migration):

    dependencies = [
        ("mycloud", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_superuser)
    ]
