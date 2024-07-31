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
      <h2>歡迎, 管理員</h2>
      <button @click="logout">登出</button>
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
        gender: 'male'
      },
      loginForm: {
        username: '',
        password: ''
      },
      isLoggedIn: false,
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
          gender: this.registerForm.gender
        })
        this.$emit('register-success', response.data)
        // 清除表單輸入
        this.registerForm = {
          username: '',
          password: '',
          confirmPassword: '',
          gender: 'male'
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
      this.$emit('logout-success', '登出成功')
    },
    checkLoginStatus() {
      const token = localStorage.getItem('token')
      if (token) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
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
