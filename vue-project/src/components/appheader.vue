<template>
  <el-header>
    <el-row>
      <el-col :span="18">
        <h1><a href="#">生態永續</a></h1>
      </el-col>
      <el-col :span="6" class="menu-toggle" @click="toggleMenu">
        <i class="el-icon-menu"></i>
      </el-col>
    </el-row>
    <el-menu
      class="el-menu-demo"
      :class="{ open: isMenuOpen }"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="1"><a href="#a1">面臨現狀</a></el-menu-item>
      <el-menu-item index="2"><a href="#a2">對策</a></el-menu-item>
      <el-menu-item index="3"><a href="#a3">交流專區</a></el-menu-item>
      <el-menu-item index="4">關於我們</el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item index="5">註冊</el-menu-item>
      <el-menu-item index="6">登入</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      activeIndex: '1',
      isMenuOpen: false,
      isMobile: window.innerWidth <= 768
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.el-header {
  padding: 0;
  background-color: #2ed64b;
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-toggle {
  display: none;
  justify-content: flex-end;
  cursor: pointer;
  padding: 0 15px;
}

.el-menu-demo {
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  color: white;
  width: 100%;
}

.el-menu-demo.open {
  display: flex;
  flex-direction: column;
}

.flex-grow {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
  }

  .el-menu-demo {
    display: none;
    flex-direction: column;
  }

  .el-menu-demo.open {
    display: flex;
  }

  .flex-grow {
    display: none;
  }
}

@media (min-width: 769px) {
  .menu-toggle {
    display: none;
  }

  .el-menu-demo {
    display: flex;
  }

  .el-menu-demo.open {
    flex-direction: row;
  }
}
</style>
