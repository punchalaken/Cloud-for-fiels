Конечно, я помогу вам составить файл README.md на основе предоставленного критерия. Вот пример такого файла:

# Проект: Cloudfile

## Описание проекта

Файловое хранилище

## Структура проекта

### Основные папки и файлы

- **/cloudfile/**: Содержит это основной стандартный модуль Django

- **/accounts/**: Backend часть ответственная за регистрацию и авторизацию пользователей
  - **/accounts/api.py**: Основные классы API по взаимодействию с пользователем

- **/storage/**: Backend часть ответственная за взаимодействие с файлами
  - **/storage/api.py**: Основные классы API по взаимодействию с файлами (Удалени, Добавлени, Скачивания и т.п.)
  - **/storage/decoder.py**: метод, который разбивает строку оставляя имя файла

- **/frontend/**: Вся логика Frontend
  - **/frontend/src/components/App.jsx**: Базовый компонент react, основной роутинг
  - **/frontend/src/components/axios.jsx**: Компонент для хранения токена
  - **/frontend/src/components/forms/Addfile.jsx**: Компонент для загрузки файла в хранилище
  - **/frontend/src/components/forms/Listfiles.jsx**: Компонент для получения всех файлов пользователя
  - **/frontend/src/components/layout/Header.jsx**: Компонент шапка страницы, с кнопкой для разлогина
  - **/frontend/src/components/pages/Authorization.jsx**: Страница авторизации пользователя
  - **/frontend/src/components/pages/Registration.jsx**: Страница регистрации пользователя
  - **/frontend/src/components/pages/Registration.jsx**: Основная страница прокта с содержанием текущих фалов пользователя
  - **/frontend/templates/frontend/index.html**: Стандартный шаблон Django, со скриптами Bootstrap

- **/files/**: Медиафайлы пользователей

- **/requirements.txt**: Список зависимостей Python

### Дополнительные файлы

- **/README.md**: Текущий документ

## Установка и запуск

1. Установите Python версии 3.9+
2. Установите зависимости:
   ```
   pip install -r requirements.txt
   ```
3. Настройте базу данных
   ```
   python manage.py migrate
   ```
4. Соберите статические элементы
   ```
   python manage.py collectstatic
   ```
5. Запустите сервер:
   ```
   python manage.py runserver
   ```

## Документация API


### POST api/auth/register/

#### Описание:
Регистрация нового пользователя

#### Параметры:
- username: str - Имя пользователя
- email: str - Электронная почта
- password: str - Пароль

#### Ответ:
```json
{
  "user": {
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```
- token: JWT токен для дальнейшей авторизации

#### Примечание:
После успешной регистрации пользователь автоматически получает токен авторизации.

### POST api/auth/login/

#### Описание:
Авторизация существующего пользователя

#### Параметры:
- username: str - Имя пользователя
- password: str - Пароль

#### Ответ:
```json
{
  "user": {
    "username": "string",
    "email": "string"
  },
  "token": "string"
}
```
- token: JWT токен для дальнейшей авторизации

#### Примечание:
Необходимо использовать токен авторизации для доступа к защищенным эндпоинтам.

### GET (Delete, patch is_staf) api/auth/user/

#### Описание:
Получение информации о текущем пользователе

#### Авторизация:
Требуется наличие действительного токена авторизации

#### Ответ:
```json
{
  "username": "string",
  "email": "string"
}
```
- Полная информация о текущем пользователе

#### Примечание:
Этот эндпоинт доступен только авторизованным пользователям.

Конечно, добавлю информацию о logout эндпоинте. Вот обновленная документация:

### POST api/auth/logout/

#### Описание:
Выход из системы

#### Авторизация:
Требуется наличие действительного токена авторизации

#### Ответ:
```json
{
  "message": "Successfully logged out."
}
```

#### Примечание:
- Этот эндпоинт удаляет токен авторизации из базы данных
- После использования этого эндпоинта необходимо повторно войти в систему для доступа к защищенным ресурсам


### GET /api/files/

#### Описание:
Список всех файлов

#### Авторизация:
Требуется наличие действительного токена авторизации

#### Ответ:
```json
[
  {
    "id": int,
    "name": "string",
    "size": int,
    "created_at": "datetime string",
    "updated_at": "datetime string",
    "owner": "string"
  }
]
```

#### Примечание:
- Возвращает список всех файлов, доступных для текущего пользователя
- Можно фильтровать результаты по имени файла

### POST /api/files/

#### Описание:
Загрузка нового файла

#### Параметры:
- file: file object - Файл для загрузки

#### Ответ:
```json
{
  "id": int,
  "name": "string",
  "size": int,
  "created_at": "datetime string",
  "updated_at": "datetime string",
  "owner": "string"
}
```

#### Примечание:
- Файл сохраняется на сервере
- Возвращается информация о загруженном файле

### GET /api/files/shared/{id}/

#### Описание:
Получение ссылки для общего доступа к файлу

#### Параметры:
- id: int - ID файла

#### Ответ:
```json
{
  "id": int,
  "url": "string",
  "expires_at": "datetime string"
}
```

#### Примечание:
- Генерирует временную ссылку для доступа к файлу
- Ссылка имеет ограниченный срок действия

### GET /api/files/download/{id}/

#### Описание:
Получение прямого скачивания файла

#### Параметры:
- id: int - ID файла

#### Ответ:
```json
{
  "filename": "string",
  "content_type": "string",
  "content_length": int
}
```

#### Примечание:
- Возвращает информацию о файле для скачивания
- Файл отправляется клиенту через заголовок Content-Disposition


### POST /api/file/upload/

#### Описание:
Загрузка нового файла

#### Авторизация:
Требуется наличие действительного токена авторизации

#### Параметры:
- file: file object - Файл для загрузки

#### Ответ:
```json
{
  "id": int,
  "name": "string",
  "size": int,
  "created_at": "datetime string",
  "updated_at": "datetime string",
  "owner": "string"
}
```

#### Примечание:
- Файл сохраняется на сервере
- Возвращается информация о загруженном файле

#### Ошибки:
- 400 Bad Request: Если файл пустой или некорректен
- 413 Payload Too Large: Если размер файла превышает максимально допустимый

#### Примечание:
- Эндпоинт использует POST-метод для отправки файла
- Важно указать правильный заголовок Content-Type: multipart/form-data
