<template>
  <div class="register-container">
    <div class="register-card">
      <h1>注册</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            required
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            required
            :disabled="loading"
          />
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? '注册中...' : '注册' }}
        </button>
        <div class="link-text">
          已有账号？
          <router-link to="/login">立即登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const form = ref({
      username: '',
      password: '',
      confirmPassword: ''
    })
    const loading = ref(false)
    const error = ref('')

    const handleRegister = async () => {
      error.value = ''
      
      // 验证密码确认
      if (form.value.password !== form.value.confirmPassword) {
        error.value = '两次输入的密码不一致'
        return
      }

      // 验证密码长度
      if (form.value.password.length < 6) {
        error.value = '密码长度至少为6位'
        return
      }

      loading.value = true
      try {
        const result = await register(form.value.username, form.value.password)
        
        if (result.success) {
          // 注册成功，跳转到首页或登录页
          const isFirstUser = result.data.user.is_superuser
          if (isFirstUser) {
            alert('恭喜！您是第一个注册用户，已自动设置为超级管理员')
          }
          router.push('/')
        } else {
          error.value = result.message || '注册失败'
          if (result.errors) {
            const errorMessages = Object.values(result.errors).flat()
            if (errorMessages.length > 0) {
              error.value = errorMessages[0]
            }
          }
        }
      } catch (err) {
        error.value = '网络错误，请稍后重试'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      error,
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fee;
  border-radius: 6px;
  border: 1px solid #fcc;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.link-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.link-text a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link-text a:hover {
  text-decoration: underline;
}
</style>
