const Router = require('express');
const { celebrate } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  UsersMe,
} = require('../controllers/users');

const { updateAvatarJoi, userIdJoi, updateUserJoi } = require('../joi/joi');

const userRouter = Router();
userRouter.get('/users', getUsers);
userRouter.get('/users/me', UsersMe);
userRouter.get('/users/:userId', celebrate(userIdJoi), getUserById);
userRouter.patch('/users/me/avatar', celebrate(updateAvatarJoi), updateUserAvatar);
userRouter.patch('/users/me', celebrate(updateUserJoi), updateUser);

module.exports = userRouter;
