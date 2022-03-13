const { Op } = require('sequelize');
const { Post, User } = require('../../database/models');

module.exports = async (query) => Post.findAll({
  where: { 
    [Op.or]: [
      { title: { [Op.substring]: `${query}` } },
      { content: { [Op.substring]: `${query}` } },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
  ],
});
