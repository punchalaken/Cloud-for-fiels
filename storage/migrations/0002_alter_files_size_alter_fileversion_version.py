# Generated by Django 5.1 on 2024-08-18 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='size',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='fileversion',
            name='version',
            field=models.IntegerField(),
        ),
    ]
