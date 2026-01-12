const API_BASE_URL = '/api'

// 从 localStorage 获取 token
export function getToken() {
  return localStorage.getItem('token')
}

// 保存 token 到 localStorage
export function setToken(token) {
  localStorage.setItem('token', token)
}

// 移除 token
export function removeToken() {
  localStorage.removeItem('token')
}

// 注册
export async function register(username, password) {
  const response = await fetch(`${API_BASE_URL}/users/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  
  const data = await response.json()
  
  if (data.code === 0) {
    // 注册成功，保存 token
    setToken(data.data.token)
    return { success: true, data: data.data }
  } else {
    return { success: false, message: data.message || '注册失败', errors: data.errors }
  }
}

// 登录
export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  
  const data = await response.json()
  
  if (data.code === 0) {
    // 登录成功，保存 token
    setToken(data.data.token)
    return { success: true, data: data.data }
  } else {
    return { success: false, message: data.message || '登录失败' }
  }
}

// 获取用户信息
export async function getUserInfo() {
  const token = getToken()
  if (!token) {
    return { success: false, message: '未登录' }
  }
  
  const response = await fetch(`${API_BASE_URL}/users/info/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  const data = await response.json()
  
  if (data.code === 0) {
    return { success: true, data: data.data }
  } else {
    // token 无效，清除
    removeToken()
    return { success: false, message: data.message || '获取用户信息失败' }
  }
}

// 登出
export function logout() {
  removeToken()
}
