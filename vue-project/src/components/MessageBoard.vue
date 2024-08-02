<template>
  <div>
    <el-form :model="form" @submit.prevent="handleSubmit">
      <el-form-item>
        <el-input v-model="form.name" placeholder="討論的主題" />
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          v-model="form.message"
          placeholder="請輸入訊息"
          rows="4"
          :style="{ color: form.textColor }"
        />
      </el-form-item>
      <el-form-item>
        <el-color-picker
          v-model="form.textColor"
          @change="handleColorChange"
          @active-change="handleColorChange"
          show-alpha
          :predefine="predefinedColors"
        />
        <span>選擇文字顏色</span>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="handleSubmit">送出</el-button>
      </el-form-item>
    </el-form>

    <el-divider />

    <div
      v-for="(message, index) in messages"
      :key="message._id"
      :class="['message-card', { 'alternate-bg': index % 2 === 0 }]"
    >
      <el-card :style="{ color: message.textColor || '#000' }">
        <div class="message-header">
          <img :src="getAvatarUrl(message.userId)" alt="Avatar" class="avatar" />
          <h4>{{ message.userId.username }}</h4>
        </div>
        <h5>{{ message.name }}</h5>
        <!-- 顯示討論的主題 -->
        <p v-if="!isEditing[message._id]" :style="{ color: message.textColor || '#000' }">
          {{ message.message }}
        </p>
        <el-input
          v-else
          type="textarea"
          v-model="message.editMessage"
          placeholder="請編輯訊息"
          rows="4"
          :style="{ color: message.textColor || '#000' }"
        />
        <el-button v-if="canDelete(message)" type="danger" @click="deleteMessage(message._id)">
          刪除
        </el-button>
        <el-button
          v-if="canEdit(message) && !isEditing[message._id]"
          type="primary"
          @click="startEditing(message._id, message.message)"
        >
          編輯
        </el-button>
        <el-button
          v-if="isEditing[message._id]"
          type="success"
          @click="saveEdit(message._id, message.editMessage)"
        >
          保存
        </el-button>
        <el-button v-if="isEditing[message._id]" type="info" @click="cancelEdit(message._id)">
          取消
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// Import images using ES6 import statements
import femaleAvatar from '@/assets/female-avatar.png'
import maleAvatar from '@/assets/male-avatar.png' // 根據需要替換為正確的路徑

const form = reactive({
  name: '',
  message: '',
  textColor: '#000' // 設置默認顏色為黑色
})
const messages = reactive([])
const userRole = ref('')
const userId = ref('') // 保存當前用戶的 ID

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

const fetchUserRole = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    userRole.value = response.data.role
    userId.value = response.data.userId // 從 response 中獲取用戶 ID
    console.log('用戶角色和ID:', userRole.value, userId.value)
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
      console.log('成功發言:', response.data)
      ElMessage({
        message: '成功發言',
        type: 'success'
      })
      // Reset form fields
      form.name = ''
      form.message = ''
      form.textColor = '#000' // 清空顏色選擇器並重置為默認顏色
      fetchMessages()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('身份驗證失敗，請重新登錄')
        localStorage.removeItem('token')
        alert('身份驗證失敗，請重新登錄')
      } else {
        console.error('提交失敗:', error)
        ElMessage({
          message: '提交失敗',
          type: 'error'
        })
      }
    }
  } else {
    console.warn('請輸入您的姓名和訊息')
    ElMessage({
      message: '請輸入您的姓名和訊息',
      type: 'warning'
    })
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

const canDelete = (message) => {
  return userRole.value === 'admin' || message.userId._id === userId.value
}

const canEdit = (message) => {
  return message.userId._id === userId.value
}

const isEditing = reactive({})

const startEditing = (id, messageContent) => {
  isEditing[id] = true
  const message = messages.find((message) => message._id === id)
  if (message) {
    message.editMessage = messageContent
  }
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

const handleColorChange = (color) => {
  form.textColor = color
}

const getAvatarUrl = (user) => {
  if (user.avatar) {
    return user.avatar
  }
  return user.gender === 'male' ? maleAvatar : femaleAvatar
}

const predefinedColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])

onMounted(() => {
  fetchMessages()
  fetchUserRole()
})
</script>

<style scoped>
.message-card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
}

.alternate-bg {
  background-color: #f5f5f5; /* 替換為所需的交替背景顏色 */
}

.el-card {
  transition: background-color 0.3s;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
