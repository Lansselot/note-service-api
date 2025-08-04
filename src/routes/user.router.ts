import { Router } from 'express';
import {
  putUserValidator,
  patchUserValidator,
  changeEmailValidator,
  changePasswordValidator,
} from '../validators/user.validator';
import { validate } from '../middleware/validate.middleware';
import { userController } from '../controllers';
import { jwtAuthenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', jwtAuthenticate, userController.getUserById);
router.put(
  '/',
  putUserValidator,
  validate,
  jwtAuthenticate,
  userController.updateUser
);
router.patch(
  '/',
  patchUserValidator,
  validate,
  jwtAuthenticate,
  userController.updateUser
);
router.delete('/', jwtAuthenticate, userController.deleteUser);
router.post(
  '/change-email',
  changeEmailValidator,
  validate,
  jwtAuthenticate,
  userController.changeEmail
);
router.post(
  '/change-password',
  changePasswordValidator,
  validate,
  jwtAuthenticate,
  userController.changePassword
);

export default router;
