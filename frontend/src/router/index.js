import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Weight from '../views/Weight.vue'
import BloodSugar from '../views/BloodSugar.vue'
import HealthReport from '../views/HealthReport.vue'
import AIRecommend from '../views/AIRecommend.vue'

const routes = [
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
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'weight',
        name: 'Weight',
        component: Weight
      },
      {
        path: 'blood-sugar',
        name: 'BloodSugar',
        component: BloodSugar
      },
      {
        path: 'health-report',
        name: 'HealthReport',
        component: HealthReport
      },
      {
        path: 'ai-recommend',
        name: 'AIRecommend',
        component: AIRecommend
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查登录状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const publicPages = ['/login', '/register']
  const isPublicPage = publicPages.includes(to.path)

  if (!token && !isPublicPage) {
    // 未登录且不是公开页面，跳转到登录页
    next('/login')
  } else if (token && isPublicPage) {
    // 已登录但访问登录/注册页，跳转到首页
    next('/')
  } else {
    next()
  }
})

export default router
