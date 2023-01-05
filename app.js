const express = require("express");
const mongoose = require("mongoose");
const process = require("process");
const router = require("./routes");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();

mongoose.set("strictQuery", false);

const { PORT = 3000, DB = "mongodb://localhost:27017/mestodb" } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: "63b5990f90280eb0a1f6de1f", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(bodyParser.json());

app.use(express.json());

// eslint-disable-next-line no-undef
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});

mongoose.connect(DB);

module.exports = { app, DB };
