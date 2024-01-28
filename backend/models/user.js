const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
const validator = require('validator');

const { regexUrl, regexEmail } = require('../utils/regex');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле "Имя" является обязательным',
      },
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    about: {
      type: String,
      required: {
        value: true,
        message: 'Поле "О себе" является обязательным',
      },
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    avatar: {
      type: String,
      required: {
        value: true,
        message: 'Поле "Аватар" является обязательным',
        validate: {
          validator: (url) => regexUrl.test(url), message: 'Введен некорректный адрес ссылки',
        },
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      minlength: [5, 'Минимальная длина 5 символа'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => regexEmail.test(email),
        message: 'Введен некорректный адрес',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('user', userSchema);
