<template>
  <el-container class="container">
    <appheader class="header" @login="handleLogin" />
    <el-main class="main-content">
      <maincontent v-if="!isLoggedIn" />
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
  padding-top: 64px; /* 根據上方高度调整 */
  padding-bottom: 64px; /* 根據下方高度调整 */
  position: relative; /* 確保子元素能夠正確定位 */
}
</style>
