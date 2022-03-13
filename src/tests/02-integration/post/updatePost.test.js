const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../api/app');
const { Post } = require('../../../database/models');
const { jwt } = require('../../../helpers');
const userMock = require('../../mocks/user');
const postMock = require('../../mocks/post');

chai.use(chaiHttp);

const { expect } = chai;

describe('PUT/post/:id', () => {
  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      sinon.stub(jwt, 'validateToken').returns(userMock.created)
      sinon.stub(Post, 'findByPk').rejects();
      response = await chai.request(app)
        .put('/post/1')
        .set('Authorization', userMock.token)
        .send(postMock.toUpdate);

      await jwt.validateToken.restore();
      await Post.findByPk.restore();
    });

    it('retorna o código de status 500', () => {
      expect(response).to.have.status(500);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Internal Error"', () => {
      expect(response.body.message).to.be.equal('Internal Error');
    });
  });

  describe('Não é possível atualizar o post', () => {
    describe('que não existem no banco de dados', () => {
      let response;

      before(async () => {
        sinon.stub(Post, 'findByPk').resolves(null);
        sinon.stub(jwt, 'validateToken').returns(userMock.created);

        response = await chai.request(app)
          .put('/post/999')
          .set('Authorization', userMock.token)
          .send(postMock.toUpdate);
        
        await Post.findByPk.restore();
        await jwt.validateToken.restore();
      });

      it('retorna o código de status 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Post não existe"', () => {
        expect(response.body.message).to.be.equal('Post não existe');
      });
    });

    describe('que o usuário autenticado não é proprietário', () => {
      let response;

      before(async () => {
        sinon.stub(Post, 'findByPk').resolves({ userId: 15 });
        sinon.stub(jwt, 'validateToken').returns(userMock.created);

        response = await chai.request(app)
          .put('/post/1')
          .set('Authorization', userMock.token)
          .send(postMock.toUpdate);
        
        await Post.findByPk.restore();
        await jwt.validateToken.restore();
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Usuário não autorizado"', () => {
        expect(response.body.message).to.be.equal('Usuário não autorizado');
      });
    });

    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .put('/post/1')
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Token não encontrado"', () => {
        expect(response.body.message).to.be.equal('Token não encontrado');
      });
    });

    describe('com um token de autenticação inválido ou expirado', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .put('/post/1')
          .set('Authorization', 'tokenIvalido')
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Token expirado ou inválido"', () => {
        expect(response.body.message).to.be.equal('Token expirado ou inválido');
      });
    });
  });

  describe('É possível atualizar posts com token válido', () => {
    let response;
      before(async () => {
        sinon.stub(jwt, 'validateToken').returns(userMock.created)
        sinon.stub(Post, 'findByPk').resolves({ userId: 1 });
        sinon.stub(Post, 'update').resolves(undefined);
        response = await chai.request(app)
          .put('/post/1')
          .set('Authorization', userMock.token)
          .send(postMock.toUpdate)

        await jwt.validateToken.restore();
        await Post.findByPk.restore();
        await Post.update.restore();
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui as propriedades "title", "content" e "userId"', () => {
        expect(response.body).to.have.all.keys('title', 'content', 'userId');
      });

      it('o objeto é o esperado', () => {
        expect(response.body).to.deep.equals(postMock.updated);
      });
  });
});