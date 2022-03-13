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

describe('O serviço da rota GET/post', () => {
  let response;

  before(async () => {
    sinon.stub(Post, 'findAll').resolves(postMock.postList);

    response = await postService.getAll();
  });

  after(async () => {
    await Post.findAll.restore();
  });

  it('retorna um array', () => {
    expect(response).to.be.an('array');
  });

  it('o array possui objetos', () => {
    expect(response[0]).to.be.an('object');
  });

  it('o array é igual ao esperado', () => {
    expect(response).to.deep.equals(postMock.postList)
  });
});

describe('O serviço da rota GET/post/:id', () => {
  let response;

  before(async () => {
    sinon.stub(Post, 'findByPk').resolves(postMock.created);

    response = await postService.getById();
  });

  after(async () => {
    await Post.findByPk.restore();
  });

  it('retorna um object', () => {
    expect(response).to.be.an('object');
  });

  it('o array é igual ao esperado', () => {
    expect(response).to.deep.equals(postMock.created)
  });
});

describe('O serviço da rota DELETE/post/:id', () => {
  describe('em caso de erro', () => {
    describe('quando o post não existe no banco de dados', () => {
      before(() => {
        sinon.stub(Post, 'destroy').resolves(null);
      });
    
      after(async () => {
        await Post.destroy.restore();
      });

      it('lança o erro esperado', async () => {
        try {
          await postService.remove(1, 1);
        } catch (e) {
          expect(e).to.deep.equals(errors.postNotFound);
        }
      });
    });

    describe('quando o usuário autenticado não é proprietário do post', () => {
      before(() => {
        sinon.stub(Post, 'destroy').resolves({ userId: 15 });
      });
    
      after(async () => {
        await Post.destroy.restore();
      });

      it('lança o erro esperado', async () => {
        try {
          await postService.remove(1, 1);
        } catch (e) {
          expect(e).to.deep.equals(errors.userNotAuthorized);
        }
      });
    });
  });

  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
      sinon.stub(Post, 'destroy').resolves({ userId: 1 });
  
      response = await postService.remove(1, 1);
    });
  
    after(async () => {
      await Post.destroy.restore();
    });
  
    it('retorna undefined', () => {
      expect(response).to.be.undefined;
    });
  });
});
