const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // 从环境变量获取密钥

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27017/newdatabase', {
  serverSelectionTimeoutMS: 5000 // 5 seconds
})
  .then(() => {
    console.log('成功連接到 MongoDB');
    createDefaultAdmin(); // 创建默认管理员
  })
  .catch(err => {
    console.error('無法連接到 MongoDB', err);
    process.exit(1); // 强制退出以引起注意
  });

app.use(bodyParser.json());
app.use(cors());

// 定义用户模型
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, default: 'user' } // 新增 role 字段，默认值为 'user'
}));

// 定义留言模型
const Message = mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true }
}));

// 创建默认管理员
// async function createDefaultAdmin() {
//   const adminExists = await User.findOne({ username: 'admin' });
//   if (!adminExists) {
//     const username = 'admin';
//     const password = '123';
//     const gender = 'male';
//     const role = 'admin';

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const adminUser = new User({ username, password: hashedPassword, gender, role });
//     await adminUser.save();
//     console.log('Default admin user created successfully');
//   }
// }

// 注册用户
app.post('/register', async (req, res) => {
  const { username, password, gender } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, gender });
    await user.save();
    res.status(201).send('註冊成功');
  } catch (error) {
    res.status(400).send(`註冊失敗: ${error.message}`);
  }
});

// 登录用户
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('用戶不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('密碼錯誤');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send('登陸失敗');
  }
});

// 身份验证中间件
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('需要認證');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).send('認證失敗');
  }
};

// 创建留言
app.post('/messages', authMiddleware, async (req, res) => {
  const { name, message } = req.body;

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).send('留言已保存');
  } catch (error) {
    res.status(400).send(`保存失敗: ${error.message}`);
  }
});

// 获取所有留言
app.get('/messages', async (req, res) => {
  console.log('接收到GET /messages請求');
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send(`獲取留言失敗: ${error.message}`);
  }
});

// 删除留言
app.delete('/messages/:id', authMiddleware, async (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send('只有管理員才能刪除留言');
  }

  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).send('留言已刪除');
  } catch (error) {
    res.status(400).send(`刪除失敗: ${error.message}`);
  }
});

// 启动服务器
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`伺服器成功啟動 ${PORT}`);
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Could not connect to MongoDB:', err);
  process.exit(1); // Force exit on connection error
});