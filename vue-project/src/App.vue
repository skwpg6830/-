<template>
  <el-container class="container">
    <appheader class="header" @login="handleLogin" />
    <el-main class="main-content">
      <maincontent v-if="!isLoggedIn" />
      <div v-else>
        <h2>管理介面</h2>
        <button @click="logout">登出</button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AppHeader from './components/appheader.vue'
import MainContent from './components/maincontent.vue'

export default {
  name: 'App',
  components: {
    appheader: AppHeader,
    maincontent: MainContent
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    handleLogin(status) {
      this.isLoggedIn = status
    },
    logout() {
      this.isLoggedIn = false
      localStorage.removeItem('token')
      this.handleLogin(false) // 確保登出後重新渲染
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&display=swap');
body,
html,
#app {
  height: 100%;
  margin: 0;
  background-color: #e1f5fe;
  font-family: 'LXGW WenKai Mono TC', monospace;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.main-content {
  flex: 1;
  padding: 1em;
  padding-top: 64px; /* 根据头部高度调整 */
  padding-bottom: 64px; /* 根据底部高度调整 */
  position: relative; /* 确保子元素能够正确定位 */
}
</style>
