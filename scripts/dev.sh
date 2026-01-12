#!/bin/bash

set -e

echo "🚀 启动本地开发环境..."

# 加载环境变量（如果存在 .env 文件）
if [ -f .env ]; then
    echo "📝 加载 .env 文件..."
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "⚠️  未找到 .env 文件，使用默认配置"
    echo "   提示：可以复制 .env.example 创建 .env 文件来自定义配置"
fi

# 设置默认值（如果环境变量未设置）
export DB_NAME=${DB_NAME:-healthy}
export DB_USER=${DB_USER:-root}
export DB_PASSWORD=${DB_PASSWORD:-password}
export DB_HOST=${DB_HOST:-127.0.0.1}
export DB_PORT=${DB_PORT:-3007}

# 检查 Docker 是否运行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker 未运行，请先启动 Docker"
    exit 1
fi

# 启动 MySQL
echo "📦 启动 MySQL 数据库..."
docker-compose up -d mysql

# 等待 MySQL 就绪
echo "⏳ 等待 MySQL 就绪..."
until docker-compose exec -T mysql mysqladmin ping -h localhost -u${DB_USER} -p${DB_PASSWORD} --silent 2>/dev/null; do
    echo "   等待中..."
    sleep 2
done
echo "✅ MySQL 已就绪"

# 检查前端依赖
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 安装前端依赖..."
    cd frontend && npm install && cd ..
fi

# 检查后端虚拟环境
if [ ! -d "backend/venv" ]; then
    echo "📦 创建后端虚拟环境..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
fi

# 运行数据库迁移
echo "🔄 运行数据库迁移..."
cd backend
./venv/bin/python manage.py migrate
cd ..

# 检查并停止已运行的进程
if [ -f ".dev.pids" ]; then
    echo "🛑 停止已运行的开发服务器..."
    while read pid; do
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
        fi
    done < .dev.pids
    rm -f .dev.pids
fi

# 启动前端开发服务器
echo "🚀 启动前端开发服务器（端口 3008）..."
cd frontend
npm run dev > ../.frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo $FRONTEND_PID > .dev.pids

# 启动后端开发服务器
echo "🚀 启动后端开发服务器（端口 3009）..."
cd backend
# 直接使用虚拟环境中的 python（环境变量已在脚本开头设置）
./venv/bin/python manage.py runserver 0.0.0.0:3009 > ../.backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo $BACKEND_PID >> .dev.pids

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 3

echo ""
echo "✅ 开发环境启动完成！"
echo ""
echo "🌐 访问地址："
echo "   前端: http://localhost:3008（支持热更新）"
echo "   后端 API: http://localhost:3009/api/hello/"
echo ""
echo "📝 管理命令："
echo "   查看前端日志: tail -f .frontend.log"
echo "   查看后端日志: tail -f .backend.log"
echo "   停止服务: ./scripts/stop.sh 或 kill \$(cat .dev.pids)"
echo ""
