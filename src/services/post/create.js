const { Post } = require('../../database/models');

module.exports = async ({ title, content, userId }) => {
  const { dataValues: post } = await Post.create({ title, content, userId });
  
  delete post.updated;
  delete post.id;

  return post;
};
