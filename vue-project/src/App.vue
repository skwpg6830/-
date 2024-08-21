<template>
  <div id="app">
    <VideoIntro v-if="!videoPlayed" />
    <appheader class="header" @login="handleLogin" />
    <el-container class="container">
      <el-main class="main-content">
        <div class="flair flair--3"></div>
        <maincontent />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/appheader.vue'
import MainContent from './components/maincontent.vue'
import VideoIntro from './views/VideoIntro.vue'
import gsap from 'gsap'

export default {
  name: 'App',
  components: {
    appheader: AppHeader,
    maincontent: MainContent,
    VideoIntro: VideoIntro
  },
  setup() {
    const router = useRouter()
    const videoPlayed = ref(sessionStorage.getItem('videoPlayed') === 'true')

    onMounted(() => {
      if (sessionStorage.getItem('videoPlayed') === null) {
        sessionStorage.setItem('videoPlayed', 'true')
      }
    })

    const scrollToContent = () => {
      videoPlayed.value = true
      const mainContent = document.querySelector('.main-content')
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return { videoPlayed, scrollToContent }
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
  },
  mounted() {
    // 設置初始狀態
    gsap.set('.flair', { xPercent: -50, yPercent: -50 })

    // 監聽鼠標移動事件，更新.flair 元素的位置
    window.addEventListener('mousemove', (e) => {
      gsap.to('.flair', {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3'
      })
    })
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
  background-color: #fff;
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

.flair {
  width: 20px;
  height: 20px;
  position: fixed;
  top: 0;
  left: -1%;
  pointer-events: none;
  background: url(/src/assets/鼠標.png) no-repeat center;
  background-size: cover;
  z-index: 9999;
}

@media (min-width: 769px) {
  .flair {
    left: -0.2%;
  }
}
</style>
