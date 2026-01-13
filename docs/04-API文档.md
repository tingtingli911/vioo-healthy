# API 文档

## API 基础信息

### 基础 URL
- **开发环境**：`http://localhost:3009/api`
- **生产环境**：`http://your-domain.com/api`

### 认证方式
使用 Token 认证，在请求头中携带：
```
Authorization: Bearer <token>
```

### 响应格式
所有 API 响应遵循统一格式：

**成功响应**：
```json
{
  "code": 0,
  "message": "操作成功",
  "data": {
    // 具体数据
  }
}
```

**失败响应**：
```json
{
  "code": 1,
  "message": "错误信息",
  "errors": {
    // 详细错误信息（可选）
  }
}
```

### HTTP 状态码
- `200` - 请求成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 认证失败
- `403` - 权限不足
- `500` - 服务器内部错误

## API 接口列表

### 1. 用户注册

**接口地址**：`POST /api/users/register/`

**权限要求**：无需认证

**请求参数**：
```json
{
  "username": "string",  // 必填，3-20个字符
  "password": "string"   // 必填，至少6个字符
}
```

**请求示例**：
```bash
curl -X POST http://localhost:3009/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "123456"
  }'
```

**响应示例**（成功）：
```json
{
  "code": 0,
  "message": "注册成功",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "is_superuser": true
    },
    "token": "abc123...",
    "expires_at": "2025-02-03T12:00:00Z"
  }
}
```

**响应示例**（失败）：
```json
{
  "code": 1,
  "message": "注册失败",
  "errors": {
    "username": ["用户名已存在"]
  }
}
```

**特殊说明**：
- 第一个注册的用户自动成为超级管理员（`is_superuser: true`）
- 注册成功后自动返回 Token，无需再次登录

---

### 2. 用户登录

**接口地址**：`POST /api/users/login/`

**权限要求**：无需认证

**请求参数**：
```json
{
  "username": "string",  // 必填
  "password": "string"   // 必填
}
```

**请求示例**：
```bash
curl -X POST http://localhost:3009/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "123456"
  }'
```

**响应示例**（成功）：
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "is_superuser": true
    },
    "token": "abc123...",
    "expires_at": "2025-02-03T12:00:00Z"
  }
}
```

**响应示例**（失败）：
```json
{
  "code": 1,
  "message": "用户名或密码错误"
}
```

**特殊说明**：
- Token 有效期为 7 天
- 每次登录会生成新的 Token，旧的 Token 不会立即失效

---

### 3. 获取用户信息

**接口地址**：`GET /api/users/info/`

**权限要求**：需要 Token 认证

**请求头**：
```
Authorization: Bearer <token>
```

**请求示例**：
```bash
curl -X GET http://localhost:3009/api/users/info/ \
  -H "Authorization: Bearer abc123..."
```

**响应示例**（成功）：
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "is_superuser": true,
      "created_at": "2025-01-27T10:00:00Z"
    }
  }
}
```

**响应示例**（失败 - Token 无效）：
```json
{
  "code": 1,
  "message": "Token 无效"
}
```

**响应示例**（失败 - Token 过期）：
```json
{
  "code": 1,
  "message": "Token 已过期"
}
```

---

### 4. 管理后台仪表盘

**接口地址**：`GET /api/users/admin/dashboard/`

**权限要求**：需要 Token 认证 + 超级管理员权限

**请求头**：
```
Authorization: Bearer <token>
```

**请求示例**：
```bash
curl -X GET http://localhost:3009/api/users/admin/dashboard/ \
  -H "Authorization: Bearer abc123..."
```

**响应示例**（成功）：
```json
{
  "code": 0,
  "message": "欢迎使用管理后台",
  "data": {
    "admin_info": {
      "username": "admin",
      "total_users": 10,
      "super_users": 1
    }
  }
}
```

**响应示例**（失败 - 权限不足）：
```json
{
  "code": 1,
  "message": "您没有权限访问此接口"
}
```

---

## Token 认证说明

### Token 格式
- **长度**：40 个字符
- **字符集**：大小写字母 + 数字
- **有效期**：7 天
- **存储位置**：前端 localStorage（key: `token`）

### Token 使用
1. 登录或注册成功后，后端返回 Token
2. 前端保存 Token 到 localStorage
3. 后续请求在请求头中携带：`Authorization: Bearer <token>`
4. 后端验证 Token 有效性
5. Token 过期后需要重新登录

### Token 验证流程
```
1. 前端发送请求，携带 Token
   ↓
2. TokenAuthentication 中间件拦截请求
   ↓
3. 从请求头提取 Token
   ↓
4. 查询数据库验证 Token 是否存在
   ↓
5. 检查 Token 是否过期
   ↓
6. 设置 request.user 为对应用户
   ↓
7. 继续处理请求
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1 | 失败（具体错误信息在 message 中） |

## 数据验证规则

### 用户名
- **必填**：是
- **类型**：字符串
- **长度**：3-20 个字符
- **唯一性**：必须唯一

### 密码
- **必填**：是
- **类型**：字符串
- **最小长度**：6 个字符
- **存储方式**：明文存储（当前版本）

## 前端 API 封装

前端 API 封装在 `frontend/src/api/auth.js`：

```javascript
// 注册
register(username, password)

// 登录
login(username, password)

// 获取用户信息
getUserInfo()

// 登出（清除 Token）
logout()

// Token 管理
getToken()
setToken(token)
removeToken()
```

---

**最后更新**：2025-01-27
