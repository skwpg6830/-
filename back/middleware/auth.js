const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(401).send('授權失敗');
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.log('No token found in Authorization header');
    return res.status(401).send('授權失敗');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(401).send('無效的令牌');
  }
};

module.exports = authMiddleware;
