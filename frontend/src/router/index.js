import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/weight',
    name: 'Weight',
    component: Index,
    meta: { moduleId: 'weight' }
  },
  {
    path: '/glucose',
    name: 'Glucose',
    component: Index,
    meta: { moduleId: 'glucose' }
  },
  {
    path: '/ai',
    name: 'AI',
    component: Index,
    meta: { moduleId: 'ai' }
  },
  {
    path: '/report',
    name: 'Report',
    component: Index,
    meta: { moduleId: 'report' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查登录状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const publicPages = ['/', '/login', '/register']
  const isPublicPage = publicPages.includes(to.path)
  const protectedPages = ['/weight', '/glucose', '/ai', '/report']

  if (token && (to.path === '/login' || to.path === '/register')) {
    // 已登录但访问登录/注册页，跳转到首页
    next('/')
  } else if (!token && protectedPages.includes(to.path)) {
    // 未登录访问受保护页面，跳转到登录页
    next('/login')
  } else {
    // 允许访问
    next()
  }
})

export default router
