import * as tourService from '../services/tour.service.js';

// Middleware to check if required fields are in the request body
export const checkBody = (req, res, next) => {
  const requiredFields = ['name', 'duration', 'maxGroupSize', 'difficulty', 'price'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 'fail',
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  const tours = tourService.getAllTours();
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours }
  });
};

export const getTourById = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tourService.getTourById(id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: `Tour with ID ${id} not found`
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

export const createTour = (req, res) => {
  tourService.createTour(req.body)
    .then(newTour => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: 'Error writing to file'
      });
    });
};

export const updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  
  tourService.updateTour(id, req.body)
    .then(updatedTour => {
      if (!updatedTour) {
        return res.status(404).json({
          status: 'fail',
          message: `Tour with ID ${id} not found`
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: 'Error writing to file'
      });
    });
};

export const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  
  tourService.deleteTour(id)
    .then(success => {
      if (!success) {
        return res.status(404).json({
          status: 'fail',
          message: `Tour with ID ${id} not found`
        });
      }

      // Return 204 No Content
      res.status(204).json({
        status: 'success',
        data: null
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: 'Error writing to file'
      });
    });
};