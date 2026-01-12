# healthy
个人健康管理系统

## 技术栈

- **前端**: Vue 3 + Vite
- **后端**: Django 5.0 + Django REST Framework
- **数据库**: MySQL 8.0
- **容器化**: Docker + Docker Compose

## 快速开始

### 场景 1: 本地开发（支持热更新）

#### 前置要求
- Docker（用于运行 MySQL）
- Node.js 18+（用于前端开发）
- Python 3.11+（用于后端开发）

#### 一键启动

**首次运行只需要执行**：
```bash
./scripts/dev.sh
```

这个脚本会自动：
- 启动 MySQL 数据库容器
- 检查并安装前后端依赖（如需要）
- 创建后端虚拟环境（如需要）
- 运行数据库迁移
- **自动启动前端开发服务器（端口 3008）**
- **自动启动后端开发服务器（端口 3009）**

#### 访问地址
- 前端: http://localhost:3008（支持热更新）
- 后端 API: http://localhost:3009/api/hello/

#### 管理命令

```bash
# 查看前端日志
tail -f .frontend.log

# 查看后端日志
tail -f .backend.log

# 停止开发服务器
./scripts/stop.sh

# 停止 MySQL 容器
docker-compose down
```

---

### 场景 2: 部署到服务器

#### 前置要求
- Docker
- Docker Compose

#### 部署步骤

1. **构建 Docker 镜像**：
```bash
./scripts/build.sh
```

可以指定镜像标签：
```bash
./scripts/build.sh healthy-frontend:v1.0.0 healthy-backend:v1.0.0
```

2. **部署到服务器**：
```bash
./scripts/deploy.sh
```

或者指定镜像：
```bash
export FRONTEND_IMAGE=healthy-frontend:v1.0.0
export BACKEND_IMAGE=healthy-backend:v1.0.0
./scripts/deploy.sh
```

#### 访问地址
- 前端: http://localhost:80
- 后端 API: http://localhost:8000/api/hello/
- Nginx 代理: http://localhost:8080

#### 管理命令

```bash
# 查看服务状态
docker-compose -f docker-compose.deploy.yml ps

# 查看日志
docker-compose -f docker-compose.deploy.yml logs -f

# 停止服务
docker-compose -f docker-compose.deploy.yml down

# 重启服务
docker-compose -f docker-compose.deploy.yml restart
```

---

## 项目结构

```
healthy/
├── frontend/              # Vue 前端项目
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/               # Django 后端项目
│   ├── healthy/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── start.sh
├── nginx/                 # Nginx 配置
├── scripts/               # 自动化脚本
│   ├── dev.sh            # 本地开发启动（一键启动所有服务）
│   ├── stop.sh           # 停止开发服务器
│   ├── build.sh          # 构建镜像
│   └── deploy.sh         # 部署到服务器
├── docker-compose.yml     # 本地开发配置（仅 MySQL）
└── docker-compose.deploy.yml # 服务器部署配置
```

## 环境变量配置

### 配置管理说明

项目使用 `.env` 文件统一管理环境变量，所有敏感信息（数据库密码、密钥等）都通过环境变量配置。

#### 首次使用

1. **复制配置模板**：
```bash
cp .env.example .env
```

2. **编辑 `.env` 文件**，根据你的需求修改配置：
```env
# 数据库配置
DB_NAME=healthy
DB_USER=root
DB_PASSWORD=your-password-here
DB_HOST=127.0.0.1
DB_PORT=3007

# Django 配置
SECRET_KEY=your-secret-key-here
DEBUG=True

# Docker 镜像标签（部署时使用）
BACKEND_IMAGE=healthy-backend:latest
FRONTEND_IMAGE=healthy-frontend:latest
```

#### 配置存储位置

- **本地开发**：
  - MySQL 配置：`.env` 文件 → `docker-compose.yml` → MySQL 容器
  - Django 配置：`.env` 文件 → `dev.sh` 脚本 → Django 进程
  - 如果不存在 `.env` 文件，使用默认值（见下方）

- **服务器部署**：
  - 所有配置：`.env` 文件 → `docker-compose.deploy.yml` → 各个容器
  - Docker Compose 会自动读取 `.env` 文件中的环境变量

#### 默认配置（无 .env 文件时）

**本地开发**：
- `DB_NAME=healthy`
- `DB_USER=root`
- `DB_PASSWORD=password`
- `DB_HOST=127.0.0.1`
- `DB_PORT=3007`

**服务器部署**：
- `DB_NAME=healthy`
- `DB_PASSWORD=password`
- `SECRET_KEY=django-insecure-change-this-in-production`
- `BACKEND_IMAGE=healthy-backend:latest`
- `FRONTEND_IMAGE=healthy-frontend:latest`

⚠️ **重要**：`.env` 文件包含敏感信息，已添加到 `.gitignore`，**不要提交到 Git**！

## 注意事项

1. **本地开发**：确保端口 3007、3008、3009 未被占用
2. **服务器部署**：确保端口 80、8000、8080 未被占用
3. **安全**：服务器部署请修改默认密码和 SECRET_KEY
4. **数据库**：首次运行会自动创建数据库和运行迁移
5. **开发服务器**：前后端会在后台运行，日志保存在 `.frontend.log` 和 `.backend.log`

## 许可证

MIT License
