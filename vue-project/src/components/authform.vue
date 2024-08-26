<template>
  <div></div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        age: '' // 年齡字段
      },
      loginForm: {
        username: '',
        password: ''
      },
      isLoggedIn: false,
      isAdmin: false,
      isLoading: false
    }
  },
  methods: {
    async register() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$emit('register-failed', '密碼和確認密碼不一致')
        return
      }

      this.isLoading = true
      try {
        const response = await axios.post(`http://localhost:4000/api/register`, {
          username: this.registerForm.username,
          password: this.registerForm.password,
          gender: this.registerForm.gender,
          age: this.registerForm.age // 發送年齡字段
        })
        this.$emit('register-success', response.data)
        // 清除表單輸入
        this.registerForm = {
          username: '',
          password: '',
          confirmPassword: '',
          gender: 'male',
          age: ''
        }
      } catch (error) {
        this.$emit('register-failed', error.response?.data || '註冊失敗')
      } finally {
        this.isLoading = false
      }
    },
    async login() {
      this.isLoading = true
      try {
        const response = await axios.post(`http://localhost:4000/api/login`, this.loginForm)
        const token = response.data.token
        localStorage.setItem('token', token)
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        this.isAdmin = decodedToken.role === 'admin'
        this.isLoggedIn = true
        this.$emit('login-success', '登入成功')
        // 清除表單輸入
        this.loginForm = {
          username: '',
          password: ''
        }
      } catch (error) {
        this.$emit('login-failed', '登入失敗: ' + (error.response?.data || '未知錯誤'))
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.isLoggedIn = false
      this.isAdmin = false
      this.$emit('logout-success', '登出成功')
    },
    checkLoginStatus() {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        this.isAdmin = decodedToken.role === 'admin'
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
        this.isAdmin = false
      }
    }
  },
  created() {
    this.checkLoginStatus()
  }
}
</script>
