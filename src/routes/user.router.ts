import { Router } from 'express';
import {
  putUserValidator,
  patchUserValidator,
  changeEmailValidator,
  changePasswordValidator,
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
router.post(
  '/change-email',
  changeEmailValidator,
  validate,
  authenticate,
  userController.changeEmail
);
router.post(
  '/change-password',
  changePasswordValidator,
  validate,
  authenticate,
  userController.changePassword
);

export default router;
