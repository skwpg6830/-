<template>
  <el-container>
    <el-header>註冊</el-header>
    <el-main>
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="確認密碼" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="性別" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年齡" prop="age">
          <el-select v-model="form.age" placeholder="請選擇年齡">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">註冊</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: ''
      },
      rules: {
        username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
        password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '請確認密碼', trigger: 'blur' }],
        gender: [{ required: true, message: '請選擇性別', trigger: 'change' }],
        age: [{ required: true, message: '請選擇年齡', trigger: 'change' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('註冊信息:', this.form)
          // 在此處添加註冊邏輯
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
