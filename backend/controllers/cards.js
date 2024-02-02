/* eslint-disable import/order */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const Card = require('../models/card');
const HttpCodes = require('../utils/constants');

const DeleteError = require('../utils/deleteError');
const ValidationError = require('../utils/validationError');
const NotFoundError = require('../utils/notFoundError');

// eslint-disable-next-line consistent-return
async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (e) {
    next(e);
  }
}

// eslint-disable-next-line consistent-return
const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    return res.status(HttpCodes.create).send(newCard);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new ValidationError('Переданы не валидные данные'));
      // eslint-disable-next-line consistent-return
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
      // eslint-disable-next-line no-shadow, consistent-return
      .then((card) => {
        if (card.owner._id.toString() === req.user._id.toString()) {
          // eslint-disable-next-line max-len, no-shadow
          return Card.findByIdAndDelete(cardId)
            // eslint-disable-next-line no-shadow
            .then((card) => res.status(HttpCodes.success).send(card));
          // eslint-disable-next-line no-else-return
        } else {
          return next(new DeleteError('У Вас нет прав на удаление данной карточки'));
        }
      });
  } catch (e) {
    if (e.name === 'NotFoundError') {
      next(new NotFoundError('Карточка по заданному ID не найдена'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (e.name === 'CastError') {
      next(new ValidationError('Передан не валидный ID'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};

// eslint-disable-next-line consistent-return
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
    if (e.name === 'NotFoundError') {
      next(new NotFoundError('Карточка по заданному ID не найдена'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (e.name === 'CastError') {
      next(new ValidationError('Передан не валидный ID'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};

// eslint-disable-next-line consistent-return
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
  } catch (error) {
    if (error.name === 'NotFoundError') {
      next(new NotFoundError('Карточка по заданному ID не найдена'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не валидный ID'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
};
