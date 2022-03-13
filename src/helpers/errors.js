const errors = {
  userExists: {
    statusCode: 409,
    code: 'conflict',
    message: 'Usuário já existe',
  },
  nameLength: {
    statusCode: 400,
    code: 'bad_request',
    message: '"displayName" length must be at least 8 characters long',
  },
  invalidEmail: {
    statusCode: 400,
    code: 'bad_request',
    message: '"email" must be a valid email',
  },
  emailRequired: {
    statusCode: 400,
    code: 'bad_request',
    message: '"email" is required',
  },
  passwordLength: {
    statusCode: 400,
    code: 'bad_request',
    message: '"password" length must be 6 characters long',
  },
  passwordRequired: {
    statusCode: 400,
    code: 'bad_request',
    message: '"password" is required',
  },
  invalidFields: {
    statusCode: 400,
    code: 'bad_request',
    message: 'Campos inválidos',
  },
  emptyEmail: {
    statusCode: 400,
    code: 'bad_request',
    message: '"email" is not allowed to be empty',
  },
  emptyPassword: {
    statusCode: 400,
    code: 'bad_request',
    message: '"password" is not allowed to be empty',
  },
  missingToken: {
    statusCode: 401,
    code: 'unauthorized',
    message: 'Token não encontrado',
  },
  jwtMalformed: {
    statusCode: 401,
    code: 'unauthorized',
    message: 'Token expirado ou inválido',
  },
  userNotFound: {
    statusCode: 404,
    code: 'not_found',
    message: 'Usuário não existe',
  },
};

module.exports = errors;
