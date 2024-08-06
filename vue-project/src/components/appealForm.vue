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
      }
    }
  },
  methods: {
    async submitAppeal() {
      try {
        const token = localStorage.getItem('token') // 假設 token 儲存在 localStorage
        await axios.post('http://localhost:3000/appeals', this.appealForm, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        ElMessage.success('申訴提交成功')
        // 清空表單
        this.appealForm.appealType = ''
        this.appealForm.report = ''
        this.appealForm.content = ''
      } catch (error) {
        ElMessage.error('申訴提交失敗')
        console.error('申訴提交失敗:', error)
      }
    },
    resetForm() {
      this.$refs.appealForm.resetFields()
      ElMessage.success('重置成功')
    }
  }
}
</script>

<style scoped>
.form-with-border {
  border: 20px solid #bb9a88;
  box-shadow: inset 0 0 0 10px #ff8a65;
  padding: 5% 5% 5% 0;
}
</style>
