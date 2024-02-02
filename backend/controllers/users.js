/* eslint-disable max-len */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies, import/order, import/no-unresolved
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');
const HttpCodes = require('../utils/constants');
const generateToken = require('../utils/token');

const NotValidIdError = require('../utils/validationError');
const ConflictError = require('../utils/conflictError');
const AuthorizateError = require('../utils/authorizateError');
const NotFoundError = require('../utils/notFoundError');

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    next(e);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => NotFoundError('Пользователь по заданному ID не найден'),
    );
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
    if (e instanceof NotFoundError) {
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      return;
    }
    if (e instanceof mongoose.Error.CastError) {
      next(new NotValidIdError('Передан не валидный ID'));
      return;
    }
    next(e);
  }
};
const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const soltRounds = 10;
    const hash = await bcrypt.hash(password, soltRounds);
    const newUser = await User.create({ email, password: hash });
    return res.status(HttpCodes.create).send({
      name: newUser.name, about: newUser.about, avatar: newUser.avatar, email: newUser.email, id: newUser._id,
    });
  } catch (e) {
    if (e.code === HttpCodes.dublicate) {
      next(new ConflictError('Такой пользователь уже существует'));
      return;
    }
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updateUserProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodes.success).send(updateUserProfile);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new NotValidIdError('Переданы не валидные данные'));
      return;
    }
    if (e instanceof NotFoundError) {
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      return;
    }
    next(e);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateUserAvatr = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodes.success).send(updateUserAvatr);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new NotValidIdError('Переданы не валидные данные'));
      return;
    }
    if (e instanceof NotFoundError) {
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      return;
    }
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userAdmin = await User.findOne({ email }).select('+password').orFail(
      () => AuthorizateError('Неверно введены данные'),
    );
    const matched = await bcrypt.compare(password, userAdmin.password);
    if (!matched) {
      throw AuthorizateError('Неверно введены данные');
    }

    const token = generateToken({ _id: userAdmin._id });
    return res.status(HttpCodes.success).send(
      {
        name: userAdmin.name, about: userAdmin.about, avatar: userAdmin.avatar, email: userAdmin.email, id: userAdmin._id, token,
      },
    );
  } catch (e) {
    if (e instanceof AuthorizateError) {
      next(new AuthorizateError('Неверно введены данные'));
      return;
    }
    next(e);
  }
};

const UsersMe = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new NotValidIdError('User not found');
    }
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
    if (e instanceof NotValidIdError) {
      next(new NotValidIdError('Переданы невалидные данные'));
      return;
    }
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  UsersMe,
};
