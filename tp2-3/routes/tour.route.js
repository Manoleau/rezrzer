import express from 'express';
import * as tourController from '../controllers/tour.controller.js';

const router = express.Router();

// Route for top 5 cheap tours
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// Route for tour statistics
router
  .route('/tour-stats')
  .get(tourController.getToursStats);

// Route for monthly plan
router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
