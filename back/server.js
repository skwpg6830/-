const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const SECRET_KEY = 'your_secret_key';

// 连接到 MongoDB 数据库，修改数据库名称为 newdatabase
mongoose.connect('mongodb://127.0.0.1:27017/newdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5 seconds
})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // 强制退出以引起注意
  });

app.use(bodyParser.json());
app.use(cors());

// 定义用户模型
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true }
}));

// 注册路由
app.post('/register', async (req, res) => {
  const { username, password, gender } = req.body;

  console.log('Received registration request:', req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, gender });
    await user.save();
    console.log('User registered successfully:', user);
    res.status(201).send('用户注册成功');
  } catch (error) {
    console.error('User registration failed:', error);
    res.status(400).send(`用户注册失败: ${error.message}`);
  }
});

// 登录路由
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received login request:', req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found:', username);
      return res.status(400).send('用户不存在');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password for user:', username);
      return res.status(400).send('密码错误');
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    console.log('User logged in successfully:', username);
    res.status(200).send({ token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).send('登录失败');
  }
});

// 身份验证中间件
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    console.error('Authentication token missing');
    return res.status(401).send('需要认证');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    console.log('Token verified for user:', req.userId);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).send('认证失败');
  }
};

// 受保护的路由示例
app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send('你已认证');
});

app.listen(3000, () => {
  console.log('伺服器成功啟動');
});
