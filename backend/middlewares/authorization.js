const jwt = require('jsonwebtoken');
const AuthorizateError = require('../utils/authorizateError');
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line func-names, consistent-return
module.exports = function (req, res, next) {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new AuthorizateError('С токеном что-то не так');
    }
    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, NODE_ENV !== 'production' ? 'jwt_secret' : JWT_SECRET);
  } catch (error) {
    return next(new AuthorizateError('С токеном что-то не так'));
  }
  req.user = payload;
  next();
};
