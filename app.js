const express = require("express");
const mongoose = require("mongoose");
const process = require("process");
require("dotenv").config();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const app = express();
const rateLimit = require('express-rate-limit');
const router = require("./routes");

mongoose.set("strictQuery", false);

const { PORT = 3000, DB = "mongodb://localhost:27017/mestodb" } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '63b5990f90280eb0a1f6de1f', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

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

mongoose.connect(DB);

module.exports = { app, DB };



