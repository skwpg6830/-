<template>
  <div class="video-container">
    <video ref="introVideo" autoplay muted>
      <source src="@/assets/寶島宣傳影片.mp4" type="video/mp4" />
      您的瀏覽器不支援 HTML5 影片標籤。
    </video>
    <el-button @click="skipVideo" class="skip-button">跳過</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

export default {
  name: 'VideoIntro',
  setup() {
    const router = useRouter()

    const skipVideo = () => {
      const video = document.querySelector('video')
      if (video) {
        video.pause()
      }
      sessionStorage.setItem('videoPlayed', 'true')
      window.location.reload()
    }

    return {
      skipVideo
    }
  }
}
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* 確保影片在最上層 */
}

video {
  width: 100%;
  height: auto;
}

.skip-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 10001; /* 確保按鈕在影片上方 */
}
</style>
