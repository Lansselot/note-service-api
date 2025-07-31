export const tokenValidation = {
  isString: {
    errorMessage: 'Token must be a string.',
  },
  notEmpty: {
    errorMessage: 'Token cannot be empty.',
  },
};

export const otpValidation = {
  isString: {
    errorMessage: 'OTP must be a string.',
  },
  isLength: {
    options: { min: 6, max: 6 },
    errorMessage: 'OTP must be exactly 6 characters long.',
  },
};
