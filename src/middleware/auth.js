const { verifyJwt } = require('../config/auth');

const checkJwt = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: 'Token not found' });
  }
  const [, token] = authHeader.split(' ');
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
