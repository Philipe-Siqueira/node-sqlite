require('dotenv').config({
  path: process.env.NODE_ENV === "development"
  ? ".env.dev"
  : ".env"
});
const jwt = require('jsonwebtoken');
const tokenPrivateKey = process.env.NODE_APP_SECRET;
const refreshTokenPrivateKey = process.env.NODE_APP_SECRET;

const options = {
  expiresIn: '2h'
}

const refreshOptions = {
  expiresIn: '1d'
}

const generateJwt = (payload) => {
  return jwt.sign(payload, tokenPrivateKey, options);
}

const generateRefreshJwt = (payload) => {
  return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
}

const verifyJwt = (token) => {
  return jwt.verify(token, tokenPrivateKey);
}

const verifyRefreshJwt = (token) => {
  return jwt.verify(token, refreshTokenPrivateKey);
}

const getTokenFromHeaders = (authorization) => {
  const authHeader = authorization;
  if(!authHeader){
    return null;
  }
  const [, token] = authHeader.split(' ');
  return token;
}

module.exports = {
  generateJwt,
  verifyJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders
};
