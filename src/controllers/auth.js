const yup = require('yup');
const bcrypt = require('bcryptjs');
const { Accounts } = require('../models');
const { generateJwt, verifyJwt, generateRefreshJwt, verifyRefreshJwt} = require('../config/auth')
const { rules } = require('../config/validation');

exports.accountRefresh = (request, response) => {
  const token = getTokenFromHeaders(request.headers.authorization);
  if (!token) {
    return response.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = verifyRefreshJwt(token);
    Accounts.findOne(decoded.id)
    .then((account) => {
      const token = generateJwt({id: account.id});
      const refreshToken = generateRefreshJwt({id: account.id});
      const decoded = verifyJwt(token);
      return response.status(201).json({ account, token, refreshToken, token_expire: decoded.exp });
    })
    .catch((err) => {
      return response.status(401).json('invalid credentials');
    });
  } catch (error) {
    return response.status(401).json('invalid credentials');
  }
};

exports.accountSignIn = (request, response) => {
  const {email, password} = request.body;

  // Schema de Validação
  let schema = yup.object().shape({
    email: rules.email,
    password: rules.password,
  });

  schema.validate(request.body)
 .then(async ()=> {
  const account = await Accounts.findOne({ where: {email}});
  // Validate passaword
  const passwordMatch = account ? bcrypt.compareSync(password, account.password_hash) : null;
  if(!passwordMatch) return response.status(401).json('invalid credentials');

  const token = generateJwt({id: account.id});
  const refreshToken = generateRefreshJwt({id: account.id});
  const decoded = verifyJwt(token);
  return response.status(200).json({ account, token, refreshToken, exp: decoded.exp });
 })
 .catch((err) => {
  return response.status(401).json({message: err.errors, key: err.path});
 });
}
exports.accountSignUp = (request, response) => {
 const {email, password, passwordConfirmation} = request.body;
 // Schema de Validação
 let schema = yup.object().shape({
  email: rules.email,
  password: rules.password,
  passwordConfirmation: rules.passwordConfirmation,
 });


 schema.validate(request.body)
 .then(()=> {
   Accounts.create({ email, password })
   .then(account => {
    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({id: account.id});
    const decoded = verifyJwt(token);
    return response.status(201).json({ account, token, refreshToken, token_expire: decoded.exp });
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

