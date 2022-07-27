import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { body, validationResult } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

const userRouter = new Router();

userRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  userController.registration
);
userRouter.post('/login', userController.login);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/activate/:link', userController.activate);
userRouter.post('/password', body('email').isEmail(), userController.password);
userRouter.post('/password/recover/', userController.recoverPassword);
userRouter.post('/logout', userController.logout);

userRouter.get('/users', authMiddleware, userController.getUsers);

export default userRouter;
