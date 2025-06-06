import express from 'express';
import * as tourController from '../controllers/tour.controller.js';

const router = express.Router();

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