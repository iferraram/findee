const { sign } = require('jsonwebtoken');
const { Strategy: PassportLocalStrategy } = require('passport-local');
const dotenv = require('dotenv');

const getlocalLogin = (User) => new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    dotenv.config();
    const secret = process.env.JWT_SECRET;
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return done({ code: 'INCORRECT_CREDENTIALS' });
    }
    const matched = await user.comparePassword(password.trim());

    if (!matched) {
      return done({ code: 'INCORRECT_CREDENTIALS' });
    }

    done(null, sign({ sub: user._id }, secret), {
      email: user.email,
      username: user.username
    });
  } catch (e) {
    console.error(e);
    done({ code: 'LOGIN_FORM_SUBMISSION_FAILED', info: e });
  }
});


const getlocalSignup = (User) => new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const newUser = new User({
      email: email.trim(),
      password: password.trim(),
      username: req.body.username.trim(),
    });
  
    try {
      await newUser.save();
      done(null);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  

module.exports = {getlocalSignup, getlocalLogin};