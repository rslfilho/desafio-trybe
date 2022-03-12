const userService = require('../../services/user');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    const token = await userService.login({ email, password });
  
    return res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
};
