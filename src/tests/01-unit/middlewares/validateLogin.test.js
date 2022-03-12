const { expect } = require('chai');
const sinon = require('sinon');

const { validateLogin } = require('../../../middlewares');
const validationService = require('../../../services/validation');
const userMock = require('../../mocks/user');
const { errors } = require('../../../helpers');
const validationError = require('./mocks');

describe('O middleware de validação de dados de login', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('quando acontece um erro', () => {
    describe('pois o "email" não é passado', () => {
      before(() => {
        sinon.stub(validationService, 'login').returns(validationError.emailRequired);
        request.body = userMock.login;
      });
  
      after(async () => {
        await validationService.login.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateLogin(request, response, next);
        expect(next.calledWith(errors.emailRequired)).to.be.true;
      });
    });

    describe('pois o "password" não é passado', () => {
      before(() => {
        sinon.stub(validationService, 'login').returns(validationError.passwordRequired);
        request.body = userMock.login;
      });
  
      after(async () => {
        await validationService.login.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateLogin(request, response, next);
        expect(next.calledWith(errors.passwordRequired)).to.be.true;
      });
    });

    describe('pois o "email" está vazio', () => {
      before(() => {
        sinon.stub(validationService, 'login').returns(validationError.emailEmpty);
        request.body = userMock.info;
      });
  
      after(async () => {
        await validationService.login.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateLogin(request, response, next);
        expect(next.calledWith(errors.emptyEmail)).to.be.true;
      });
    });

    describe('pois o "password" está vazio', () => {
      before(() => {
        sinon.stub(validationService, 'login').returns(validationError.passwordEmpty);
        request.body = userMock.login;
      });
  
      after(async () => {
        await validationService.login.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateLogin(request, response, next);
        expect(next.calledWith(errors.emptyPassword)).to.be.true;
      });
    });
  });

  describe('quando os dados são válidos', () => {
    before(() => {
      sinon.stub(validationService, 'login').returns({ value: true });
      request.body = userMock.login;
    });

    after(async () => {
      await validationService.login.restore();
      request.body = undefined;
    });

    it('a função next é chamada sem parâmetros', async () => {
      await validateLogin(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});
