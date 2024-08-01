const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('授權失敗');
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('授權失敗');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('無效的令牌');
  }
};

module.exports = authMiddleware;
