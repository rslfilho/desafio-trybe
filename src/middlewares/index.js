const error = require('./error');
const swagger = require('./swagger');
const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validatePost = require('./validatePost');
const auth = require('./auth');

module.exports = {
  error,
  swagger,
  validateUser,
  validateLogin,
  validatePost,
  auth,
};
