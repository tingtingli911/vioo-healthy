#!/bin/bash

set -e

# 默认镜像标签
FRONTEND_TAG=${1:-healthy-frontend:latest}
BACKEND_TAG=${2:-healthy-backend:latest}

echo "🔨 开始构建 Docker 镜像..."
echo "   前端镜像: $FRONTEND_TAG"
echo "   后端镜像: $BACKEND_TAG"
echo ""

# 构建前端镜像
echo "📦 构建前端镜像..."
cd frontend
docker build -t "$FRONTEND_TAG" .
cd ..
echo "✅ 前端镜像构建完成: $FRONTEND_TAG"
echo ""

# 构建后端镜像
echo "📦 构建后端镜像..."
cd backend
docker build -t "$BACKEND_TAG" .
cd ..
echo "✅ 后端镜像构建完成: $BACKEND_TAG"
echo ""

echo "🎉 所有镜像构建完成！"
echo ""
echo "📝 镜像列表："
docker images | grep -E "(healthy-frontend|healthy-backend)" || true
echo ""
echo "💡 提示：使用以下命令部署到服务器："
echo "   export BACKEND_IMAGE=$BACKEND_TAG"
echo "   export FRONTEND_IMAGE=$FRONTEND_TAG"
echo "   ./scripts/deploy.sh"
