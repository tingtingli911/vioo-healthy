<template>
  <div class="home-container">
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

    <!-- 功能模块卡片 -->
    <div class="modules-grid">
      <el-card class="module-card" shadow="hover" @click="$router.push('/weight')">
        <div class="module-icon">
          <el-icon :size="48" color="var(--theme-primary)"><Document /></el-icon>
        </div>
        <div class="module-title">体重管理</div>
        <div class="module-desc">记录和管理您的体重数据</div>
      </el-card>

      <el-card class="module-card" shadow="hover" @click="$router.push('/blood-sugar')">
        <div class="module-icon">
          <el-icon :size="48" color="var(--theme-primary)"><Document /></el-icon>
        </div>
        <div class="module-title">血糖管理</div>
        <div class="module-desc">追踪您的血糖变化趋势</div>
      </el-card>

      <el-card class="module-card" shadow="hover" @click="$router.push('/health-report')">
        <div class="module-icon">
          <el-icon :size="48" color="var(--theme-primary)"><Files /></el-icon>
        </div>
        <div class="module-title">体检报告</div>
        <div class="module-desc">管理您的体检报告记录</div>
      </el-card>

      <el-card class="module-card" shadow="hover" @click="$router.push('/ai-recommend')">
        <div class="module-icon">
          <el-icon :size="48" color="var(--theme-primary)"><MagicStick /></el-icon>
        </div>
        <div class="module-title">AI 智能推荐</div>
        <div class="module-desc">基于您的数据提供个性化建议</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '../api/auth'
import { ElMessage } from 'element-plus'
import { Document, Files, MagicStick } from '@element-plus/icons-vue'

export default {
  name: 'Home',
  components: {
    Document,
    Files,
    MagicStick
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

    onMounted(() => {
      loadUserInfo()
    })

    return {
      user,
      formatDate
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.module-card {
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  padding: 20px;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.module-icon {
  margin-bottom: 15px;
}

.module-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.module-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}
</style>
