export const nameValidation = {
  isString: {
    errorMessage: 'Name must be string.',
  },
  trim: true,
  isLength: {
    options: { min: 2, max: 16 },
    errorMessage: 'Name must be between 2 and 16 characters long.',
  },
};

export const emailValidation = {
  notEmpty: {
    errorMessage: 'Email must not be empty.',
  },
  isEmail: {
    errorMessage: 'Email must be valid.',
  },
};

export const passwordValidation = {
  isString: {
    errorMessage: 'Password must be string.',
  },
  isLength: {
    options: { min: 6 },
    errorMessage: 'Password must be at least 6 characters long.',
  },
  matches: {
    options: /^[\d\w!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
    errorMessage:
      'Password must contain only letters (a-z), numbers (0-9) and special characters',
  },
};

export const otpValidation = {
  isString: {
    errorMessage: 'OTP must be string.',
  },
  isLength: {
    options: { min: 6, max: 6 },
    errorMessage: 'OTP must be exactly 6 characters long.',
  },
};
