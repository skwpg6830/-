<template>
  <el-header :class="{ hidden: isHeaderHidden }">
    <el-row :gutter="30" align="middle">
      <el-col :span="20" :lg="24" :xs="28">
        <a href="#"><img class="logo" src="../assets/logo.png" /></a>
      </el-col>
      <el-col :span="4" :xs="2" class="menu-toggle-col">
        <el-icon class="menu-toggle" @click="toggleMenu">
          <MenuIcon />
        </el-icon>
      </el-col>
    </el-row>
    <el-menu
      class="el-menu-demo"
      :class="{ open: isMenuOpen }"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="1"><a href="#condition" class="red-text">面臨現狀</a></el-menu-item>
      <el-menu-item index="2"><a href="#countermeasures" class="red-text">對策</a></el-menu-item>
      <el-menu-item index="3"><a href="#conversation" class="red-text">交流專區</a></el-menu-item>
      <el-menu-item index="4"><a href="#Appeal" class="red-text">申訴專區</a></el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item v-if="!isLoggedIn" index="5" @click="showRegisterDialog = true">
        <a class="red-text">註冊</a>
      </el-menu-item>
      <el-menu-item v-if="!isLoggedIn" index="6" @click="showLoginDialog = true">
        <a class="red-text">登入</a>
      </el-menu-item>
      <el-menu-item v-if="isAdmin" index="7" @click="manage">
        <a class="red-text">管理</a>
      </el-menu-item>
      <el-menu-item v-if="isLoggedIn" index="8" @click="logout">
        <a class="red-text">登出</a>
      </el-menu-item>
      <el-avatar v-if="isLoggedIn" :src="userAvatar" :size="40" class="user-avatar"></el-avatar>
    </el-menu>

    <!-- 註冊彈窗 -->
    <el-dialog v-model="showRegisterDialog" title="註冊" style="text-align: center">
      <el-form :model="registerForm">
        <el-form-item label="用戶名">
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
            <el-radio value="male">男</el-radio>
            <el-radio value="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年齡">
          <el-select v-model="registerForm.age" placeholder="請選擇年齡">
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
        <el-button type="primary" @click="register">註冊</el-button>
      </template>
    </el-dialog>

    <!-- 登入彈窗 -->
    <el-dialog v-model="showLoginDialog" title="登入" style="text-align: center">
      <el-form :model="loginForm">
        <el-form-item label="用戶名">
          <el-input v-model="loginForm.username" @keyup.enter="login"></el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input type="password" v-model="loginForm.password" @keyup.enter="login"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showLoginDialog = false">取消</el-button>
        <el-button type="primary" @click="login">登入</el-button>
      </template>
    </el-dialog>

    <!-- 管理彈窗 -->
    <el-dialog v-model="showManageDialog" title="申訴內容" style="text-align: center" width="100%">
      <el-table :data="appeals">
        <el-table-column prop="userId.username" label="申訴者" width="150"></el-table-column>
        <el-table-column prop="report" label="被檢舉者" width="150"></el-table-column>
        <el-table-column prop="content" label="申訴內容"></el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="danger" size="small" @click="deleteAppeal(scope.row._id)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button type="info" @click="showManageDialog = false">關閉</el-button>
      </template>
    </el-dialog>
  </el-header>
</template>

<script>
import axios from 'axios'
import { Menu as MenuIcon } from '@element-plus/icons-vue'
import { ElAvatar, ElMessage } from 'element-plus'
import maleAvatar from '../assets/male-avatar.png'
import femaleAvatar from '../assets/female-avatar.png'

const apiBaseUrl = import.meta.env.VITE_API

