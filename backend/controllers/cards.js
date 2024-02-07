/* eslint-disable import/order */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const Card = require('../models/card');
const HttpCodes = require('../utils/constants');

const DeleteError = require('../utils/deleteError');
const ValidationError = require('../utils/validationError');
const NotFoundError = require('../utils/notFoundError');

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (e) {
    next(e);
  }
}

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    return res.status(HttpCodes.create).send(newCard);
  } catch (e) {
    if (e instanceof ValidationError) {
      next(new ValidationError('Переданы не валидные данные'));
      return;
    }
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    await Card.findById(cardId).orFail(
      () => new NotFoundError('Карточка по заданному ID не найдена'),
    )
      .then((card) => {
        if (card.owner._id.toString() === req.user._id.toString()) {
          return Card.findByIdAndDelete(cardId)
            .then((card) => res.status(HttpCodes.success).send(card));
        } else {
          return next(new DeleteError('У Вас нет прав на удаление данной карточки'));
        }
      });
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        next(new ValidationError('Передан невалидный ID'));
      } else {
        next(e);
      }
    }
  };

const likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(
      () => new NotFoundError('Карточка по заданному ID не найдена'),
    );
    return res.status(HttpCodes.success).send(like);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new ValidationError('Передан не валидный ID'));
    } else {
      next(e);
    }
  }
};

const disLikeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(
      () => new NotFoundError('Карточка по заданному ID не найдена'),
    );
    return res.status(HttpCodes.success).send(like);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new ValidationError('Передан не валидный ID'));
    } else {
      next(e);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
};
