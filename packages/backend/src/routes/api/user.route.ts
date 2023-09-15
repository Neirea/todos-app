import { Router } from 'express';
import validator from '../../validators/generic.validator';
import userController from '../../controllers/user.controller';
import { tryCatch } from '../../middleware/try-catch.middleware';
import { userSchema } from '../../validators/schemas.validator';
import { requireAuth } from '../../middleware/auth.middleware';

const router: Router = Router();

router.get(
  '/me',
  requireAuth({ allowFailed: true }),
  tryCatch(userController.getMe.bind(userController))
);
router.post(
  '/register',
  validator.validateRequestData(userSchema.sign),
  tryCatch(userController.register.bind(userController))
);
router.post(
  '/verify',
  validator.validateRequestData(userSchema.verify),
  tryCatch(userController.verifyEmail.bind(userController))
);
router.post(
  '/login',
  validator.validateRequestData(userSchema.sign),
  tryCatch(userController.login.bind(userController))
);
router.post(
  '/change-password',
  requireAuth(),
  validator.validateRequestData(userSchema.changePassword),
  tryCatch(userController.changePassword.bind(userController))
);
router.post(
  '/forgot-password',
  validator.validateRequestData(userSchema.forgotPassword),
  tryCatch(userController.forgotPassword.bind(userController))
);
router.post(
  '/reset-password',
  validator.validateRequestData(userSchema.resetPassword),
  tryCatch(userController.resetPassword.bind(userController))
);

export default router;
