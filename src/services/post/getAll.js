const { Post, User } = require('../../database/models');

module.exports = async () => Post.findAll({
  attributes: {
    exclude: ['userId'],
  },
  include: [{
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  }],
});
