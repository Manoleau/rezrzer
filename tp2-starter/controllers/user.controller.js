import * as userService from '../services/user.service.js';

// Middleware to check if required fields are in the request body
export const checkBody = (req, res, next) => {
  const requiredFields = ['name', 'email', 'password', 'role'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 'fail',
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }
  next();
};

export const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users }
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: `User with ID ${id} not found`
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
};

export const createUser = (req, res) => {
  userService.createUser(req.body)
    .then(newUser => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser
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

export const updateUser = (req, res) => {
  const id = req.params.id;
  
  userService.updateUser(id, req.body)
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({
          status: 'fail',
          message: `User with ID ${id} not found`
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          user: updatedUser
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

export const deleteUser = (req, res) => {
  const id = req.params.id;
  
  userService.deleteUser(id)
    .then(success => {
      if (!success) {
        return res.status(404).json({
          status: 'fail',
          message: `User with ID ${id} not found`
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