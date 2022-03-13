const { expect } = require('chai');
const sinon = require('sinon');

const postController = require('../../../controllers/post');
const postService = require('../../../services/post');
const { errors } = require('../../../helpers');
const userMock = require('../../mocks/user');
const postMock = require('../../mocks/post');
const errorMock = require('../../mocks/errors');

describe('O controller da rota POST/post', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('quando cria um post com sucesso', () => {
    before(() => {
      sinon.stub(postService, 'create').resolves(postMock.createReturn);
      request.body = postMock.bodyInfo;
      request.user = userMock.created;
    });

    after(async () => {
      await postService.create.restore();
      request.body = undefined;
      request.user = undefined;
    });

    it('res.status é chamada com o código 201', async () => {
      await postController.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.true;
    });

    it('res.json é chamado com o token', async () => {
      await postController.create(request, response, next);
      expect(response.json.calledWith(postMock.createReturn)).to.be.true;
    });
  });
});

describe('O controller da rota GET/post', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('Em caso de sucesso', () => {
    before(() => {
      sinon.stub(postService, 'getAll').resolves(postMock.postList);
    });

    after(async () => {
      await postService.getAll.restore();
    });

    it('res.status é chamada com o código 200', async () => {
      await postController.getAll(request, response, next);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('res.json é chamado com a lista de usuários', async () => {
      await postController.getAll(request, response, next);
      expect(response.json.calledWith(postMock.postList)).to.be.true;
    });
  });
});
