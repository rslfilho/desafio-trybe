const postService = require('../../services/post');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getById(id);

    if (!post) return next(errors.postNotFound);

    return res.status(200).json(post);
  } catch (e) {
    return next(e);
  }
};