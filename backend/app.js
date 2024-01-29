/* eslint-disable no-console */
/* eslint-disable import/order */
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/root');
const { errors } = require('celebrate');
const NotFoundError = require('./utils/notFoundError');
const error = require('./utils/error');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(json());
app.use(router);
app.use(errors());
app.use(error);
app.use('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.listen(PORT, () => {
  console.log(`Запущен порт: ${PORT}`);
});
