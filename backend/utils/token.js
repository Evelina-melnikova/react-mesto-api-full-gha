/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Загрузка секретного ключа JWT из переменных окружения
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  // Если секретный ключ не определен, выбрасываем ошибку.
  throw new Error('JWT_SECRET is not defined. Make sure to define it in your environment variables.');
}

const generateToken = (payload) => {
  // Генерация токена с использованием секретного ключа из переменных окружения
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '14d',
  });
};

module.exports = generateToken;
