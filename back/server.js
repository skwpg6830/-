const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors());

// 定義用戶模型
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  gender: { type: String, required: true },
  age: { type: String, required: true }  // 改為字符串類型
});


const User = mongoose.model('User', userSchema);

module.exports = User;

// 定義留言模型
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

// 連接到 MongoDB
mongoose.connect('mongodb://localhost:27017/newdatabase')
  .then(() => {
    console.log('成功連接到 MongoDB');
  })
  .catch((error) => {
    console.error('無法連接到 MongoDB', error);
  });

// 用戶註冊路由
app.post('/register', async (req, res) => {
  try {
    const { username, password, gender, age } = req.body;  // 接收年齡字段
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, gender, age });  // 保存年齡字段
    res.status(201).send(newUser);
  } catch (error) {
    console.error('註冊失敗:', error);
    res.status(500).send('註冊失敗');
  }
});


// 登入路由
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`正在處理登入請求，用戶名：${username}`);
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`用戶名不存在：${username}`);
      return res.status(400).send('用戶不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`密碼錯誤，用户名：${username}`);
      return res.status(400).send('密碼錯誤');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    console.error('登錄錯誤:', error);
    res.status(500).send('登陸失敗');
  }
});

// 身份驗證中間件
const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: '需要認證' })
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ message: '認證失敗' })
  }
}

module.exports = auth

// 創建留言
router.post('/messages', authMiddleware, async (req, res) => {
  const { name, message } = req.body;
  try {
    const newMessage = await Message.create({ name, message, userId: req.userId });
    res.status(201).send(newMessage);
  } catch (error) {
    console.error('創建留言失敗:', error);
    res.status(500).send('創建留言失敗');
  }
});

// 刪除留言
router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).send('留言已刪除');
  } catch (error) {
    console.error('刪除留言失敗:', error);
    res.status(500).send('刪除留言失敗');
  }
});

// 獲取所有留言
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'username');
    res.status(200).send(messages);
  } catch (error) {
    console.error('獲取留言失敗:', error);
    res.status(500).send('獲取留言失敗');
  }
});

module.exports = router

// 登出路由（實際上，登出僅僅是前端刪除 token）
app.post('/logout', authMiddleware, (req, res) => {
  console.log(`用戶 ${req.userId} 已登出`);
  res.send({ message: '登出成功' });
});

// 啟動伺服器
app.listen(3000, () => {
  console.log('伺服器成功啟動 3000');
});
