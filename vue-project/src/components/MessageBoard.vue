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
import axios from 'axios'

const form = reactive({
  name: '',
  message: ''
})

const messages = reactive([])

const fetchMessages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/messages', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    messages.splice(0, messages.length, ...response.data)
    console.log('獲取留言成功')
  } catch (error) {
    console.error('獲取留言失敗:', error)
  }
}

const handleSubmit = async () => {
  if (form.name && form.message) {
    try {
      const response = await axios.post(
        'http://localhost:3000/messages',
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log('提交成功:', response.data)
      form.name = ''
      form.message = ''
      fetchMessages()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 处理令牌过期
        console.error('身份验证失败，请重新登录')
        localStorage.removeItem('token')
        alert('身份验证失败，请重新登录')
        // 这里可以引导用户到登录页面
      } else {
        console.error('提交失敗:', error)
      }
    }
  } else {
    console.warn('請輸入您的姓名和訊息')
  }
}

const deleteMessage = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log('留言已刪除')
    fetchMessages()
  } catch (error) {
    console.error('刪除失敗:', error)
  }
}

onMounted(fetchMessages)
</script>

<style scoped>
.message-card {
  margin-top: 20px;
}
</style>
