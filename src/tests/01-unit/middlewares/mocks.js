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

const emailEmpty = {
  error: {
    message: '"email" is not allowed to be empty',
  }
};

const passwordEmpty = {
  error: {
    message: '"password" is not allowed to be empty',
  }
};

const titleRequired = {
  error: {
    message: '"title" is required',
  }
};

const contentRequired = {
  error: {
    message: '"content" is required',
  }
};

module.exports = {
  nameLength,
  invalidEmail,
  emailRequired,
  passwordLength,
  passwordRequired,
  emailEmpty,
  passwordEmpty,
  titleRequired,
  contentRequired,
};
