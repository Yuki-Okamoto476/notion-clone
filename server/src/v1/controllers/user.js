const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req, res) => {
  const password = req.body.password;

  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    );
    const user = await User.create(req.body);
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
}