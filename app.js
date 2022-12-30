const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/users');



mongoose.set('strictQuery', false);


const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB);
app.use(router);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});