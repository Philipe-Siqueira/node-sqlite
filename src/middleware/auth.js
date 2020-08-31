const { verifyJwt, getTokenFromHeaders } = require('../config/auth');

const checkJwt = (request, response, next) => {
  const token = getTokenFromHeaders(request.headers.authorization);

  if (!token) {
    return response.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = verifyJwt(token);
    request.account_id = decoded.id;
    request.token_expire = new Date(decoded.exp * 1000);
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = checkJwt;
