<template>
  <div class="login-container">
    <div class="brand-header">
      <div class="brand">VIOO</div>
    </div>
    <el-card class="login-card" shadow="hover">
      <el-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        label-width="0"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="User"
            :disabled="loading"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            :prefix-icon="Lock"
            show-password
            :disabled="loading"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleLogin"
            style="width: 100%"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="link-text">
            还没有账号？
            <router-link to="/register">立即注册</router-link>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api/auth'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  components: {
    User,
    Lock
  },
  setup() {
    const router = useRouter()
    const loginFormRef = ref(null)
    const form = reactive({
      username: '',
      password: ''
    })
    const loading = ref(false)

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }

    const handleLogin = async () => {
      if (!loginFormRef.value) return
      
      await loginFormRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          try {
            const result = await login(form.username, form.password)
            
            if (result.success) {
              ElMessage.success('登录成功')
              router.push('/')
            } else {
              ElMessage.error(result.message || '登录失败')
            }
          } catch (err) {
            ElMessage.error('网络错误，请稍后重试')
          } finally {
            loading.value = false
          }
        }
      })
    }

    return {
      form,
      rules,
      loading,
      loginFormRef,
      handleLogin,
      User,
      Lock
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-gradient-end) 100%);
  padding: 20px;
}

.brand-header {
  margin-bottom: 40px;
}

.brand {
  font-size: 36px;
  font-weight: 300;
  color: white;
  letter-spacing: 8px;
  text-transform: lowercase;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-card :deep(.el-card__body) {
  padding: 40px;
}

.login-card :deep(.el-form-item) {
  margin-bottom: 20px;
}

.link-text {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.link-text a {
  color: var(--el-color-primary);
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
}

.link-text a:hover {
  text-decoration: underline;
}
</style>
