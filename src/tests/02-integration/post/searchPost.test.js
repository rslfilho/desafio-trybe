const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../api/app');
const { Post } = require('../../../database/models');
const { errors, jwt } = require('../../../helpers');
const userMock = require('../../mocks/user');
const postMock = require('../../mocks/post');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET/post/search', () => {
  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      sinon.stub(jwt, 'validateToken').returns(userMock.created)
      sinon.stub(Post, 'findAll').rejects();
      response = await chai.request(app)
        .get('/post/search')
        .set('Authorization', userMock.token)
        .query({ q: 'Título' });

      await jwt.validateToken.restore();
      await Post.findAll.restore();
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

  describe('Não é possível buscar posts', () => {
    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/post/search')
          .query({ q: 'Título' });
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
          .get('/post/search')
          .set('Authorization', 'tokenIvalido')
          .query({ q: 'Título' });
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

  describe('É possível buscar posts com token válido', () => {
    let response;
      before(async () => {
        sinon.stub(jwt, 'validateToken').returns(userMock.created)
        sinon.stub(Post, 'findAll').resolves(postMock.postList);
        response = await chai.request(app)
        .get('/post/search')
        .set('Authorization', userMock.token)
        .query({ q: 'Título' });

        await jwt.validateToken.restore();
        await Post.findAll.restore();
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um array', () => {
        expect(response.body).to.be.an('array');
      });

      it('o array possui objetos', () => {
        expect(response.body[0]).to.be.an('object');
      })

      it('o array é igual ao esperado', () => {
        expect(response.body).to.deep.equals(postMock.postList)
      });
  });
});