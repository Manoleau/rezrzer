import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'dev-data', 'data', 'users.json');

const users = JSON.parse(fs.readFileSync(dataPath));

export const getAllUsers = () => {
  return users;
};

export const getUserById = (id) => {
  return users.find(user => user._id === id);
};

export const createUser = (userData) => {
  const newId = `user-${Date.now()}`;

  const newUser = { _id: newId, ...userData, active: true };

  users.push(newUser);

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

  const updatedUser = { ...users[userIndex], ...userData, _id: id };
  users[userIndex] = updatedUser;

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

  users.splice(userIndex, 1);

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