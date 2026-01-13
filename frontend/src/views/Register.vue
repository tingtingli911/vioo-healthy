<template>
  <div class="register-container">
    <div class="brand-header">
      <div class="brand">VIOO</div>
    </div>
    <el-card class="register-card" shadow="hover">
      <el-form
        :model="form"
        :rules="rules"
        ref="registerFormRef"
        label-width="0"
        @submit.prevent="handleRegister"
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
          />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            size="large"
            :prefix-icon="Lock"
            show-password
            :disabled="loading"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleRegister"
            style="width: 100%"
          >
            {{ loading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="link-text">
            已有账号？
            <router-link to="/login">立即登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'Register',
  components: {
    User,
    Lock
  },
  setup() {
    const router = useRouter()
    const registerFormRef = ref(null)
    const form = reactive({
      username: '',
      password: '',
      confirmPassword: ''
    })
    const loading = ref(false)

    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== form.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
      ]
    }

    const handleRegister = async () => {
      if (!registerFormRef.value) return
      
      await registerFormRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          try {
            const result = await register(form.username, form.password)
            
            if (result.success) {
              const isFirstUser = result.data.user.is_superuser
              if (isFirstUser) {
                ElMessage.success('恭喜！您是第一个注册用户，已自动设置为超级管理员')
              } else {
                ElMessage.success('注册成功')
              }
              router.push('/')
            } else {
              ElMessage.error(result.message || '注册失败')
              if (result.errors) {
                const errorMessages = Object.values(result.errors).flat()
                if (errorMessages.length > 0) {
                  ElMessage.error(errorMessages[0])
                }
              }
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
      registerFormRef,
      handleRegister,
      User,
      Lock
    }
  }
}
</script>

<style scoped>
.register-container {
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
}

.register-card {
  width: 100%;
  max-width: 400px;
}

.register-card :deep(.el-card__body) {
  padding: 40px;
}

.register-card :deep(.el-form-item) {
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
