<template>
  <el-form
    :model="appealForm"
    :rules="rules"
    ref="appealForm"
    label-width="120px"
    class="form-with-border"
  >
    <el-form-item label="申訴類型" prop="appealType">
      <el-select v-model="appealForm.appealType" placeholder="請選擇">
        <el-option label="謾罵" value="謾罵"></el-option>
        <el-option label="騷擾" value="騷擾"></el-option>
        <el-option label="偏離主題" value="偏離主題"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="被檢舉者" prop="report">
      <el-input v-model="appealForm.report"></el-input>
    </el-form-item>
    <el-form-item label="申訴內容" prop="content">
      <el-input type="textarea" v-model="appealForm.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitAppeal">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'

const apiBaseUrl = import.meta.env.VITE_API

export default {
  name: 'Appeal',
  data() {
    return {
      appealForm: {
        appealType: '',
        report: '',
        content: ''
      },
      rules: {
        appealType: [{ required: true, message: '請選擇申訴類型', trigger: 'change' }],
        report: [{ required: true, message: '請輸入被檢舉者用戶名', trigger: 'blur' }],
        content: [{ required: true, message: '請輸入申訴內容', trigger: 'blur' }]
      },
      isSubmitting: false
    }
  },
  methods: {
    async submitAppeal() {
      this.$refs.appealForm.validate(async (valid) => {
        if (!valid) {
          ElMessage.error('表單驗證失敗，請檢查輸入')
          return
        }

        try {
          this.isSubmitting = true
          const token = localStorage.getItem('token')
          if (!token) {
            ElMessage.error('未登陸或登陸已過期')
            return
          }

          const response = await axios.post(
            '${apiBaseUrl}/appeals',
            {
              appealType: this.appealForm.appealType,
              report: this.appealForm.report,
              content: this.appealForm.content
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (response.status === 201 || response.status === 200) {
            ElMessage.success('申訴提交成功')
            this.resetForm()
          } else {
            throw new Error('申訴提交失敗')
          }
        } catch (error) {
          if (error.response && error.response.data) {
            ElMessage.error(`申訴提交失敗: ${error.response.data}`)
          } else {
            ElMessage.error('申訴提交失敗')
          }
          console.error('申訴提交失敗:', error)
        } finally {
          this.isSubmitting = false
        }
      })
    },
    resetForm() {
      this.$refs.appealForm.resetFields()
    }
  }
}
</script>

<style scoped>
.form-with-border {
  border: 10px solid black;
  padding: 5% 5% 5% 0;
}
</style>
