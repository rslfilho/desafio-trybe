const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../../services/user');
const { User } = require('../../../database/models');
const { jwt, errors } = require('../../../helpers');
const userMock = require('../../mocks/user');
const errorMock = require('../../mocks/errors');

describe('O serviço da rota POST/login', () => {
  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userMock.stored);
      sinon.stub(jwt, 'createToken').returns(userMock.token);
  
      response = await userService.login(userMock.login);
    });
  
    after(async () => {
      await User.findOne.restore();
      await jwt.createToken.restore();
    });
  
    it('retorna uma string', () => {
      expect(response).to.be.a('string');
    });
  
    it('a string tem o valor esperado', () => {
      expect(response).to.eql(userMock.token);
    });
  });

  describe('lança um erro quando', () => {
    describe('o usuário não existe no banco de dados', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });
    
      after(async () => {
        await User.findOne.restore();
      });

      it('o erro lançado é o esperado', async () => {
        try {
          await userService.login(userMock.wrongLogin);
        } catch(e) {
          expect(e).to.deep.equals(errors.invalidFields);
        }
      });
    });

    describe('a senha enviada não confere com a do usuário', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userMock.stored);
      });
    
      after(async () => {
        await User.findOne.restore();
      });

      it('o erro lançado é o esperado', async () => {
        try {
          await userService.login(userMock.wrongLogin);
        } catch(e) {
          expect(e).to.deep.equals(errors.invalidFields);
        }
      });
    });
  });
});

describe('O serviço da rota POST/user', () => {
  describe('lança um erro quando', () => {  
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMock.created);
    });
  
    after(async () => {
      await User.findOne.restore();
    });

    it('já existe um usuário com o email cadastrado no banco de dados', async () => {
      try {
        await userService.create(userMock.info);
      } catch(e) {
        expect(e).to.deep.equals(errorMock.userExists);
      }
    });
  });

  describe('em caso de sucesso', () => {
    let response;
  
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(userMock.stored);
      sinon.stub(jwt, 'createToken').returns(userMock.token);
  
      response = await userService.create(userMock.info);
    });
  
    after(async () => {
      await User.findOne.restore();
      await User.create.restore();
      await jwt.createToken.restore();
    });
  
    it('retorna uma string', () => {
      expect(response).to.be.a('string');
    });
  
    it('a string tem o valor esperado', () => {
      expect(response).to.eql(userMock.token);
    });
  });
});

describe('O serviço da rota GET/user', () => {
  let response;

  before(async () => {
    sinon.stub(User, 'findAll').resolves(userMock.userList);

    response = await userService.getAll();
  });

  after(async () => {
    await User.findAll.restore();
  });

  it('retorna um array', () => {
    expect(response).to.be.an('array');
  });

  it('o array possui objetos', () => {
    expect(response[0]).to.be.an('object');
  })

  it('o array é igual ao esperado', () => {
    expect(response).to.deep.equals(userMock.userList)
  });
});
