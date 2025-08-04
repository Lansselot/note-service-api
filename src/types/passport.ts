export type GoogleUserData = {
  email: string;
  name: string;
  googleId: string;
};

export type AuthStrategy = 'jwt' | 'google';
