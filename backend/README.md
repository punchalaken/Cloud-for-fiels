# Backend

## Развёртывание на сервере Linux ubuntu

### 1. Для удобного управления из своего терминала, скопируйте публичную часть ssh ключа на сервер:  

```bash
cat ~/.ssh/id_rsa.pub
```

- Укажите ключ в соответствующем поле при создании сервера
- Войдите через консоль на сервер:
- где вместо 0.0.0.0 вводим ip созданного сервера.

```bash
ssh root@0.0.0.0
```

------------------------------------------------------------------------

### 2. Создайте нового пользователя

- Вместо user_user вводим имя нового пользователя
- И наделите нового пользователя правами `superuser`

```bash
adduser user_name
usermod user_name -aG sudo
```

- Переключитесь на вновь созданного пользователя:

```bash
sudo -i -u user_name
```

------------------------------------------------------------------------

### 3. Перед установкой обновите список репозиториев и обновите пакеты:

```bash
sudo apt update -y && apt upgrade -y
```

- Устанавливаем следующие пакеты:

```bash
sudo apt-get install python3 python3-venv python3-pip postgresql nginx
```

- Смените пароль пользователя postgres и создайте базу данных

```bash
sudo su postgres
psql
ALTER USER postgres WITH PASSWORD '2312';
CREATE DATABASE diplom_serv;
\q
exit
```

- Склонируйте в корень папки вашего пользователя репозиторий с проектом, перейдите в папку с проектом,  
настройте виртуальное окружение Python и установите пакеты из requirements.txt

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

- Создайте файл тепеменных .env, в котором укажите все переменные, по шаблону из .env.examle

```bash
nano .env
```

- Сделайте миграции:

```bash
python manage.py migrate
```

------------------------------------------------------------------------

### 4. Настройте gunicorn:

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

- Впишите следующий код, где смените `[ubuntu]` на вашего пользователя:

```bash
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=[ubuntu]
WorkingDirectory=/home/[ubuntu]/Cloud-for-fiels/backend
ExecStart=/home/[ubuntu]/Cloud-for-fiels/backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/[ubuntu]/Cloud-for-fiels/backend/gunicorn.sock mycloud.wsgi:application

[Install]
WantedBy=multi-user.target

```

Запустите gunicorn, добавьте в автозагрузку и проверьте его работу

```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl status gunicorn
```

------------------------------------------------------------------------

### 5. Настройте nginx. 
Создадим новый файл конфигурации:

```bash
sudo nano /etc/nginx/sites-available/mycloud
```

Впишите следующий код, смените имя пользователя системы и ip сервера

```bash
server {
    listen 80;
    server_name [Ваш URL];
    root /home/[ubuntu]/Cloud-for-fiels/dist;

    location /media/ {
        alias /home/[ubuntu]/Cloud-for-fiels/backend/mycloud/media/;
        default_type "image/jpg";
    }
    location / {
        try_files $uri /index.html =404;
    }
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/home/[ubuntu]/Cloud-for-fiels/backend/mycloud/project.sock;
    }
    location /a/ {
        include proxy_params;
        proxy_pass http://unix:/home/[ubuntu]/Cloud-for-fiels/backend/mycloud/project.sock;
    }
}
```
- Создайте символическую ссылку на конфиг

```bash
sudo ln -s /etc/nginx/sites-available/mycloud /etc/nginx/sites-enabled
```

Так же поменяем конфиг:

```bash
sudo nano /etc/nginx/nginx.config
```

Впишите следующий код, сменив имя пользователя:

```bash
user [ubuntu];
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
}

http {
    sendfile on;
    tcp_nopush on;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    gzip on;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

- Создайте символическую ссылку на конфиг

```bash
sudo ln -s /etc/nginx/sites-available/mycloud /etc/nginx/sites-enabled
```

- Переопределите конфиг сервера nginx и проверьте его работоспособность:

```bash
sudo systemctl reload nginx
sudo systemctl status nginx
```

### Теперь ваш сайт должен работать, хорошего пользования)
