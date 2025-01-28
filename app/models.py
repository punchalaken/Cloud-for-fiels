from django.db import models


class User(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    login = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.TextField()
    role = models.BooleanField()
    created_at = models.DateField()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        db_table = 'users'
        ordering = ['login']

        def __str__(self) -> str:
            return self.first_name