import { AppJwtPayload } from '../../../types/jwt';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Request, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
    passReqToCallback: true,
  },
  async (req: Request, jwt_payload: AppJwtPayload, done) => {
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      req.accessToken = token as string;
      console.log('auth jwtstrategy', JSON.stringify(jwt_payload));
      return done(null, jwt_payload);
    } catch (err) {
      return done(err, false);
    }
  }
);
