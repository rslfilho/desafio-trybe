const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../api/app');
const { User } = require('../../../database/models');
const { jwt } = require('../../../helpers');
const userMock = require('../../mocks/user');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/user', () => {
  describe('Em caso de erro interno', () => {
    let response;

    before(async () => {
      sinon.stub(User, 'findOne').rejects();
      response = await chai.request(app)
        .post('/user')
        .send(userMock.info);

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

  describe('Não é possível criar um usuário', () => {
    describe('com algum dado inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/user')
          .send(userMock.invalidInfo);
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

    describe('com um usuário com email já cadastrado no banco de dados', () => {
      let response;
      before(async () => {
        sinon.stub(User, 'findOne').resolves(userMock.stored.dataValues);

        response = await chai.request(app)
          .post('/user')
          .send(userMock.info);
        
        await User.findOne.restore();
      });

      it('retorna o código de status 409', () => {
        expect(response).to.have.status(409);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Usuário já existe"', () => {
        expect(response.body.message).to.be.equal('Usuário já existe');
      });
    });
  });

  describe('É possível criar usuário com dados corretos', () => {
    let response;
      before(async () => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(User, 'create').resolves(userMock.stored);
        sinon.stub(jwt, 'createToken').resolves(userMock.token);

        response = await chai.request(app)
          .post('/user')
          .send(userMock.info);
        
        await User.findOne.restore();
        await User.create.restore();
        await jwt.createToken.restore();
      });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
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