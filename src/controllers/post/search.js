const postService = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { q } = req.query;
    const posts = await postService.search(q);
    return res.status(200).json(posts);
  } catch (e) {
    return next(e);
  }
};