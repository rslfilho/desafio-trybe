const postService = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { title, content } = req.body;

    const updated = await postService.update(id, userId, { title, content });

    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};
