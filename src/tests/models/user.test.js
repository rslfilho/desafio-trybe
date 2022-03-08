const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../database/models/user');

describe('O model de User', function () {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('possui o nome "User"', function () {
    checkModelName(User)('User');
  });

  describe('possui as propriedades "displayName", "email", "password" e "image"', function () {
    ['displayName', 'email', 'password', 'image'].forEach(checkPropertyExists(user));
  });
});
