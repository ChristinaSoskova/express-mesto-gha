const express = require("express");
const mongoose = require("mongoose");
const process = require("process");
require("dotenv").config();
const bodyParser = require("body-parser");
const { errors } = require('celebrate');
const helmet = require("helmet");
const app = express();
const rateLimit = require("express-rate-limit");
const router = require("./routes");
const { createUser, login } = require('./controllers/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');
const auth = require("./middlewares/auth");

mongoose.set("strictQuery", false);

const { PORT = 3000, DB = "mongodb://localhost:27017/mestodb" } = process.env;

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.json());
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

mongoose.connect(DB);

module.exports = { app, DB };
