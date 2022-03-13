const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../api/app');
const { Post } = require('../../../database/models');
const { jwt } = require('../../../helpers');
const postMock = require('../../mocks/post');
const userMock = require('../../mocks/user');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/post', () => {
  describe('Em caso de erro interno', () => {
    let response;

    before(async () => {
      sinon.stub(Post, 'create').rejects();
      sinon.stub(jwt, 'validateToken').returns(userMock.created);
      response = await chai.request(app)
        .post('/post')
        .set('Authorization', userMock.token)
        .send(postMock.bodyInfo);

      await Post.create.restore();
      await jwt.validateToken.restore();
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

  describe('Não é possível criar um post', () => {
    describe('com algum dado inválido', () => {
      let response;
      before(async () => {
        sinon.stub(jwt, 'validateToken').returns(userMock.created);

        response = await chai.request(app)
          .post('/post')
          .set('Authorization', userMock.token)
          .send(postMock.invalidBodyInfo);
        
        await jwt.validateToken.restore();
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto ""title" is required"', () => {
        expect(response.body.message).to.be.equal('"title" is required');
      });
    });

    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/post');
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
          .post('/post')
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

  describe('É possível criar post com dados corretos e token válido', () => {
    let response;
      before(async () => {
        sinon.stub(Post, 'create').resolves(postMock.stored);
        sinon.stub(jwt, 'validateToken').returns(userMock.created);

        response = await chai.request(app)
          .post('/post')
          .set('Authorization', userMock.token)
          .send(postMock.bodyInfo);
        
        await Post.create.restore();
        await jwt.validateToken.restore();
      });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "title", "content" e "userId"', () => {
      expect(response.body).to.have.all.keys('title', 'content', 'userId');
    });

    it('o conteúdo do objeto é o esperado', () => {
      expect(response.body).to.deep.equals(postMock.createReturn);
    });
  });
});