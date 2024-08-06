<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="appealForm"
    label-width="120px"
    class="form-with-border"
  >
    <el-form-item label="申訴類型" prop="appealType">
      <el-select v-model="form.appealType" placeholder="請選擇">
        <el-option label="謾罵" value="謾罵"></el-option>
        <el-option label="騷擾" value="騷擾"></el-option>
        <el-option label="偏離主題" value="偏離主題"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="被檢舉者" prop="report">
      <el-input v-model="form.report"></el-input>
    </el-form-item>
    <el-form-item label="申訴內容" prop="content">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      form: {
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
    submitForm() {
      this.$refs.appealForm.validate((valid) => {
        if (valid) {
          // 處理表單提交邏輯，如向伺服器發送數據
          console.log('提交成功:', this.form)
          ElMessage.success('提交成功')
        } else {
          console.log('表單驗證失敗')
          ElMessage.error('提交失敗')
          return false
        }
      })
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
