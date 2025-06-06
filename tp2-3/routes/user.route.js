import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.checkBody, userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;