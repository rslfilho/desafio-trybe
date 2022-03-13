const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../api/app');
const { User } = require('../../../database/models');
const { jwt } = require('../../../helpers');
const userMock = require('../../mocks/user');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET/user/:id', () => {
  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      sinon.stub(jwt, 'validateToken').returns(userMock.created)
      sinon.stub(User, 'findByPk').rejects();
      response = await chai.request(app)
        .get('/user/1')
        .set('Authorization', userMock.token)

      await jwt.validateToken.restore();
      await User.findByPk.restore();
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

  describe('Não é possível listar usuário pelo ID', () => {
    describe('que não existe no banco de dados', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/user/999')
          .set('Authorization', userMock.token)
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

      it('a propriedade "message" possui o texto "Usuário não existe"', () => {
        expect(response.body.message).to.be.equal('Usuário não existe');
      });
    });

    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/user/1')
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
          .get('/user/1')
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

  describe('É possível listar usuário pelo ID com token válido', () => {
    let response;
      before(async () => {
        sinon.stub(jwt, 'validateToken').returns(userMock.created)
        sinon.stub(User, 'findByPk').resolves(userMock.created);
        response = await chai.request(app)
        .get('/user/1')
        .set('Authorization', userMock.token)

      await jwt.validateToken.restore();
      await User.findByPk.restore();
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um object', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objetp é igual ao esperado', () => {
        expect(response.body).to.deep.equals(userMock.created)
      });
  });
});