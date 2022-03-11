const { expect } = require('chai');
const sinon = require('sinon');

const userController = require('../../../controllers/user');
const userService = require('../../../services/user');
const userMock = require('../../mocks/user');
const errorMock = require('../../mocks/errors');

describe.only('O controller da rota POST/user', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });
  
  describe('quando acontece um erro', () => {
    before(() => {
      sinon.stub(userService, 'create').rejects(errorMock.userExists);
      request.body = userMock.info;
    });

    after(async () => {
      await userService.create.restore();
      request.body = undefined;
    });

    describe('pois já existe um usuário com o email cadastrado no banco de dados', () => {
      it('a função next é chamada com o parâmetro correto', async () => {
        await userController.create(request, response, next);
        expect(next.calledWith(errorMock.userExists)).to.be.true;
      });
    });
  });

  describe('quando cria um usuário com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'create').resolves(userMock.token);
      request.body = userMock.info;
    });

    after(async () => {
      await userService.create.restore();
      request.body = undefined;
    });

    it('res.status é chamada com o código 201', async () => {
      await userController.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.true;
    });

    it('res.json é chamado com o token', async () => {
      await userController.create(request, response, next);
      expect(response.json.calledWith({ token: userMock.token })).to.be.true;
    });
  });
});
