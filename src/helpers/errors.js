const errors = {
  userExists: {
    statusCode: 409,
    code: 'conflict',
    message: 'Usuário já existe',
  },
};

module.exports = errors;
