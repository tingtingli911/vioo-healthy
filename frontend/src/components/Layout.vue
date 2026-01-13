<template>
  <div class="layout-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <div class="logo">
          <span v-if="!isCollapse" class="logo-text">VIOO</span>
          <span v-else class="logo-icon">V</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          class="sidebar-menu"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/weight">
            <el-icon><Document /></el-icon>
            <template #title>体重管理</template>
          </el-menu-item>
          <el-menu-item index="/blood-sugar">
            <el-icon><Document /></el-icon>
            <template #title>血糖管理</template>
          </el-menu-item>
          <el-menu-item index="/health-report">
            <el-icon><Files /></el-icon>
            <template #title>体检报告</template>
          </el-menu-item>
          <el-menu-item index="/ai-recommend">
            <el-icon><MagicStick /></el-icon>
            <template #title>AI 智能推荐</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区 -->
      <el-container>
        <!-- 顶部栏 -->
        <el-header class="header">
          <div class="header-left">
            <el-button
              :icon="isCollapse ? Expand : Fold"
              @click="toggleCollapse"
              text
              class="collapse-btn"
            />
          </div>
          <div class="header-right">
            <div class="user-info" v-if="user">
              <el-text>欢迎，{{ user.username }}</el-text>
              <el-tag v-if="user.is_superuser" type="warning" effect="dark" size="small">
                <el-icon><Star /></el-icon>
                超级管理员
              </el-tag>
              <el-button type="danger" plain size="small" @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-button>
            </div>
          </div>
        </el-header>

        <!-- 内容区域 -->
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserInfo, logout } from '../api/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  House,
  Document,
  Files,
  MagicStick,
  Star,
  SwitchButton,
  Fold,
  Expand
} from '@element-plus/icons-vue'

export default {
  name: 'Layout',
  components: {
    House,
    Document,
    Files,
    MagicStick,
    Star,
    SwitchButton,
    Fold,
    Expand
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const user = ref(null)
    const isCollapse = ref(false)

    const activeMenu = computed(() => {
      return route.path
    })

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
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
      isCollapse,
      activeMenu,
      toggleCollapse,
      handleLogout,
      Fold,
      Expand
    }
  }
}
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  background: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-gradient-end) 100%);
  color: white;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 4px;
}

.logo-text {
  font-size: 24px;
}

.logo-icon {
  font-size: 28px;
}

.sidebar-menu {
  border-right: none;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}

.header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px !important;
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-btn {
  font-size: 20px;
  color: #666;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.main-content {
  padding: 20px;
  background: #f5f5f5;
  min-height: calc(100vh - 60px);
}
</style>
