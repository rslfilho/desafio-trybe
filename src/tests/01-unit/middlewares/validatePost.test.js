const { expect } = require('chai');
const sinon = require('sinon');

const { validatePost } = require('../../../middlewares');
const validationService = require('../../../services/validation');
const postMock = require('../../mocks/post');
const { errors } = require('../../../helpers');
const validationError = require('./mocks');

describe('O middleware de validação de dados do post', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('quando acontece um erro', () => {
    describe('pois o "title" não é passado', () => {
      before(() => {
        sinon.stub(validationService, 'post').returns(validationError.titleRequired);
        request.body = postMock.invalidBodyInfo;
      });
  
      after(async () => {
        await validationService.post.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validatePost(request, response, next);
        expect(next.calledWith(errors.titleRequired)).to.be.true;
      });
    });

    describe('pois o "content" não é passado', () => {
      before(() => {
        sinon.stub(validationService, 'post').returns(validationError.contentRequired);
        request.body = postMock.invalidBodyInfo;
      });
  
      after(async () => {
        await validationService.post.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validatePost(request, response, next);
        expect(next.calledWith(errors.contentRequired)).to.be.true;
      });
    });
  });

  describe('quando os dados são válidos', () => {
    before(() => {
      sinon.stub(validationService, 'post').returns({ value: true });
      request.body = postMock.bodyInfo;
    });

    after(async () => {
      await validationService.post.restore();
      request.body = undefined;
    });

    it('a função next é chamada sem parâmetros', async () => {
      await validatePost(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});
