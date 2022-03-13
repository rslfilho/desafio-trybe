const { User } = require('../../database/models');
const { jwt, errors } = require('../../helpers');

module.exports = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw errors.invalidFields;
  
  const { password: pass } = user.dataValues;

  if (password !== pass) throw errors.invalidFields;
  
  delete user.dataValues.password;

  const token = jwt.createToken(user);

  return token;
};
