const cardSchema = require("../models/card");


module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные при создании карточки.'})
      } else {
        next(error);
      }
    });
  }

module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .sort({ createdAt: -1 })
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные при создании карточки.'})
      } else {
        next(error);
      }
    });
  }


module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  cardSchema
    .findById(cardId)
    .then((card) => {
      if (!card.owner.equals(userId)) {
        console.log();
        ("Невозможно удалить чужую карточку");
      } else {
        card.delete();
      }
    })
    .catch((error) => {
      if(error.name === 404) {
        return res.status(error).send({ message:'Карточка с указанным _id не найдена.'})
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) =>
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    )
    .populate(["owner", "likes"])
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные для постановки/снятии лайка'})
      } if(error.name === 404) {
        return res.status(error).send({ message:'Передан несуществующий _id карточки'})
      } else {
        next(error);
      }
    });

module.exports.dislikeCard = (req, res, next) =>
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }
    )
    .populate(["owner", "likes"])
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные для постановки/снятии лайка'})
      } if(error.name === 404) {
        return res.status(error).send({ message:'Передан несуществующий _id карточки'})
      } else {
        next(error);
      }
    });