<template>
  <div class="min-h-screen bg-background">
    <!-- Not logged in - show landing page -->
    <template v-if="!isLoggedIn">
      <Navbar @login="handleLogin" />
      <HomePage @login="handleLogin" />
    </template>

    <!-- Logged in - show dashboard or module page -->
    <template v-else>
      <DashboardPage
        v-if="activeTab === 'dashboard'"
        @navigate="handleNavigate"
        @logout="handleLogout"
      />
      <ModulePage
        v-else
        :module-id="activeTab"
        @back="() => handleNavigate('dashboard')"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import HomePage from '@/components/pages/HomePage.vue'
import DashboardPage from '@/components/pages/DashboardPage.vue'
import ModulePage from '@/components/pages/ModulePage.vue'

const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(false)
const activeTab = ref('dashboard')

// 根据路由路径设置 activeTab
const setActiveTabFromRoute = () => {
  const path = route.path
  if (path === '/') {
    activeTab.value = 'dashboard'
  } else if (path === '/weight') {
    activeTab.value = 'weight'
  } else if (path === '/glucose') {
    activeTab.value = 'glucose'
  } else if (path === '/exercise') {
    activeTab.value = 'exercise'
  } else if (path === '/report') {
    activeTab.value = 'report'
  } else {
    activeTab.value = 'dashboard'
  }
}

const handleNavigate = (tab) => {
  // 根据 tab 跳转到对应路由
  const routeMap = {
    'dashboard': '/',
    'weight': '/weight',
    'glucose': '/glucose',
    'exercise': '/exercise',
    'report': '/report'
  }
  const targetPath = routeMap[tab] || '/'
  router.push(targetPath)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleLogin = () => {
  // 检查是否有 token
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    setActiveTabFromRoute()
  } else {
    router.push('/login')
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  activeTab.value = 'dashboard'
  // 退出后回到首页，显示首页内容
  router.push('/')
}

// 监听路由变化
watch(() => route.path, () => {
  if (isLoggedIn.value) {
    setActiveTabFromRoute()
  }
})

onMounted(() => {
  // 检查登录状态
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    setActiveTabFromRoute()
  }
})
</script>
