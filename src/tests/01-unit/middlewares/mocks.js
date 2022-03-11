const nameLength = {
  error: {
    message: '"displayName" length must be at least 8 characters long',
  }
};

const invalidEmail = {
  error: {
    message: '"email" must be a valid email',
  }
};

const emailRequired = {
  error: {
    message: '"email" is required',
  }
};

const passwordLength = {
  error: {
    message: '"password" length must be 6 characters long',
  }
};

const passwordRequired = {
  error: {
    message: '"password" is required',
  }
};

module.exports = {
  nameLength,
  invalidEmail,
  emailRequired,
  passwordLength,
  passwordRequired,
};
