const { expect } = require('chai');
const sinon = require('sinon');

const postService = require('../../../services/post');
const { Post } = require('../../../database/models');
const { jwt, errors } = require('../../../helpers');
const userMock = require('../../mocks/user');
const postMock = require('../../mocks/post');
const errorMock = require('../../mocks/errors');

describe('O serviço da rota POST/post', () => {
  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
      sinon.stub(Post, 'create').resolves(postMock.stored);
  
      response = await postService.create(postMock.createReturn);
    });
  
    after(async () => {
      await Post.create.restore();
    });
  
    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });
  
    it('o objeto possui a propriedade "title", "content" e "userId"', () => {
      expect(response).to.have.all.keys('title', 'content', 'userId');
    });

    it('o conteúdo do objeto é o esperado', () => {
      expect(response).to.deep.equals(postMock.createReturn);
    });
  });
});
