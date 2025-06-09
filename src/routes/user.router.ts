import { Router } from 'express';
import {
  createUserValidator,
  userIdValidator,
  updateUserValidator,
} from '../validators/user.validator';
import { validate } from '../middleware/validate';
import { userController } from '../controllers';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userIdValidator, validate, userController.getUserById);
router.put(
  '/:id',
  userIdValidator,
  createUserValidator,
  validate,
  userController.updateUser
);
router.patch(
  '/:id',
  userIdValidator,
  updateUserValidator,
  validate,
  userController.updateUser
);
router.delete('/:id', userIdValidator, validate, userController.deleteUser);

export default router;
