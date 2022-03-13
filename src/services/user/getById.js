const { User } = require('../../database/models');

module.exports = async (id) => User.findByPk(
  id,
  {
    attributes: {
      exclude: ['password'],
    },
  },
);
