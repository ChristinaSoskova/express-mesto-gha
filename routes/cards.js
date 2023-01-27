const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require("../controllers/cards");

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validations');

router.get("/", getCards);
router.delete('/:cardId', validationCardById, deleteCard);
router.post("/", validationCreateCard, createCard);
router.put("/:cardId/likes", validationCardById, likeCard);
router.delete("/:cardId/likes",validationCardById, dislikeCard);

module.exports = router;
