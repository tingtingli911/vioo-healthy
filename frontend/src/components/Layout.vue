<template>
  <div class="layout-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <!-- Logo 区域 -->
        <div class="logo">
          <span v-if="!isCollapse" class="logo-text">VIOO</span>
          <span v-else class="logo-icon">V</span>
          <el-button
            :icon="isCollapse ? Expand : Fold"
            @click="toggleCollapse"
            text
            class="collapse-btn"
          />
        </div>

        <!-- 导航菜单 -->
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

        <!-- 用户信息区域（底部） -->
        <div class="user-section" v-if="user">
          <el-popover
            placement="right"
            trigger="hover"
            popper-class="user-popover"
            :show-arrow="false"
          >
            <template #reference>
              <div class="user-info">
                <el-avatar :size="40" class="user-avatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <div v-if="!isCollapse" class="user-details">
                  <div class="user-name">{{ user.username }}</div>
                </div>
              </div>
            </template>

            <div class="user-popover-content">
              <div class="user-popover-name">{{ user.username }}</div>
              <el-button
                text
                class="user-popover-item"
                @click="handleEditProfile"
              >
                编辑个人信息
              </el-button>
              <el-button
                text
                class="user-popover-item user-popover-logout"
                @click="handleLogout"
              >
                退出登录
              </el-button>
            </div>
          </el-popover>
        </div>
      </el-aside>

      <!-- 主内容区 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
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
  User,
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
    User,
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

    const handleEditProfile = () => {
      // 个人信息编辑功能占位：后续可以跳转到个人中心页
      ElMessage.info('个人信息编辑功能开发中，敬请期待')
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
      handleEditProfile,
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
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
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

.collapse-btn {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  padding: 4px;
}

.collapse-btn:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}

.user-section {
  border-top: 1px solid #f0f0f0;
  padding: 16px;
  background: #fafafa;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar {
  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-gradient-end) 100%);
  color: white;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-popover {
  min-width: 160px;
}

.user-popover-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-popover-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.user-popover-item {
  width: 100%;
  justify-content: flex-start;
  padding: 4px 0;
  font-size: 13px;
  color: #374151;
}

.user-popover-item:hover {
  background-color: transparent;
  color: var(--el-color-primary);
}

.user-popover-logout {
  color: #374151;
}

.user-popover-logout:hover {
  color: #dc2626;
}

.main-content {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
  overflow-y: auto;
}
</style>
