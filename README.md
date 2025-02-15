# Дипломный проект по профессии «Fullstack-разработчик на Python»

## Облачное хранилище My Cloud

Ссылка на [frontend часть приложения](https://github.com/punchalaken/frontend-for-clouds/tree/main)

[Ссылка на задеплоинный проект](http://89.111.154.37/)


1. Дипломное [задание](/_README.md)
2. Инструкции по настройке [backend](/backend/README.md) на сервере!
3. Инструкции по настройке [frontend](https://github.com/punchalaken/frontend-for-clouds/blob/main/README.md) на сервере!

## Как запустить локально: 

### Запуск backend части приложения: 

1. Скачиваем репозиторий:
```
git clone https://github.com/punchalaken/Cloud-for-fiels
```

1. Переходим в папку бекенд разработки.
```
cd backend Cloud-for-fiels/backend
```

2. Устанавливаем окружение.
```
python -m venv venv

```

3. Включаем окружение.

Windows:

```
venv\Scripts\activate
```

Linux:

```
source venv/bin/activate
```

4. Устанавливаем зависимости из заранее подготовленного файла requirements.txt.

```
pip install -r requirements.txt
```

5. Заходим в пользователя postgres
```
psql -U postgres 
```

6. Создаем базу данных для миграции.
```
CREATE DATABASE diplom_serv;
```

7. Создаем миграции. 
```
python manage.py migrate 
```

8. Запускаем сервер. 
```
python manage.py runserver
```

### [Запуск frontend части приложения](https://github.com/punchalaken/frontend-for-clouds)

Доп надстройки:
1. В файле [settings](/backend/mycloud/settings.py) в параметр ALLOWED_HOSTS вносим IP сервера, например: ["89.111.154.37"]
2. В файле [api.ts](/frontend/src/api/api.ts) поменять параметр BASE_URL в зависимости от вашего сервера. Например: export const BASE_URL = 'http://89.111.154.37:80/api' - запросы проксируются на 80 порт;
3. Чтобы зайти под администратором ввведите - Логин: admin - Пароль: admin
