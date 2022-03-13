const { User } = require('../../database/models');

module.exports = async (id) => User.destroy({
  where: { id },
});
