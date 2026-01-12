#!/bin/bash

echo "🛑 停止开发服务器..."

if [ -f ".dev.pids" ]; then
    while read pid; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "   停止进程 $pid..."
            kill "$pid" 2>/dev/null || true
        fi
    done < .dev.pids
    rm -f .dev.pids
    echo "✅ 开发服务器已停止"
else
    echo "ℹ️  没有运行中的开发服务器"
fi

# 停止 MySQL（可选）
read -p "是否停止 MySQL 容器？(y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down
    echo "✅ MySQL 已停止"
fi
