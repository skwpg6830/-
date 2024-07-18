<template>
  <el-footer class="footer-content">
    <p>版權所有 &copy; 2024</p>
  </el-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer-content {
  padding: 1em;
  text-align: center;
  background-color: transparent;
  color: #ff372e;
}

/* PC版樣式 */
@media (min-width: 769px) {
  .footer-content {
    text-align: center;
  }
}
</style>
