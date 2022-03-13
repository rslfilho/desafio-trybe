const UserService = require('../../services/user');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;

    await UserService.remove(id);

    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
};
