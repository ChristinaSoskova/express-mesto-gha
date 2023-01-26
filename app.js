require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const process = require("process");
const { errors } = require('celebrate');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const router = require("./routes");
const { createUser, login } = require('./controllers/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');
const auth = require("./middlewares/auth");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
mongoose.set("strictQuery", false);

const { PORT = 3000, DB = "mongodb://localhost:27017/mestodb" } = process.env;
app.use(express.json());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());
app.use(router);

app.use(errors());
app.use(errorHandler);

mongoose.connect(DB);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});

module.exports = { app, DB };
