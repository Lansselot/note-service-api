import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.API_BASE_URL}/api/auth/google/callback`,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      req.googleUser = {
        email: profile.emails?.[0].value as string,
        name: profile.displayName,
        googleId: profile.id,
      };

      return done(null, {});
    } catch (error) {
      return done(error, false);
    }
  }
);
