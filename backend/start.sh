#!/bin/bash
set -e

# 等待数据库就绪
echo "等待数据库连接..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if python manage.py migrate --check 2>/dev/null || python -c "
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthy.settings')
import django
django.setup()
from django.db import connection
connection.ensure_connection()
"; then
        echo "数据库连接成功！"
        break
    fi
    attempt=$((attempt + 1))
    echo "等待数据库连接... ($attempt/$max_attempts)"
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "无法连接到数据库，请检查配置"
    exit 1
fi

# 运行数据库迁移
echo "运行数据库迁移..."
python manage.py migrate

# 启动服务器
echo "启动 Django 服务器..."
python manage.py runserver 0.0.0.0:8000
