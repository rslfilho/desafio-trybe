const { Post } = require('../../database/models');
const { errors } = require('../../helpers');

module.exports = async (id, userId) => {
  const found = await Post.findByPk(id);

  if (!found) throw errors.postNotFound;

  const { userId: userIdStored } = found;

  if (userId !== userIdStored) throw errors.userNotAuthorized;

  await Post.destroy({ where: { id } });
};
