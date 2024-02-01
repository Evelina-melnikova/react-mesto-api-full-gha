const Router = require('express');
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

const { signUpJoi, signInJoi } = require('../joi/joi');

const adminsRouter = Router();
adminsRouter.post('/signin', celebrate(signInJoi), login);
adminsRouter.post('/signup', celebrate(signUpJoi), createUser);

module.exports = adminsRouter;
