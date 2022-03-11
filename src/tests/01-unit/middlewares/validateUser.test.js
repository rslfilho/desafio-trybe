const { expect } = require('chai');
const sinon = require('sinon');

const { validateUser } = require('../../../middlewares');
const validationService = require('../../../services/validation');
const userMock = require('../../mocks/user');
const { errors } = require('../../../helpers');
const validationError = require('./mocks');

describe('O middleware de validação de dados de usuário', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('quando acontece um erro', () => {
    describe('pois o "displayName" é menor que 8 caracteres', () => {
      before(() => {
        sinon.stub(validationService, 'user').returns(validationError.nameLength);
        request.body = userMock.info;
      });
  
      after(async () => {
        await validationService.user.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateUser(request, response, next);
        expect(next.calledWith(errors.nameLength)).to.be.true;
      });
    });

    describe('pois o "email" é inválido', () => {
      before(() => {
        sinon.stub(validationService, 'user').returns(validationError.invalidEmail);
        request.body = userMock.info;
      });
  
      after(async () => {
        await validationService.user.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateUser(request, response, next);
        expect(next.calledWith(errors.invalidEmail)).to.be.true;
      });
    });

    describe('pois o "email" não é passado', () => {
      before(() => {
        sinon.stub(validationService, 'user').returns(validationError.emailRequired);
        request.body = userMock.info;
      });
  
      after(async () => {
        await validationService.user.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateUser(request, response, next);
        expect(next.calledWith(errors.emailRequired)).to.be.true;
      });
    });

    describe('pois o "password" é menor que 6 caracteres', () => {
      before(() => {
        sinon.stub(validationService, 'user').returns(validationError.passwordLength);
        request.body = userMock.info;
      });
  
      after(async () => {
        await validationService.user.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateUser(request, response, next);
        expect(next.calledWith(errors.passwordLength)).to.be.true;
      });
    });

    describe('pois o "password" não é passado', () => {
      before(() => {
        sinon.stub(validationService, 'user').returns(validationError.passwordRequired);
        request.body = userMock.info;
      });
  
      after(async () => {
        await validationService.user.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateUser(request, response, next);
        expect(next.calledWith(errors.passwordRequired)).to.be.true;
      });
    });
  });

  describe('quando os dados são válidos', () => {
    before(() => {
      sinon.stub(validationService, 'user').returns({ value: true });
      request.body = userMock.info;
    });

    after(async () => {
      await validationService.user.restore();
      request.body = undefined;
    });

    it('a função next é chamada sem parâmetros', async () => {
      await validateUser(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});
