<template>
  <div>
    <el-form :model="form" @submit.prevent="handleSubmit">
      <el-form-item>
        <el-input v-model="form.name" placeholder="討論的主題" />
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" v-model="form.message" placeholder="請輸入訊息" rows="4" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="handleSubmit">送出</el-button>
      </el-form-item>
    </el-form>

    <el-divider />

    <el-card v-for="message in messages" :key="message._id" class="message-card">
      <h4>{{ message.name }}</h4>
      <p>{{ message.message }}</p>
      <el-button type="danger" @click="deleteMessage(message._id)">Delete</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const form = reactive({
  name: '',
  message: ''
})

const messages = reactive([])

const fetchMessages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/messages')
    messages.splice(0, messages.length, ...response.data)
  } catch (error) {
    console.error('獲取留言失敗:', error)
    ElMessage.error('獲取留言失敗: ' + (error.response?.data || '未知錯誤'))
  }
}

const handleSubmit = async () => {
  if (form.name && form.message) {
    try {
      const response = await axios.post('http://localhost:3000/messages', { ...form })
      ElMessage.success(response.data)
      form.name = ''
      form.message = ''
      fetchMessages()
    } catch (error) {
      ElMessage.error('提交失敗: ' + (error.response?.data || '未知錯誤'))
    }
  } else {
    ElMessage.warning('請輸入您的姓名和訊息')
  }
}

const deleteMessage = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/messages/${id}`)
    ElMessage.warning('留言已刪除')
    fetchMessages()
  } catch (error) {
    ElMessage.error('刪除失敗: ' + (error.response?.data || '未知錯誤'))
  }
}

onMounted(fetchMessages)
</script>

<style scoped>
.message-card {
  margin-top: 20px;
}
</style>
