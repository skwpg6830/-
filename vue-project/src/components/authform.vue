<template>
  <div>
    <!-- 註冊表單 -->
    <form v-if="!isLoggedIn" @submit.prevent="register">
      <h2>註冊</h2>
      <label for="username">用戶名:</label>
      <input type="text" v-model="registerForm.username" required />
      <label for="password">密碼:</label>
      <input type="password" v-model="registerForm.password" required />
      <label for="confirmPassword">確認密碼:</label>
      <input type="password" v-model="registerForm.confirmPassword" required />
      <label for="gender">性別:</label>
      <select v-model="registerForm.gender">
        <option value="male">男</option>
        <option value="female">女</option>
      </select>
      <label for="age">年齡:</label>
      <select v-model="registerForm.age" required>
        <!-- 改為選擇框 -->
        <option value="under_12">12以下</option>
        <option value="13_18">13-18</option>
        <option value="19_23">19-23</option>
        <option value="24_29">24-29</option>
        <option value="30_39">30-39</option>
        <option value="40_49">40-49</option>
        <option value="50_59">50-59</option>
        <option value="60_above">60以上</option>
      </select>
      <button type="submit" :disabled="isLoading">註冊</button>
    </form>

    <!-- 登入表單 -->
    <form v-if="!isLoggedIn" @submit.prevent="login">
      <h2>登入</h2>
      <label for="username">用戶名:</label>
      <input type="text" v-model="loginForm.username" required />
      <label for="password">密碼:</label>
      <input type="password" v-model="loginForm.password" required />
      <button type="submit" :disabled="isLoading">登入</button>
    </form>

    <!-- 管理和登出選項 -->
    <div v-if="isLoggedIn">
      <h2>歡迎, {{ isAdmin ? '管理員' : '用戶' }}</h2>
      <button @click="logout">登出</button>
      <button v-if="isAdmin" @click="manage">管理</button>
    </div>
  </div>
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
        const response = await axios.post('http://localhost:3000/register', {
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
        const response = await axios.post('http://localhost:3000/login', this.loginForm)
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
    },
    manage() {
      // 添加你的管理界面邏輯
      this.$emit('manage', '管理功能啟動')
    }
  },
  created() {
    this.checkLoginStatus()
  }
}
</script>

<style scoped>
form {
  max-width: 300px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}

label {
  margin-top: 1em;
  display: block;
}

button {
  margin-top: 1em;
}
</style>
