const postService = require('../../services/post');

module.exports = async (_req, res, next) => {
  try {
    const posts = await postService.getAll();
    return res.status(200).json(posts);
  } catch (e) {
    return next(e);
  }
};
