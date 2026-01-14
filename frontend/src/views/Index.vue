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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import HomePage from '@/components/pages/HomePage.vue'
import DashboardPage from '@/components/pages/DashboardPage.vue'
import ModulePage from '@/components/pages/ModulePage.vue'

const router = useRouter()
const isLoggedIn = ref(false)
const activeTab = ref('dashboard')

const handleNavigate = (tab) => {
  activeTab.value = tab
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleLogin = () => {
  // 检查是否有 token
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    activeTab.value = 'dashboard'
  } else {
    router.push('/login')
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  activeTab.value = 'home'
  // 退出后回到首页，显示首页内容
  router.push('/')
}

onMounted(() => {
  // 检查登录状态
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    activeTab.value = 'dashboard'
  }
})
</script>
