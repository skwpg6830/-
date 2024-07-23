<template>
  <el-container class="container">
    <appheader class="header" />
    <el-main class="main-content">
      <maincontent />
    </el-main>
    <appfooter class="footer" />
  </el-container>
</template>

<script>
import AppHeader from './components/appheader.vue'
import MainContent from './components/maincontent.vue'
import AppFooter from './components/appfooter.vue'

export default {
  name: 'App',
  components: {
    appheader: AppHeader,
    maincontent: MainContent,
    appfooter: AppFooter
  }
}
</script>

<style>
body,
html,
#app {
  height: 100%;
  margin: 0;
  background-color: #e1f5fe;
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

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  text-align: center;
  background-color: #303133;
  color: white;
  padding: 1em;
}
</style>
