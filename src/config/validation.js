const yup = require('yup');
const rules = {
  email: yup.string().required().email(),
  password: yup.string().required().trim().min(8)
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  "Passwords must have a Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
  passwordConfirmation: yup.string().required()
  .oneOf(
    [yup.ref('password'), null],
    'Password and confirmation must match'
  ),
}

module.exports = {rules};
