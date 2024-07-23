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
      <el-menu-item index="4"><a href="#a4">關於我們</a></el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item index="5" @click="showRegisterDialog = true">註冊</el-menu-item>
      <el-menu-item index="6" @click="showLoginDialog = true">登入</el-menu-item>
    </el-menu>
    <!-- 註冊彈窗 -->
    <el-dialog v-model="showRegisterDialog" title="註冊" style="text-align: center">
      <el-form :model="registerForm">
        <el-form-item label="帳號">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="確認密碼">
          <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="性別">
          <el-radio-group v-model="registerForm.gender" placeholder="請選擇性別">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年齡">
          <el-select type="number" v-model="registerForm.age" placeholder="請選擇年齡">
            <el-option label="未滿12歲" value="under_12"></el-option>
            <el-option label="13~18歲" value="13_18"></el-option>
            <el-option label="19~23歲" value="19_23"></el-option>
            <el-option label="24~29歲" value="24_29"></el-option>
            <el-option label="30~39歲" value="30_39"></el-option>
            <el-option label="40~49歲" value="40_49"></el-option>
            <el-option label="50~59歲" value="50_59"></el-option>
            <el-option label="60歲以上" value="60_above"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showRegisterDialog = false">取消</el-button>
        <el-button type="primary" @click="handleRegister">註冊</el-button>
      </template>
    </el-dialog>

    <!-- 登入彈窗 -->
    <el-dialog v-model="showLoginDialog" title="登入" style="text-align: center">
      <el-form :model="loginForm">
        <el-form-item label="帳號">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showLoginDialog = false">取消</el-button>
        <el-button type="primary" @click="handleLogin">登入</el-button>
      </template>
    </el-dialog>
  </el-header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      activeIndex: '1',
      isMenuOpen: false,
      isMobile: window.innerWidth <= 768,
      showRegisterDialog: false,
      showLoginDialog: false,
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: ''
      },
      loginForm: {
        username: '',
        password: ''
      }
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
    },
    handleRegister() {
      console.log('註冊信息:', this.registerForm)
      this.showRegisterDialog = false
      // 在此處添加註冊邏輯
    },
    handleLogin() {
      console.log('登入信息:', this.loginForm)
      this.showLoginDialog = false
      // 在此處添加登入邏輯
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
    display: block;
    background-color: white;
    width: 100px;
    font-size: 24px;
  }

  .el-menu-demo {
    display: none;
    flex-direction: column;
  }

  .el-menu-demo.open {
    display: block;
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
