#!/bin/bash

set -e

# 配置
FRONTEND_IMAGE=${FRONTEND_IMAGE:-healthy-frontend:latest}
BACKEND_IMAGE=${BACKEND_IMAGE:-healthy-backend:latest}
COMPOSE_FILE="docker-compose.deploy.yml"

echo "🚀 开始部署到服务器..."
echo "   前端镜像: $FRONTEND_IMAGE"
echo "   后端镜像: $BACKEND_IMAGE"
echo ""

# 检查镜像是否存在
if ! docker images | grep -q "$(echo $FRONTEND_IMAGE | cut -d: -f1)"; then
    echo "❌ 前端镜像不存在: $FRONTEND_IMAGE"
    echo "   请先运行: ./scripts/build.sh"
    exit 1
fi

if ! docker images | grep -q "$(echo $BACKEND_IMAGE | cut -d: -f1)"; then
    echo "❌ 后端镜像不存在: $BACKEND_IMAGE"
    echo "   请先运行: ./scripts/build.sh"
    exit 1
fi

# 停止旧容器
echo "🛑 停止旧容器..."
docker-compose -f "$COMPOSE_FILE" down || true

# 启动新容器
echo "🚀 启动生产环境..."
export BACKEND_IMAGE="$BACKEND_IMAGE"
export FRONTEND_IMAGE="$FRONTEND_IMAGE"
docker-compose -f "$COMPOSE_FILE" up -d

# 等待服务就绪
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
echo ""
echo "📊 服务状态："
docker-compose -f "$COMPOSE_FILE" ps

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址："
echo "   前端: http://localhost:80"
echo "   后端: http://localhost:8000/api/hello/"
echo "   Nginx: http://localhost:8080"
echo ""
echo "📝 查看日志："
echo "   docker-compose -f $COMPOSE_FILE logs -f"
