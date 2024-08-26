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
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:4000/api/public/upload"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      name="images"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">請拖曳或<em>點擊上傳</em></div>
      <template #tip>
        <div class="el-upload__tip">檔案不超過2mb</div>
      </template>
    </el-upload>
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
      <!-- 新增這部分來顯示圖片 -->
      <div v-if="message.images && message.images.length" class="message-images">
        <img
          v-for="(image, index) in message.images"
          :key="index"
          :src="getImageUrl(image)"
          alt="Message Image"
          class="message-image"
        />
      </div>
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
import { UploadFilled } from '@element-plus/icons-vue'

import femaleAvatar from '@/assets/female-avatar.png'
import maleAvatar from '@/assets/male-avatar.png' // 根據需要替換為正確的路徑

const message = ref({
  images: [
    // 示例圖片路徑
    'public/uploads/1723777967625-antler-899123_640.jpg'
  ]
})

const getImageUrl = (imagePath) => {
  // 確保路徑是正確的
  const url = imagePath.startsWith('http')
    ? imagePath
    : `http://localhost:4000/${imagePath.replace(/^public\//, '')}` // 去掉 'public/' 前綴
  // console.log('生成的圖片 URL:', url)
  return url
}

const form = reactive({
  name: '',
  message: '',
  textColor: '#000', // 設置默認顏色為黑色
  images: [] // 用於存儲圖片數據
})

// 載入環境變數

// console.log(`DB URL: /api`)

const messages = reactive([])
const userRole = ref('')
const userId = ref('') // 保存當前用戶的 ID
const likedMessages = ref([]) // 追踪已點讚的消息
const replyFormVisible = reactive({})
const replyMessage = reactive({})

const likeMessage = async (id) => {
  try {
    await axios.post(
      `http://localhost:4000/api/messages/${id}/like`,
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
      `http://localhost:4000/api/messages/${id}/unlike`,
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
    const response = await axios.get(`http://localhost:4000/api/messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response)

    if (Array.isArray(response.data)) {
      messages.splice(
        0,
        messages.length,
        ...response.data.map((message) => ({
          ...message,
          editName: message.name,
          editMessage: message.message,
          editTextColor: message.textColor,
          images: message.images || [], // 確保圖片數據存在
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
    const response = await axios.get(`http://localhost:4000/api/user`, {
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

// 送出留言並上傳圖片
const handleSubmit = async () => {
  if (form.name && form.message) {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        ElMessage.error('未登錄或登錄已過期')
        return
      }

      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('message', form.message)
      formData.append('textColor', form.textColor)

      // 確保 form.images 是一個數組
      if (Array.isArray(form.images)) {
        form.images.forEach((image) => {
          if (image && image.raw) {
            formData.append('images', image.raw)
          }
        })
      }

      // 構建一個 JSON 對象來提交留言數據
      const messageData = {
        name: form.name,
        message: form.message,
        textColor: form.textColor,
        images: form.images // 確保圖片路徑被包含在請求數據中
      }

      const response = await axios.post('http://localhost:4000/api/messages', messageData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // 確保這裡有正確的 token
        }
      })

      console.log('成功發言:', response.data)
      ElMessage.success('成功發言')
      setTimeout(function () {
        window.location.reload()
      }, 300) // 延遲0.3秒刷新頁面

      // 確保將後端返回的圖片數據更新到messages中
      const createdMessage = {
        ...response.data,
        images: response.data.images || [] // 確保圖片數據存在
      }

      messages.push(createdMessage) // 將新留言添加到messages列表中

      // 重置表單
      form.name = ''
      form.message = ''
      form.textColor = '#000'
      form.images = [] // 清空已上傳的圖片
      fetchMessages() // 更新留言列表
    } catch (error) {
      console.error('提交失敗:', error)

      // 判斷錯誤是否由於上傳失敗
      if (error.response) {
        console.log('錯誤響應資料:', error.response.data)
      }

      ElMessage.error('提交失敗')
    }
  } else {
    ElMessage.warning('請輸入討論的主題和訊息')
  }
}

const deleteMessage = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/api/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log('刪除回應:', response) // 記錄回應數據
    ElMessage.success('刪除成功')
    // console.log('留言已刪除')
    fetchMessages()
  } catch (error) {
    // console.error('刪除失敗:', error)
    ElMessage.error('刪除失敗')
  }
}

const deleteReply = async (messageId, replyId) => {
  try {
    // console.log(`Deleting reply with messageId: ${messageId}, replyId: ${replyId}`)
    await axios.delete(`http://localhost:4000/api/messages/${messageId}/replies/${replyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    ElMessage.success('刪除成功')
    // console.log('回覆已刪除')
    fetchMessages()
  } catch (error) {
    // console.error('刪除回覆失敗:', error)
    ElMessage.error('刪除失敗')
  }
}

// 上傳相關的處理
const handleBeforeUpload = (file) => {
  const token = localStorage.getItem('token') // 假設 token 存儲在 localStorage 中
  if (!token) {
    ElMessage.error('請先登入再上傳文件')
    return false
  }

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('上傳圖片大小不能超過 2MB!')
  }
  return isLt2M
}

const handleUploadSuccess = (response, file, fileList) => {
  console.log('文件列表:', fileList)
  ElMessage.success('文件上傳成功')

  // 確保 response.files 存在並且是數組
  if (response.files && Array.isArray(response.files)) {
    response.files.forEach((file) => {
      if (file.path) {
        // 修正路徑为使用正斜槓以确保路徑正確
        const correctedPath = file.path.replace(/\\/g, '/')
        // console.log('修正後的圖片路徑:', correctedPath)
        form.images.push(correctedPath)
      } else {
        console.error('圖片路徑不存在於響應數據中:', response)
      }
    })
  } else {
    console.error('響應數據中沒有文件信息:', response)
  }
}

const handleUploadError = (error, file, fileList) => {
  console.error('上傳失敗', error)
  console.log('文件列表:', fileList)
  ElMessage.error('文件上傳失敗')
}

const canDelete = (message) => {
  // console.log('message:', message)
  // console.log('userId:', message.userId)
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
      `http://localhost:4000/api/messages/${id}`,
      { name: newName, message: newMessage, textColor: newTextColor },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    // console.log('留言已更新')
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
      // console.log('提交回覆:', { reply })
      await axios.post(
        `http://localhost:4000/api/messages/${messageId}/replies`,
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

.el-card {
  transition: background-color 0.3s;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.message-images {
  display: flex;
  flex-wrap: wrap;
}

.message-image {
  max-width: 100%;
  height: auto;
  margin: 5px;
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
