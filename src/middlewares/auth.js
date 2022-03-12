const { jwt, errors } = require('../helpers');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(errors.missingToken);

  const response = jwt.validateToken(token);

  if ('message' in response) return next(errors.jwtMalformed);
  
  req.user = response;

  return next();
};
