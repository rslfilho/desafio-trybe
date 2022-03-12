const { expect } = require('chai');
const sinon = require('sinon');

const { auth } = require('../../../middlewares');
const userMock = require('../../mocks/user');
const { errors, jwt } = require('../../../helpers');

describe('O middleware de autenticação de usuários', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('quando acontece um erro', () => {
    describe('pois o token não é repassado', () => {
      before(() => {
        request.headers = {
          authorization: undefined,
        };
      });
  
      after(() => {
        request.headers = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await auth(request, response, next);
        expect(next.calledWith(errors.missingToken)).to.be.true;
      });
    });

    describe('pois o token é inválido', () => {
      before(() => {
        sinon.stub(jwt, 'validateToken').returns({ message: true });
        request.headers = {
          authorization: userMock.token,
        };
      });
  
      after(async () => {
        await jwt.validateToken.restore();
        request.headers = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await auth(request, response, next);
        expect(next.calledWith(errors.jwtMalformed)).to.be.true;
      });
    });
  });

  describe('quando o token é válido', () => {
    before(() => {
      sinon.stub(jwt, 'validateToken').returns(userMock.created);
      request.headers = {
        authorization: userMock.token,
      };
    });

    after(async () => {
      await jwt.validateToken.restore();
      request.headers = undefined;
    });

    it('a função next é chamada sem parâmetros', async () => {
      await auth(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});
