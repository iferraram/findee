const passport = require('passport');
const {getlocalSignup, getlocalLogin}= require('../controllers/passportController')
const User = require('../models/User');

const configurePassport = (app) => {
  app.use(passport.initialize());
  passport.use('local-signup', getlocalSignup(User));
  passport.use('local-login', getlocalLogin(User));

  return User;
};

module.exports = configurePassport;
