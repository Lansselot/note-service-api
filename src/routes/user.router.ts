import { Router } from 'express';
import {
  createUserValidator,
  updateUserValidator,
} from '../validators/user.validator';
import { validate } from '../middleware/validate';
import { userController } from '../controllers';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, userController.getUserById);
router.put(
  '/',
  createUserValidator,
  validate,
  authenticate,
  userController.updateUser
);
router.patch(
  '/',
  updateUserValidator,
  validate,
  authenticate,
  userController.updateUser
);
router.delete('/', authenticate, userController.deleteUser);

export default router;
