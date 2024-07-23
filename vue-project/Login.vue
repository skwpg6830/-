<template>
  <el-container>
    <el-header>登入</el-header>
    <el-main>
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登入</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
        password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('登入信息:', this.form)
          // 在此處添加登入邏輯
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
