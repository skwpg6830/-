const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth'); // 確保路徑正確
const appealsRouter = require('./routes/appeals');

dotenv.config();

const app = express();
const SECRET_KEY = 'your_secret_key';

app.use(express.json());
app.use(cors());
app.use('/path/to/default-avatar.png', express.static(path.join(__dirname, 'public/images')));

// 連接到 MongoDB
mongoose.connect('mongodb://localhost:27017/newdatabase', {
}).then(() => {
  console.log('成功連接到 MongoDB');
}).catch((error) => {
  console.error('無法連接到 MongoDB', error);
});

// 定義用戶模式和模型
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  avatar: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// 定義留言模式和模型
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  textColor: { type: String, default: '#000' },
  likes: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// 引入 Appeal 模型
const Appeal = require('./models/Appeal');

// 定義回覆模式和模型
const replySchema = new mongoose.Schema({
  messageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Message' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  reply: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reply = mongoose.models.Reply || mongoose.model('Reply', replySchema);

// 用戶註冊
app.post('/register', async (req, res) => {
  try {
    const { username, password, gender, age } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('用戶名已存在');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = gender === 'male' ? 'path/to/male-avatar.jpg' : 'path/to/female-avatar.jpg';

    const newUser = await User.create({ username, password: hashedPassword, gender, age, avatar });
    res.status(201).send(newUser);
  } catch (error) {
    console.error('註冊失敗:', error);
    res.status(500).send('註冊失敗');
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

    const token = jwt.sign({ userId: user._id, role: user.role, avatar: user.avatar, gender: user.gender }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token, userId: user._id, avatar: user.avatar, gender: user.gender });
  } catch (error) {
    console.error('登錄錯誤:', error);
    res.status(500).send('登陸失敗');
  }
});

// 創建留言
app.post('/messages', authMiddleware, async (req, res) => {
  const { name, message, textColor } = req.body;
  try {
    const newMessage = await Message.create({ name, message, textColor, userId: req.user.userId });
    res.status(201).send(newMessage);
  } catch (error) {
    console.error('創建留言失敗:', error);
    res.status(500).send('創建留言失敗');
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
      await Message.findByIdAndDelete(req.params.id);
      res.status(200).send('留言已删除');
    } else {
      res.status(403).send('無權删除留言');
    }
  } catch (error) {
    console.error('删除留言失敗:', error);
    res.status(500).send('删除留言失敗');
  }
});

// 編輯留言
app.put('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const { name, message, textColor } = req.body;
    const messageToUpdate = await Message.findById(req.params.id);

    if (!messageToUpdate) {
      return res.status(404).send('留言不存在');
    }

    if (messageToUpdate.userId.toString() !== req.user.userId) {
      return res.status(403).send('無權編輯此留言');
    }

    if (name !== undefined) {
      messageToUpdate.name = name;
    }
    if (message !== undefined) {
      messageToUpdate.message = message;
    }
    if (textColor !== undefined) {
      messageToUpdate.textColor = textColor;
    }

    await messageToUpdate.save();
    res.status(200).send(messageToUpdate);
  } catch (error) {
    console.error('編輯留言失敗:', error);
    res.status(500).send('編輯留言失敗');
  }
});


// 获取所有留言
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'username avatar gender').populate({
      path: 'replies',
      populate: {
        path: 'userId',
        select: 'username avatar gender'
      }
    });
    res.status(200).send(messages);
  } catch (error) {
    console.error('獲取留言失敗:', error);
    res.status(500).send('獲取留言失敗');
  }
});

// 点赞留言
app.post('/messages/:id/like', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send('留言不存在');
    }

    message.likes += 1;
    await message.save();
    res.status(200).send({ likes: message.likes });
  } catch (error) {
    console.error('點讚失敗:', error);
    res.status(500).send('點讚失敗');
  }
});

// 取消点赞留言
app.post('/messages/:id/unlike', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send('留言不存在');
    }

    if (message.likes > 0) {
      message.likes -= 1;
      await message.save();
    }
    res.status(200).send({ likes: message.likes });
  } catch (error) {
    console.error('取消點讚失敗:', error);
    res.status(500).send('取消點讚失敗');
  }
});

// 获取用户信息
app.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).send('用戶未找到');
    }
    res.send({ role: user.role, userId: user._id, avatar: user.avatar, gender: user.gender });
  } catch (error) {
    res.status(500).send('獲取用戶角色失敗');
  }
});

// 创建回复
app.post('/messages/:id/replies', authMiddleware, async (req, res) => {
  try {
    const { reply } = req.body; // 检查接收的字段

    if (!reply) {
      return res.status(400).send('回覆内容是必须的');
    }

    const messageId = req.params.id;
    const newReply = await Reply.create({ messageId, userId: req.user.userId, reply });
    await Message.findByIdAndUpdate(messageId, { $push: { replies: newReply._id } });

    res.status(201).send(newReply);
  } catch (error) {
    console.error('創建回覆失敗:', error);
    res.status(500).send('創建回覆失敗');
  }
});

// 获取特定留言的所有回复
app.get('/messages/:id/replies', async (req, res) => {
  try {
    const messageId = req.params.id;
    const replies = await Reply.find({ messageId }).populate('userId', 'username avatar gender');
    res.status(200).send(replies);
  } catch (error) {
    console.error('獲取回覆失敗:', error);
    res.status(500).send('獲取回覆失敗');
  }
});

// 刪除回覆
app.delete('/messages/:messageId/replies/:replyId', authMiddleware, async (req, res) => {
  try {
    const { messageId, replyId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      console.log(`Message with id ${messageId} not found`);
      return res.status(404).send('留言未找到');
    }

    const reply = await Reply.findById(replyId);
    if (!reply) {
      console.log(`Reply with id ${replyId} not found`);
      return res.status(404).send('回覆未找到');
    }

    if (reply.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).send('無權限刪除該回覆');
    }

    await Reply.deleteOne({ _id: replyId });
    message.replies = message.replies.filter((r) => r.toString() !== replyId);
    await message.save();

    res.status(200).send('回覆已刪除');
  } catch (error) {
    console.error('刪除回覆失敗:', error);
    res.status(500).send('刪除回覆失敗');
  }
});

// 使用新創建的路由
app.use('/appeals', authMiddleware, appealsRouter);



// 全局错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 啟動服務器
app.listen(3000, () => {
  console.log('伺服器成功啟動 3000');
});
