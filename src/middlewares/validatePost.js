const validationService = require('../services/validation');

module.exports = async (req, _res, next) => {
  try {
    const { title, content } = req.body;
    const { error } = validationService.post({ title, content });

    if (error) {
      return next({
        statusCode: 400,
        code: 'bad_request',
        message: error.message,
      });
    }
    
    return next();
  } catch (e) {
    next(e);
  }
};
