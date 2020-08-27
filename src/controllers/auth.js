const { Accounts } = require('../models');
const yup = require('yup');

exports.findAll = (request, response) => {
 return response.status(200).json('Sign In');
};

exports.add = (request, response) => {
 const {email, password, passwordConfirmation} = request.body;
 
 // Schema de Validação
 let schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().trim().min(8)
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  "Passwords must have a Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
  passwordConfirmation: yup.string().required()
     .oneOf([yup.ref('password'), null], 'Password and confirmation must match'),
 });
 
 
 schema.validate(request.body)
 .then(()=> {
   Accounts.create({ email, password })
   .then(account => {
    return response.status(201).json({ account });
   })
   .catch(err => {
    return response.status(500).json({ 
     message: err.errors[0].message, 
     key: err.errors[0].path
    }); 
   });
 })
 .catch((err) => {
  return response.status(400).json({message: err.errors, key: err.path});
 });
 
}

