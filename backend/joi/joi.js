/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi } = require('celebrate');

const { regexUrl } = require('../utils/regex');

const createCardJoi = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(regexUrl).required(),
  }),
};

const cardIdJoi = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const signUpJoi = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const signInJoi = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const userIdJoi = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
};

const updateAvatarJoi = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexUrl),
  }),
};

const updateUserJoi = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports = {
  createCardJoi,
  cardIdJoi,
  signUpJoi,
  signInJoi,
  userIdJoi,
  updateAvatarJoi,
  updateUserJoi,
};
