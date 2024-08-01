const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authMiddleware = require('./middleware/auth'); // 確保導入正確
const app = express();
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors());

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId); // 確保保存用戶 ID
    // 跳轉到主頁或其他操作
  } catch (error) {
    console.error('登錄失敗:', error);
  }
}



// 定義用戶
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  gender: { type: String, required: true },
  age: { type: String, required: true }  // 改為字符串類型
});

const User = mongoose.model('User', userSchema);

// 定義留言
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

// 连接到 MongoDB
mongoose.connect('mongodb://localhost:27017/newdatabase')
  .then(() => {
    console.log('成功連接到 MongoDB');
  })
  .catch((error) => {
    console.error('無法連接到 MongoDB', error);
  });

// 用戶註冊
app.post('/register', async (req, res) => {
  try {
    const { username, password, gender, age } = req.body;  // 接收年龄字段
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, gender, age });  // 保存年龄字段
    res.status(201).send(newUser);
  } catch (error) {
    console.error('註冊失败:', error);
    res.status(500).send('註冊失败');
  }
});

// 登陸
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('用戶不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('密碼錯誤');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token, userId: user._id });  // 返回 token 和 userId
  } catch (error) {
    console.error('登錄錯誤:', error);
    res.status(500).send('登陸失敗');
  }
});


// 創建留言
app.post('/messages', authMiddleware, async (req, res) => {
  const { name, message } = req.body;
  try {
    const newMessage = await Message.create({ name, message, userId: req.user.userId });
    res.status(201).send(newMessage);
  } catch (error) {
    console.error('創建留言失败:', error);
    res.status(500).send('創建留言失败');
  }
});

// 删除留言
app.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send('留言不存在');
    }

    if (req.user.role === 'admin' || message.userId.toString() === req.user.userId) {
      await Message.findByIdAndDelete(req.params.id); // 使用 findByIdAndDelete 方法
      res.status(200).send('留言已删除');
    } else {
      res.status(403).send('無權删除留言');
    }
  } catch (error) {
    console.error('删除留言失败:', error);
    res.status(500).send('删除留言失败');
  }
});




// 編輯留言
app.put('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send('留言不存在');
    }

    // 只有普通用戶可以編輯自己的留言
    if (message.userId.toString() !== req.user.userId) {
      return res.status(403).send('無權編輯此留言');
    }

    message.message = req.body.message;
    await message.save();
    res.status(200).send(message);
  } catch (error) {
    console.error('編輯留言失敗:', error);
    res.status(500).send('編輯留言失敗');
  }
});



// 获取所有留言
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'username');
    res.status(200).send(messages);
  } catch (error) {
    console.error('獲取留言失敗:', error);
    res.status(500).send('獲取留言失敗');
  }
});

app.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).send('用戶未找到');
    }
    res.send({ role: user.role, userId: user._id }); // 返回 userId
  } catch (error) {
    res.status(500).send('獲取用戶角色失敗');
  }
});


// 啟動服務器
app.listen(3000, () => {
  console.log('伺服器成功啟動 3000');
});
