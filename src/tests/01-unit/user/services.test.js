const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../../services/user');
const { User } = require('../../../database/models');
const { jwt } = require('../../../helpers');
const userMock = require('../../mocks/user');
const errorMock = require('../../mocks/errors');

describe('O serviço da rota POST/user', () => {
  describe('retorna erro quando', () => {  
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userMock.created);
    });
  
    after(async () => {
      await User.findOne.restore();
    });

    it('já existe um usuário com o email cadastrado no banco de dados', async () => {
      try {
        await userService.create(userMock.info);
      } catch(e) {
        expect(e).to.deep.equals(errorMock.userExists);
      }
    });
  });

  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(userMock.stored);
      sinon.stub(jwt, 'createToken').returns(userMock.token);
  
      response = await userService.create(userMock.info);
    });
  
    after(async () => {
      await User.findOne.restore();
      await User.create.restore();
      await jwt.createToken.restore();
    });
  
    it('retorna uma string', () => {
      expect(response).to.be.a('string');
    });
  
    it('a string tem o valor esperado', () => {
      expect(response).to.eql(userMock.token);
    });
  });
});
