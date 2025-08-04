import passport from 'passport';
import dotenv from 'dotenv';
import { jwtStrategy } from './strategies/jwt.strategy';
import { googleStrategy } from './strategies/google.strategy';

dotenv.config({ quiet: true });

passport.use('jwt', jwtStrategy);
passport.use('google', googleStrategy);

export default passport;
