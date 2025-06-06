import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';
import { verifyToken, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(verifyToken);

router
  .route('/')
  .get(restrictTo('admin'), userController.getAllUsers)
  .post(restrictTo('admin'), userController.checkBody, userController.createUser);

router
  .route('/:id')
  .get(restrictTo('admin'), userController.getUserById)
  .put(restrictTo('admin'), userController.updateUser)
  .delete(restrictTo('admin'), userController.deleteUser);

export default router;
