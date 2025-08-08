export type RegisterUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserDTO = {
  email: string;
  password: string;
};

export type verifyOtpDTO = {
  email: string;
  otp: string;
};
