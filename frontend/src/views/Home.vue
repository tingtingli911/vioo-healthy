<template>
  <div class="home-container">
    <el-header class="header">
      <div class="header-content">
        <h1>健康管理系统</h1>
        <div class="user-info" v-if="user">
          <el-text>欢迎，{{ user.username }}</el-text>
          <el-tag v-if="user.is_superuser" type="warning" effect="dark">
            <el-icon><Star /></el-icon>
            超级管理员
          </el-tag>
          <el-button type="danger" plain @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-button>
        </div>
      </div>
    </el-header>
    <el-main class="content">
      <el-card class="welcome-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>欢迎使用健康管理系统</span>
          </div>
        </template>
        <div v-if="user">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户名">
              {{ user.username }}
            </el-descriptions-item>
            <el-descriptions-item label="用户角色">
              <el-tag v-if="user.is_superuser" type="warning">超级管理员</el-tag>
              <el-tag v-else type="info">普通用户</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">
              {{ formatDate(user.created_at) }}
            </el-descriptions-item>
          </el-descriptions>
          <el-alert
            v-if="user.is_superuser"
            title="您拥有超级管理员权限"
            type="success"
            :closable="false"
            show-icon
            style="margin-top: 20px"
          >
            <template #default>
              <p>作为超级管理员，您可以进行平台级别的操作和管理。</p>
            </template>
          </el-alert>
        </div>
        <el-skeleton v-else :rows="5" animated />
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo, logout } from '../api/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Star, SwitchButton } from '@element-plus/icons-vue'

export default {
  name: 'Home',
  components: {
    Star,
    SwitchButton
  },
  setup() {
    const router = useRouter()
    const user = ref(null)

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN')
    }

    const loadUserInfo = async () => {
      const result = await getUserInfo()
      if (result.success) {
        user.value = result.data.user
      } else {
        ElMessage.warning('未登录或登录已过期')
        router.push('/login')
      }
    }

    const handleLogout = async () => {
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        logout()
        ElMessage.success('已退出登录')
        router.push('/login')
      } catch {
        // 用户取消
      }
    }

    onMounted(() => {
      loadUserInfo()
    })

    return {
      user,
      formatDate,
      handleLogout
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-gradient-end) 100%);
}

.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0;
  height: auto !important;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  color: white;
}

.header-content h1 {
  margin: 0;
  font-size: 1.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info .el-text {
  color: white;
}

.content {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.welcome-card {
  max-width: 800px;
  width: 100%;
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}
</style>
