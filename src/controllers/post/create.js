const postService = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const post = await postService.create({ title, content, userId });
    return res.status(201).json(post);
  } catch (e) {
    return next(e);
  }
};
