import { Router } from 'express';
import {
  loginValidator,
  refreshTokenValidator,
  registerValidator,
} from '../validators/auth.validator';
import { validate } from '../middleware/validate.middleware';
import { authController } from '../controllers';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post(
  '/refresh',
  refreshTokenValidator,
  validate,
  authController.refresh
);
router.post('/logout', authenticate, authController.logout);

export default router;
