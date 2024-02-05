const jwt = require('jsonwebtoken');
const AuthorizateError = require('../utils/authorizateError');
require('dotenv').config();

const { JWT_SECRET } = process.env;

// eslint-disable-next-line func-names, consistent-return
module.exports = function (req, res, next) {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token.startsWith('Bearer ')) {
      throw new AuthorizateError('Необходима авторизация');
    }
    const validToken = token.replace('Bearer ', '');
    const secret = JWT_SECRET || 'default_secret';
    payload = jwt.verify(validToken, secret);
  } catch (error) {
    return next(new AuthorizateError('Неверный или истекший токен'));
  }
  req.user = payload;
  next();
};
