const Router = require('express');
const { celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const cardRouter = Router();
const { createCardJoi, cardIdJoi } = require('../joi/joi');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', celebrate(createCardJoi), createCard);
cardRouter.delete('/cards/:cardId', celebrate(cardIdJoi), deleteCard);
cardRouter.put('/cards/:cardId/likes', celebrate(cardIdJoi), likeCard);
cardRouter.delete('/cards/:cardId/likes', celebrate(cardIdJoi), disLikeCard);

module.exports = cardRouter;
