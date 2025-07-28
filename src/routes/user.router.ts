import { Router } from 'express';
import {
  putUserValidator,
  patchUserValidator,
} from '../validators/user.validator';
import { validate } from '../middleware/validate.middleware';
import { userController } from '../controllers';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, userController.getUserById);
router.put(
  '/',
  putUserValidator,
  validate,
  authenticate,
  userController.updateUser
);
router.patch(
  '/',
  patchUserValidator,
  validate,
  authenticate,
  userController.updateUser
);
router.delete('/', authenticate, userController.deleteUser);

export default router;
