import { createPassportAuthMiddleware } from '../utils/passport';

export const jwtAuthenticate = createPassportAuthMiddleware('jwt', {
  session: false,
});

export const googleAuthenticate = createPassportAuthMiddleware('google', {
  scope: ['profile', 'email'],
});

export const googleCallbackAuthenticate = createPassportAuthMiddleware(
  'google',
  { session: false }
);
