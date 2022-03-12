const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../api/app');
const { User } = require('../../../database/models');
const { jwt } = require('../../../helpers');
const userMock = require('../../mocks/user');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/login', () => {
  describe('Em caso de erro interno', () => {
    let response;

    before(async () => {
      sinon.stub(User, 'findOne').rejects();
      response = await chai.request(app)
        .post('/login')
        .send(userMock.login);

      await User.findOne.restore();
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

  describe('Não é possível fazer o login', () => {
    describe('com algum dado inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/login')
          .send(userMock.invalidLogin);
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

      it('a propriedade "message" possui o texto ""email" must be a valid email"', () => {
        expect(response.body.message).to.be.equal('"email" must be a valid email');
      });
    });

    describe('com um usuário não cadastrado no banco de dados', () => {
      let response;
      before(async () => {
        sinon.stub(User, 'findOne').resolves(null);

        response = await chai.request(app)
          .post('/login')
          .send(userMock.login);
        
        await User.findOne.restore();
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

      it('a propriedade "message" possui o texto "Campos inválidos"', () => {
        expect(response.body.message).to.be.equal('Campos inválidos');
      });
    });
  });

  describe('É possível fazer login com dados corretos', () => {
    let response;
      before(async () => {
        sinon.stub(User, 'findOne').resolves({
          "id": 1,
          "displayName": "Brett Wiltshire",
          "email": "brett@email.com",
          "password": "123456",
          "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
        });
        sinon.stub(jwt, 'createToken').resolves(userMock.token);

        response = await chai.request(app)
          .post('/login')
          .send(userMock.login);
        
        await User.findOne.restore();
        await jwt.createToken.restore();
      });
    
    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.all.keys('token');
    });

    it('o valor da chave token é o esperado', () => {
      expect(response.body.token).to.equals(userMock.token);
    });
  });
});