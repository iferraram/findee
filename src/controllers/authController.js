const passport = require('passport');
const createErrorObject = require('../helpers/responses/createErrorObject');
const handleResponse = require('../helpers/responses/handleResponse');
const validateBasicSignInSignUpForm = require('../helpers/auth/validateBasicSignInSignUpForm');
const validateSignUpForm = require('../helpers/auth/validateSignUpForm');

const handleSignUp = (req, res, next) => {
  const validationErrors = validateSignUpForm(req.body);

  if (Object.keys(validationErrors).length === 0) {
    passport.authenticate('local-signup', (err) => {
      console.log(err)
      if (err) {
        const field = err.name === 'MongoError' && err.code === 11000 ? 'email' : '';
        const code = field ? 'DUPLICATED_EMAIL' : 'FORM_SUBMISSION_FAILED';
        handleResponse(res, { errors: { [field]: createErrorObject(code) } });
      } else {
        handleResponse(res, {});
      }
    })(req, res, next);
  } else {
    handleResponse(res, { errors: validationErrors });
  }
};

const handleSignIn = (req, res, next) => {
  const validationErrors = validateBasicSignInSignUpForm(req.body);

  if (Object.keys(validationErrors).length === 0) {
    passport.authenticate('local-login', (error, token, user) => {
      if (error !== null) {
        const field = error.code === 'INCORRECT_CREDENTIALS' ? 'password' : '';
        handleResponse(res, { errors: { [field]: error } });
      } else {
        handleResponse(res, { payload: { token, user } });
      }
    })(req, res, next);
  } else {
    handleResponse(res, { errors: validationErrors });
  }
};

module.exports = {
  handleSignUp,
  handleSignIn,
};