export default {
  name: 'AppHeader',
  components: {
    MenuIcon,
    ElAvatar
  },
  data() {
    return {
      activeIndex: '1',
      isMenuOpen: false,
      isMobile: window.innerWidth <= 768,
      showRegisterDialog: false,
      showLoginDialog: false,
      showManageDialog: false,
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
      },
      isLoggedIn: false,
      isHeaderHidden: false,
      lastScrollY: 0,
      isAdmin: false,
      userAvatar: '',
      appeals: [] // 添加申訴數據
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
    async register() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        ElMessage.error('密碼和確認密碼不一致')
        return
      }
      try {
        await axios.post(`${apiBaseUrl}/register`, {
          username: this.registerForm.username,
          password: this.registerForm.password,
          gender: this.registerForm.gender,
          age: this.registerForm.age
        })
        ElMessage.success('註冊成功')
        if (this.registerForm.gender === 'male') {
          this.userAvatar = maleAvatar
        } else if (this.registerForm.gender === 'female') {
          this.userAvatar = femaleAvatar
        } else {
          ElMessage.error('無效的性別選擇')
        }
        this.showRegisterDialog = false
        this.checkLoginStatus()
        setTimeout(function () {
          window.location.reload()
        }, 300) // 延遲0.3秒刷新頁面
      } catch (error) {
        if (error.response) {
          ElMessage.error(`伺服器錯誤回應: ${error.response.data}`)
        } else if (error.request) {
          ElMessage.error('沒有收到伺服器回應')
        } else {
          ElMessage.error(`註冊失敗: ${error.message}`)
        }
      }
    },
    async login() {
      try {
        const response = await axios.post(`${apiBaseUrl}/login`, {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        const token = response.data.token
        localStorage.setItem('token', token)
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        this.isAdmin = decodedToken.role === 'admin'
        this.isLoggedIn = true
        this.userAvatar = decodedToken.gender === 'male' ? maleAvatar : femaleAvatar
        this.showLoginDialog = false
        this.$emit('login', true)
        ElMessage.success('登入成功')
        setTimeout(function () {
          window.location.reload()
        }, 300) // 延遲0.3秒刷新頁面
      } catch (error) {
        ElMessage.error(`登入失敗: ${error.message}`)
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.isLoggedIn = false
      this.isAdmin = false
      this.userAvatar = ''
      this.$emit('login', false)
      ElMessage.success('登出成功')
      setTimeout(function () {
        window.location.reload()
      }, 300) //延遲0.3秒刷新頁面
    },
    async manage() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          ElMessage.error('沒有有效的登入資訊')
          return
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }

        const response = await axios.get(`${apiBaseUrl}/appeals`, config)
        this.appeals = response.data
        this.showManageDialog = true
      } catch (error) {
        ElMessage.error('無法加載申訴內容')
      }
    },
    async deleteAppeal(id) {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          ElMessage.error('沒有有效的登入資訊')
          return
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }

        await axios.delete(`${apiBaseUrl}/appeals/${id}`, config)
        this.appeals = this.appeals.filter((appeal) => appeal._id !== id)
        ElMessage.success('申訴已刪除')
      } catch (error) {
        ElMessage.error('無法刪除申訴')
      }
    },
    checkLoginStatus() {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        this.isAdmin = decodedToken.role === 'admin'
        this.isLoggedIn = true
        this.userAvatar = decodedToken.gender === 'male' ? maleAvatar : femaleAvatar
      } else {
        this.isLoggedIn = false
        this.isAdmin = false
        this.userAvatar = ''
      }
    },
    handleScroll() {
      if (window.scrollY > this.lastScrollY) {
        this.isHeaderHidden = true
        if (this.isMobile) {
          this.isMenuOpen = false
        }
      } else {
        this.isHeaderHidden = false
      }
      this.lastScrollY = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
    this.checkLoginStatus()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #03a9f4;
}

.el-header {
  background-color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: top 0.3s; /* 添加過渡效果 */
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.el-header.hidden {
  top: -64px; /* 隱藏 header */
}

.menu-toggle {
  display: none;
  cursor: pointer;
  margin-top: 10px;
  color: #f3efdd; /* 更改此處以改變圖標顏色 */
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

.red-text {
  color: black !important; /* 設置字體顏色為紅色 */
  font-weight: bold;
}

.flex-grow {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.user-avatar {
  margin: 10px 0 0 10px;
  display: flex;
  align-items: center; /* 确保頭像在垂直方向上居中 */
}

.el-dialog {
  display: block !important;
}

@media (max-width: 768px) {
  .el-header {
    height: 64px;
    display: block;
  }

  .menu-toggle {
    display: block;
    font-size: 24px;
    margin-left: 100%;
  }

  .logo {
    margin-top: 2.5%;
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

  .menu-toggle-col {
    justify-content: flex-end;
  }
  .user-avatar {
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
