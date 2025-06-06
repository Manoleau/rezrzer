import express from 'express';
import * as tourController from '../controllers/tour.controller.js';
import { verifyToken, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/tour-stats')
  .get(tourController.getToursStats);

router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(verifyToken, tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .put(verifyToken, tourController.updateTour)
  .delete(verifyToken, restrictTo('admin'), tourController.deleteTour);

export default router;
