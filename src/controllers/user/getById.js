const userService = require('../../services/user');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) return next(errors.userNotFound);

    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};