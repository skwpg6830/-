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

    <el-card v-for="(message, index) in messages" :key="index" class="message-card">
      <h4>{{ message.name }}</h4>
      <p>{{ message.message }}</p>
      <el-button type="danger" @click="deleteMessage(index)">Delete</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElDivider } from 'element-plus'

// 定義表單資料
const form = reactive({
  name: '',
  message: ''
})

// 定義訊息列表
const messages = reactive([])

// 讀取 localStorage 中的訊息
onMounted(() => {
  const storedMessages = localStorage.getItem('messages')
  if (storedMessages) {
    messages.push(...JSON.parse(storedMessages))
  }
})

// 處理表單提交
const handleSubmit = () => {
  if (form.name && form.message) {
    messages.push({ ...form })
    form.name = ''
    form.message = ''
    saveMessages()
  } else {
    alert('Please enter your name and message.')
  }
}

// 刪除訊息
const deleteMessage = (index) => {
  messages.splice(index, 1)
  saveMessages()
}

// 保存訊息到 localStorage
const saveMessages = () => {
  localStorage.setItem('messages', JSON.stringify(messages))
}
</script>

<style scoped>
.message-card {
  margin-top: 20px;
}
</style>
