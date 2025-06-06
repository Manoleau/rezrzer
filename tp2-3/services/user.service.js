import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'dev-data', 'data', 'users.json');

// Read users data from file
const users = JSON.parse(fs.readFileSync(dataPath));

export const getAllUsers = () => {
  return users;
};

export const getUserById = (id) => {
  return users.find(user => user._id === id);
};

export const createUser = (userData) => {
  // Generate new ID (simple implementation for demo purposes)
  // In a real app, you'd use a proper ID generation library like uuid
  const newId = `user-${Date.now()}`;

  // Create new user object by combining the request body with the new ID
  const newUser = { _id: newId, ...userData, active: true };

  // Add new user to users array
  users.push(newUser);

  // Write updated users array back to file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath, 
      JSON.stringify(users, null, 2), 
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(newUser);
        }
      }
    );
  });
};

export const updateUser = (id, userData) => {
  const userIndex = users.findIndex(user => user._id === id);
  
  if (userIndex === -1) {
    return null;
  }

  // Update user with new data, preserving the ID
  const updatedUser = { ...users[userIndex], ...userData, _id: id };
  users[userIndex] = updatedUser;

  // Write updated users array back to file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath, 
      JSON.stringify(users, null, 2), 
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(updatedUser);
        }
      }
    );
  });
};

export const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user._id === id);
  
  if (userIndex === -1) {
    return null;
  }

  // In a real application, you might want to soft delete by setting active: false
  // instead of removing the user completely
  // users[userIndex].active = false;
  
  // For this example, we'll remove the user from the array
  users.splice(userIndex, 1);

  // Write updated users array back to file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath, 
      JSON.stringify(users, null, 2), 
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};