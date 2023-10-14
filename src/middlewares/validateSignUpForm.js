const validateBasicSignInSignUpForm = require('./validateBasicSignInSignUpForm'); // Assuming validateBasicSignInSignUpForm is in a separate module

const validateSignUpForm = (formData) => {
  const errors = validateBasicSignInSignUpForm(formData);

  if (!formData?.name || !/^[a-zA-Z]+([-\\s]?[a-zA-Z]+)*$/.test(formData.name)) {
    errors.name = createErrorObject('INVALID_NAME');
  }

  if (!formData?.password || formData.password.length < 8) {
    errors.password = createErrorObject('INVALID_PASSWORD');
  }

  return errors;
};

module.exports = validateSignUpForm;
