import { AppJwtPayload } from './jwt';
import { GoogleUserData } from './passport';

declare global {
  namespace Express {
    interface User extends AppJwtPayload {}
    interface Request {
      accessToken?: string;
      googleUser?: GoogleUserData;
    }
  }
}
