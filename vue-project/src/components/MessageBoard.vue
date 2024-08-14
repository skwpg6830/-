<template>
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
      <el-color-picker v-model="form.textColor" show-alpha :predefine="predefinedColors" />
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
    :class="['message-card', index % 2 === 0 ? 'even' : 'odd']"
  >
    <el-card :style="{ color: message.textColor || '#000' }">
      <div class="message-header">
        <img :src="getAvatarUrl(message.userId)" alt="Avatar" class="avatar" />
        <h4 v-if="message.userId">{{ message.userId.username }}</h4>
      </div>
      <h5 v-if="!isEditing[message._id]">{{ message.name }}</h5>
      <el-input v-else v-model="message.editName" placeholder="請編輯討論的主題" />
      <p v-if="!isEditing[message._id]" :style="{ color: message.textColor || '#000' }">
        {{ message.message }}
      </p>
      <el-input
        v-else
        type="textarea"
        v-model="message.editMessage"
        placeholder="請編輯訊息"
        rows="4"
        :style="{ color: message.editTextColor || '#000' }"
      />
      <el-color-picker
        v-if="isEditing[message._id]"
        v-model="message.editTextColor"
        show-alpha
        :predefine="predefinedColors"
      />
      <div class="message-actions">
        <el-button
          type="success"
          @click="likeMessage(message._id)"
          :disabled="likedMessages.includes(message._id)"
        >
          👍 {{ message.likes }}
        </el-button>
        <el-button
          v-if="likedMessages.includes(message._id)"
          type="danger"
          @click="unlikeMessage(message._id)"
        >
          👎 取消點讚
        </el-button>
        <el-button v-if="canDelete(message)" type="danger" @click="deleteMessage(message._id)">
          刪除
        </el-button>
        <el-button
          v-if="canEdit(message) && !isEditing[message._id]"
          type="primary"
          @click="startEditing(message._id, message.name, message.message, message.textColor)"
        >
          編輯
        </el-button>
        <el-button
          v-if="isEditing[message._id]"
          type="success"
          @click="
            saveEdit(message._id, message.editName, message.editMessage, message.editTextColor)
          "
        >
          保存
        </el-button>

        <el-button type="info" @click="toggleReplyForm(message._id)">
          {{ replyFormVisible[message._id] ? '取消回覆' : '回覆' }}
        </el-button>
      </div>
      <div v-if="replyFormVisible[message._id]" class="reply-form">
        <!-- 監聽Enter按鍵事件 -->
        <el-input
          type="textarea"
          v-model="replyMessage[message._id]"
          @keyup.enter="submitReply(message._id)"
          placeholder="請輸入回覆訊息"
          rows="3"
        />
        <el-button type="primary" @click="submitReply(message._id)">送出回覆</el-button>
      </div>
      <div v-if="message.replies && message.replies.length" class="replies">
        <el-card
          v-for="reply in message.replies"
          :key="reply._id"
          :style="{ color: reply.textColor || '#000' }"
        >
          <div class="reply-header">
            <img :src="getAvatarUrl(reply.userId)" alt="Avatar" class="avatar" />
            <h5 class="username">{{ reply.userId.username }}</h5>
            <el-button
              v-if="canDeleteReply(reply)"
              type="danger"
              @click="deleteReply(message._id, reply._id)"
              >刪除回覆</el-button
            >
          </div>
          <p :style="{ color: reply.textColor || '#000' }">{{ reply.reply }}</p>
        </el-card>
      </div>
    </el-card>
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

// 載入環境變數

console.log(`DB URL: /api`)

const messages = reactive([])
const userRole = ref('')
const userId = ref('') // 保存當前用戶的 ID
const likedMessages = ref([]) // 追踪已點讚的消息
const replyFormVisible = reactive({})
const replyMessage = reactive({})

