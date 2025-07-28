export const titleValidation = {
  isString: {
    errorMessage: 'Title must be string.',
  },
  trim: true,
  notEmpty: {
    errorMessage: 'Title must not be empty.',
  },
  isLength: {
    options: { max: 16 },
    errorMessage: 'Title must be at most 16 characters long.',
  },
};

export const contentValidation = {
  isString: {
    errorMessage: 'Content must be string.',
  },
  isLength: {
    options: { max: 65536 },
    errorMessage: 'Content too long',
  },
};
