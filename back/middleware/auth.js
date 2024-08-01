// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('未提供令牌');
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('無效的令牌');
  }
};

module.exports = authMiddleware;
