const { Post } = require('../../database/models');
const { errors } = require('../../helpers');

module.exports = async (id, userId, { title, content }) => {
  const found = await Post.findByPk(id);

  if (!found) throw errors.postNotFound;

  const { userId: userIdStored } = found;

  if (userId !== userIdStored) throw errors.userNotAuthorized;

  await Post.update(
    { title, content },
    { where: { id } },
  );

  return {
    title,
    content,
    userId,
  };
};
