const postService = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    await postService.remove(id, userId);

    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};
