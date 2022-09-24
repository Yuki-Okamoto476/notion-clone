const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5500;
require('dotenv').config();
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use('/api/v1', require('./src/v1/routes'));

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('DBと接続中');
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log('ローカルサーバ起動中');
});
