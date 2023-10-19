const mongoose = require('mongoose');
const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const checkAuth = (req, res, next) => {
  const unauthorized = () => res.status(401).end();

  if (!req.headers.authorization) {
    return unauthorized();
  }
  const secret = process.env.JWT_SECRET;
  const token = req.headers.authorization.split(' ')[1];

  verify(token, secret, async (err, decoded) => {

    if (err) {
      return unauthorized();
    }

    const { sub: userId } = decoded;
    try {
      const user = await mongoose.model('User').findById(userId);

      if (!user) {
        return unauthorized();
      } else {
        req.user = user;
        next();
      }
    } catch (e) {
      unauthorized();
    }
  });
};

module.exports = checkAuth;