const likeMessage = async (id) => {
  try {
    await axios.post(
      `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    ElMessage.success('成功點讚')
    likedMessages.value.push(id)
    fetchMessages() // 更新消息列表以反映新的點讚數
  } catch (error) {
    console.error('點讚失敗:', error)
    ElMessage.error('點讚失敗')
  }
}

const unlikeMessage = async (id) => {
  try {
    await axios.post(
      `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages/${id}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    ElMessage.success('成功取消點讚')
    likedMessages.value = likedMessages.value.filter((msgId) => msgId !== id)
    fetchMessages() // 更新消息列表以反映新的點讚數
  } catch (error) {
    console.error('取消點讚失敗:', error)
    ElMessage.error('取消點讚失敗')
  }
}

const fetchMessages = async () => {
  try {
    console.log(`Fetching messages from: /api/messages`)
    const response = await axios.get(`https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response) // 打印出完整的回應數據

    if (Array.isArray(response.data)) {
      messages.splice(
        0,
        messages.length,
        ...response.data.map((message) => ({
          ...message,
          editName: message.name,
          editMessage: message.message,
          editTextColor: message.textColor,
          userId: message.userId || {}, // 確保 userId 存在
          _id: message._id || '' // 確保 _id 存在
        }))
      )
    } else {
      console.error('獲取的數據不是陣列:', response.data)
      ElMessage.error('獲取留言失敗，數據格式錯誤')
    }
  } catch (error) {
    console.error('獲取留言失敗:', error)
    ElMessage.error('獲取留言失敗')
  }
}

const fetchUserRole = async () => {
  try {
    const response = await axios.get(`https://5z3fv5d7-3000.asse.devtunnels.ms/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    userRole.value = response.data.role
    userId.value = response.data.userId // 确保这里的 userId 正确赋值
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('請求錯誤，請檢查請求格式或內容')
    }
  }
}

const handleSubmit = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found, redirecting to login.')
    alert('身份驗證失敗，請重新登錄')
    return
  }
  if (form.name && form.message) {
    try {
      const response = await axios.post(
        `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages`,
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
      if (error.response && error.response.status === 403) {
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
    console.warn('請輸入討論的主題和訊息')
    ElMessage({
      message: '請輸入討論的主題和訊息',
      type: 'warning'
    })
  }
}

const deleteMessage = async (id) => {
  try {
    const response = await axios.delete(
      `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    console.log('刪除回應:', response) // 記錄回應數據
    ElMessage.success('刪除成功')
    console.log('留言已刪除')
    fetchMessages()
  } catch (error) {
    console.error('刪除失敗:', error)
    ElMessage.error('刪除失敗')
  }
}

const deleteReply = async (messageId, replyId) => {
  try {
    console.log(`Deleting reply with messageId: ${messageId}, replyId: ${replyId}`)
    await axios.delete(
      `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages/${messageId}/replies/${replyId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    ElMessage.success('刪除成功')
    console.log('回覆已刪除')
    fetchMessages()
  } catch (error) {
    console.error('刪除回覆失敗:', error)
    ElMessage.error('刪除失敗')
  }
}

const canDelete = (message) => {
  console.log('message:', message)
  console.log('userId:', message.userId)
  return userRole.value === 'admin' || message.userId._id === userId.value
}

const canEdit = (message) => {
  const user = message.userId || {} // 如果 userId 為 undefined，設置為空對象
  return user._id === userId.value
}

const canDeleteReply = (reply) => {
  return userRole.value === 'admin' || reply.userId._id === userId.value
}

const isEditing = reactive({})

const startEditing = (id, name, messageContent, textColor) => {
  isEditing[id] = true
  const message = messages.find((message) => message._id === id)
  if (message) {
    message.editName = name
    message.editMessage = messageContent
    message.editTextColor = textColor
  }
}

const saveEdit = async (id, newName, newMessage, newTextColor) => {
  try {
    await axios.put(
      `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages/${id}`,
      { name: newName, message: newMessage, textColor: newTextColor },
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

const submitReply = async (messageId) => {
  const reply = replyMessage[messageId]
  if (reply) {
    try {
      console.log('提交回覆:', { reply }) // 打印出請求數據
      await axios.post(
        `https://5z3fv5d7-3000.asse.devtunnels.ms/api/messages/${messageId}/replies`,
        { reply }, // 發送的請求
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      ElMessage.success('成功回覆')
      replyMessage[messageId] = '' // 清空回覆框
      fetchMessages() // 更新消息列表
    } catch (error) {
      console.error('回覆失敗:', error)
      ElMessage.error('回覆失敗')
    }
  } else {
    ElMessage.warning('請輸入回覆訊息')
  }
}

const toggleReplyForm = (messageId) => {
  replyFormVisible[messageId] = !replyFormVisible[messageId]
}

const getAvatarUrl = (user) => {
  if (!user) {
    return '' // 或者返回一個默認的 avatar URL
  }
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

.message-card.even {
  background-color: #b5a8a0;
}

.message-card.odd {
  background-color: #cac6bd;
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

.reply-form {
  margin-top: 10px;
}

.replies {
  margin-top: 10px;
}

.reply-header {
  display: flex;
  align-items: center;
}

.username {
  margin: 0;
  margin-right: auto;
}
</style>
