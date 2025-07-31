import { Router } from 'express';
import {
  loginOTPValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyOTPValidator,
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
router.post('/otp', loginOTPValidator, validate, authController.loginOTP);
router.post(
  '/otp/verify',
  verifyOTPValidator,
  validate,
  authController.verifyOTP
);

export default router;
