const { User } = require('../../database/models');
const { errors, jwt } = require('../../helpers');

module.exports = async ({ displayName, email, password, image }) => {
  const found = await User.findOne({
    where: { email },
  });
  if (found) throw errors.userExists;

  const created = await User.create({ displayName, email, password, image });
  delete created.dataValues.password;

  const token = jwt.createToken(created);

  return token;
};
