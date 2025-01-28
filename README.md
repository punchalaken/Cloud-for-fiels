# Развертывание Курсового проекта 
### Потребуется: 
* Установленный Postgres на компьютер (настройки для БД указаны в файле backend/API/settings.py в переменной DATABASES)
* Наличие npm на компьютере (скачать можно тут https://nodejs.org/en)
* Наличие python на компьютере (скачать можно тут https://www.python.org/downloads/)
  
### 1. Клонировать репозеторий командой git clone https://github.com/punchalaken/Cloud-for-fiels.git

### 2. Открыть папку с проектом и скачать все нужные файлы и фреймфорки выполнить следущие команды  
1. ```cd backend ```
2. ```pip install -r requirements.txt```
3. ```cd ../frontend```
4. ```npm i -D yarn```
5. ```yarn```
6. ```cd .. ```

### 3. Запуск проекта
#### В одном cmd окне
1. ```cd backend```
2. ```python manage.py runserver```
  
(Тестовые запросы к backend лежат в файле requests.http для того что бы их отправить, надо скачать плагин в vsc под названием "REST Client")

#### В другом cmd окне
1. ```cd frontend```
2. ```yarn dev```

   
Что бы прекратить работу проекта, в двух cmd окнах применить комбинацию ctrl+C

#### 4. После запуска проекта, перейти по ссылке http://localhost:5173/

