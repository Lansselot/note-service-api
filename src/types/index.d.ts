import { AppJwtPayload } from './jwt';
import { GoogleUserData } from './passport';

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
      accessToken?: string;
      googleUser?: GoogleUserData;
    }
  }
}
