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
import { reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElCard, ElDivider } from 'element-plus'

const form = reactive({
  name: '',
  message: ''
})

const messages = reactive([])

const handleSubmit = () => {
  if (form.name && form.message) {
    messages.push({ ...form })
    form.name = ''
    form.message = ''
  } else {
    alert('Please enter your name and message.')
  }
}

const deleteMessage = (index) => {
  messages.splice(index, 1)
}
</script>

<style scoped>
.message-card {
  margin-top: 20px;
}
</style>
