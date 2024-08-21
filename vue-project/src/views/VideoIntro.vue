<template>
  <div class="video-container">
    <video ref="introVideo" autoplay muted loop>
      <source src="@/assets/寶島宣傳影片.mp4" type="video/mp4" />
      您的瀏覽器不支援 HTML5 影片標籤。
    </video>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'VideoIntro',
  setup() {
    onMounted(() => {
      const video = document.querySelector('video')
    })
  }
}
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100vh; /* 影片占滿整個視窗高度 */
  overflow: hidden;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 確保影片覆蓋整個容器 */
}
</style>
