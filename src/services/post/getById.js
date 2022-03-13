const { Post, User } = require('../../database/models');

module.exports = async (id) => Post.findByPk(
  id,
  {
    attributes: {
      exclude: ['userId'],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
  },
);
