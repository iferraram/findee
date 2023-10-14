const { isEmail } = require('validator');

const validateBasicSignInSignUpForm = (formData) => {
  const errors = {};

  if (!formData?.email || !isEmail(formData.email)) {
    errors.email = createErrorObject('INVALID_EMAIL');
  }

  return errors;
};

module.exports = validateBasicSignInSignUpForm;
