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
  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
        sinon.stub(Post, 'findByPk').resolves({ userId: 1 });
        sinon.stub(Post, 'destroy').resolves(undefined);
  
      response = await postService.remove(1, 1);
    });
  
    after(async () => {
      await Post.findByPk.restore();
      await Post.destroy.restore();
    });
  
    it('retorna undefined', () => {
      expect(response).to.be.undefined;
    });
  });

  describe('em caso de erro', () => {
    describe('quando o post não existe no banco de dados', () => {
      before(() => {
        sinon.stub(Post, 'findByPk').resolves(null);
      });
    
      after(async () => {
        await Post.findByPk.restore();
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
        sinon.stub(Post, 'findByPk').resolves({ userId: 15 });
      });
    
      after(async () => {
        await Post.findByPk.restore();
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
});

describe('O serviço da rota PUT/post/:id', () => {
  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
        sinon.stub(Post, 'findByPk').resolves({ userId: 1 });
        sinon.stub(Post, 'update').resolves(undefined);
  
      response = await postService.update(1, 1, postMock.toUpdate);
    });
  
    after(async () => {
      await Post.findByPk.restore();
      await Post.update.restore();
    });
  
    it('retorna um objeto', () => {
      expect(response).to.be.an('object');
    });

    it('o objeto possui as propriedades "title", "content" e "userId"', () => {
      expect(response).to.have.all.keys('title', 'content', 'userId');
    });

    it('o objeto é o esperado', () => {
      expect(response).to.deep.equals(postMock.updated);
    });
  });

  describe('em caso de erro', () => {
    describe('quando o post não existe no banco de dados', () => {
      before(() => {
        sinon.stub(Post, 'findByPk').resolves(null);
      });
    
      after(async () => {
        await Post.findByPk.restore();
      });

      it('lança o erro esperado', async () => {
        try {
          await postService.update(1, 1, postMock.toUpdate);
        } catch (e) {
          expect(e).to.deep.equals(errors.postNotFound);
        }
      });
    });

    describe('quando o usuário autenticado não é proprietário do post', () => {
      before(() => {
        sinon.stub(Post, 'findByPk').resolves({ userId: 15 });
      });
    
      after(async () => {
        await Post.findByPk.restore();
      });

      it('lança o erro esperado', async () => {
        try {
          await postService.update(1, 1, postMock.toUpdate);
        } catch (e) {
          expect(e).to.deep.equals(errors.userNotAuthorized);
        }
      });
    });
  });
});

describe('O serviço da rota GET/post/search', () => {
  describe('quando busca um conteúdo do título', () => {
    let response;
  
    before(async () => {
      sinon.stub(Post, 'findAll').resolves(postMock.postList);
  
      response = await postService.search('Título');
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

  describe('quando busca um conteúdo do content', () => {
    let response;
  
    before(async () => {
      sinon.stub(Post, 'findAll').resolves(postMock.postList);
  
      response = await postService.search('Conteúdo');
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

  describe('quando busca um conteúdo que não tem no banco de dados', () => {
    let response;
  
    before(async () => {
      sinon.stub(Post, 'findAll').resolves([]);
  
      response = await postService.search('Banana');
    });
  
    after(async () => {
      await Post.findAll.restore();
    });
  
    it('retorna um array', () => {
      expect(response).to.be.an('array');
    });
  
    it('o array é igual ao esperado', () => {
      expect(response).to.be.empty;
    });
  });

  describe('quando busca uma string vazia', () => {
    let response;
  
    before(async () => {
      sinon.stub(Post, 'findAll').resolves(postMock.postList);
  
      response = await postService.search('');
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
});
