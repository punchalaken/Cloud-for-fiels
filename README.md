# Дипломный проект по профессии «Fullstack-разработчик на Python»

## Облачное хранилище My Cloud


1. Дипломное [задание](/_README.md)
2. Инструкции по настройке [backend](/backend/README.md) на сервере!
3. Инструкции по настройке [frontend](/frontend/README.md) на сервере!

## Как запустить локально: 

### Запуск backend части приложения: 

1. Переходим в папку бекенд разработки.
```
cd backend
```

2. Устанавливаем окружение.
```
python -m venv venv
```

3. Включаем окружение.
```
venv\Scripts\activate
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

### Запуск frontend части приложения: 

1. Переходим в папку с frontend частью проекта.
```
cd frontend 
```

2. Устанавливаем зависимости.
```
npm i 
```

3. Запускаем проект локально для разработки.
```
npm run dev
```

Доп надстройки:
1. В файле [settings](/backend/mycloud/settings.py) в параметр ALLOWED_HOSTS вносим IP сервера, например: ["89.111.154.234"]
2. В файле [api.ts](/frontend/src/api/api.ts) поменять параметр BASE_URL в зависимости от вашего сервера. Например: export const BASE_URL = 'http://89.111.154.234:80/api';