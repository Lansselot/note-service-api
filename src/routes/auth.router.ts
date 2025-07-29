import { Router } from 'express';
import { register } from 'module';
import {
  loginValidator,
  refreshTokenValidator,
  registerValidator,
} from '../validators/auth.validator';
import { validate } from '../middleware/validate.middleware';
import { authController } from '../controllers';

const router = Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post(
  '/refresh',
  refreshTokenValidator,
  validate,
  authController.refresh
);

export default router;
