// import axios from 'axios'

// export default {
//   name: 'AppHeader',
//   data() {
//     return {
//       registerForm: {
//         username: '',
//         password: '',
//         confirmPassword: '',
//         gender: '',
//         age: ''
//       },
//       loginForm: {
//         username: '',
//         password: ''
//       },
//       showRegisterDialog: false,
//       showLoginDialog: false
//     }
//   },
//   methods: {
//     async handleRegister() {
//       try {
//         const response = await axios.post('http://localhost:5000/register', this.registerForm)
//         alert(response.data.message)
//         this.showRegisterDialog = false
//       } catch (error) {
//         alert(error.response.data.message)
//       }
//     },
//     async handleLogin() {
//       try {
//         const response = await axios.post('http://localhost:5000/login', this.loginForm)
//         const token = response.data.token
//         localStorage.setItem('token', token)
//         alert('登入成功')
//         this.showLoginDialog = false
//       } catch (error) {
//         alert(error.response.data.message)
//       }
//     }
//   }
// }
