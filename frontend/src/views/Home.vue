<template>
  <div class="home-container">
    <div class="header">
      <h1>健康管理系统</h1>
      <div class="user-info" v-if="user">
        <span>欢迎，{{ user.username }}</span>
        <span v-if="user.is_superuser" class="badge">超级管理员</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </div>
    <div class="content">
      <div class="welcome-card">
        <h2>欢迎使用健康管理系统</h2>
        <p v-if="user">当前用户：{{ user.username }}</p>
        <p v-if="user && user.is_superuser" class="admin-notice">
          ⭐ 您拥有超级管理员权限
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo, logout } from '../api/auth'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const user = ref(null)

    const loadUserInfo = async () => {
      const result = await getUserInfo()
      if (result.success) {
        user.value = result.data.user
      } else {
        // 未登录或token失效，跳转到登录页
        router.push('/login')
      }
    }

    const handleLogout = () => {
      logout()
      router.push('/login')
    }

    onMounted(() => {
      loadUserInfo()
    })

    return {
      user,
      handleLogout
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.badge {
  background: #ffd700;
  color: #333;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.logout-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.content {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.welcome-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.welcome-card h2 {
  color: #333;
  margin-bottom: 20px;
}

.welcome-card p {
  color: #666;
  margin-bottom: 10px;
  font-size: 16px;
}

.admin-notice {
  color: #ff6b6b;
  font-weight: 600;
  margin-top: 20px;
}
</style>
