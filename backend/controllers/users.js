/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');
const HttpCodes = require('../utils/constants');
const generateToken = require('../utils/token');

const ValidationError = require('../utils/validationError');
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
      () => new NotFoundError('Пользователь по заданному ID не найден'),
    );
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new ValidationError('Передан не валидный ID'));
    } else {
      next(e);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ email, password: hash });
    return res.status(HttpCodes.create).send({
      name: newUser.name, about: newUser.about, avatar: newUser.avatar, email: newUser.email, id: newUser._id,
    });
  } catch (e) {
    if (e.code === HttpCodes.duplicate) {
      next(new ConflictError({ message: 'Пользователь уже существует' }));
    } else if (e instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('Передан не валидный ID'));
    } else {
      next(e);
    }
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
      next(new ValidationError('Передан не валидный ID'));
    } else {
      next(e);
    }
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
      next(new ValidationError('Пользователь по заданному ID не найден'));
    } else {
      next(e);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userAdmin = await User.findOne({ email }).select('+password').orFail(
      () => new AuthorizateError('Неверно введены данные'),
    );
    const matched = await bcrypt.compare(password, userAdmin.password);
    if (!matched) {
      throw new AuthorizateError('Неверно введены данные');
    }

    const token = generateToken({ _id: userAdmin._id });
    return res.status(HttpCodes.success).send(
      { name: userAdmin.name, about: userAdmin.about, avatar: userAdmin.avatar, email: userAdmin.email, id: userAdmin._id, token },
    );
  } catch (e) {
    next(e);
  }
};

const UsersMe = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
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
