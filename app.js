const express = require("express");
const mongoose = require("mongoose");
const process = require("process");
require("dotenv").config();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const app = express();
const rateLimit = require("express-rate-limit");
const router = require("./routes");
const { createUsers, login } = require("./controllers/users");
const auth = require("./middlewares/auth");


mongoose.set("strictQuery", false);

const { PORT = 3000, DB = "mongodb://localhost:27017/mestodb" } = process.env;
const { validationCreateUser, validationLogin } = require('./middlewares/validation');

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUsers);

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

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

mongoose.connect(DB);

module.exports = { app, DB };
