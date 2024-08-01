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
      <p v-if="!isEditing[message._id]">{{ message.message }}</p>
      <el-input
        v-else
        type="textarea"
        v-model="message.editMessage"
        placeholder="請編輯訊息"
        rows="4"
      />
      <el-button v-if="canEditOrDelete(message)" type="danger" @click="deleteMessage(message._id)"
        >刪除</el-button
      >
      <el-button
        v-if="canEditOrDelete(message) && !isEditing[message._id]"
        type="primary"
        @click="startEditing(message._id, message.message)"
        >編輯</el-button
      >
      <el-button
        v-if="isEditing[message._id]"
        type="success"
        @click="saveEdit(message._id, message.editMessage)"
        >保存</el-button
      >
      <el-button v-if="isEditing[message._id]" type="info" @click="cancelEdit(message._id)"
        >取消</el-button
      >
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const form = reactive({
  name: '',
  message: ''
})

const messages = reactive([])

const userRole = ref('')

const fetchMessages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/messages', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    messages.splice(
      0,
      messages.length,
      ...response.data.map((message) => ({ ...message, editMessage: message.message }))
    )
    console.log('獲取留言成功')
  } catch (error) {
    console.error('獲取留言失敗:', error)
  }
}

// 確保 fetchUserRole 中正確設置 Authorization 頭
const fetchUserRole = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    userRole.value = response.data.role
  } catch (error) {
    console.error('獲取用戶角色失敗:', error)
    if (error.response && error.response.status === 400) {
      console.error('請求錯誤，請檢查請求格式或內容')
    }
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
        // 處理過期
        console.error('身份任證失败，請重新登陸')
        localStorage.removeItem('token')
        alert('身份驗證失败，請重新登陸')
        // 這裡可以引導用戶到登陸頁面
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

const canEditOrDelete = (message) => {
  return userRole.value === 'admin' || message.userId._id === localStorage.getItem('userId')
}

const isEditing = reactive({})

const startEditing = (id, messageContent) => {
  isEditing[id] = true
  // 確認正確使用 messageContent 來初始化編輯狀態
  messages.find((message) => message._id === id).editMessage = messageContent
}

const saveEdit = async (id, newMessage) => {
  try {
    await axios.put(
      `http://localhost:3000/messages/${id}`,
      { message: newMessage },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    console.log('留言已更新')
    fetchMessages()
    isEditing[id] = false
  } catch (error) {
    console.error('編輯失敗:', error)
  }
}

const cancelEdit = (id) => {
  isEditing[id] = false
}

onMounted(() => {
  fetchMessages()
  fetchUserRole()
})
</script>

<style scoped>
.message-card {
  margin-top: 20px;
}
</style>
