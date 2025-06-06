import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json');

// Read tours data from file
const tours = JSON.parse(fs.readFileSync(dataPath));

export const getAllTours = () => {
  return tours;
};

export const getTourById = (id) => {
  return tours.find(tour => tour.id === id);
};

export const createTour = (tourData) => {
  // Generate new ID (max existing ID + 1)
  const newId = tours.length > 0 ? Math.max(...tours.map(tour => tour.id)) + 1 : 0;

  // Create new tour object by combining the request body with the new ID
  const newTour = { id: newId, ...tourData };

  // Add new tour to tours array
  tours.push(newTour);

  // Write updated tours array back to file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath, 
      JSON.stringify(tours, null, 2), 
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(newTour);
        }
      }
    );
  });
};

export const updateTour = (id, tourData) => {
  const tourIndex = tours.findIndex(tour => tour.id === id);
  
  if (tourIndex === -1) {
    return null;
  }

  // Update tour with new data, preserving the ID
  const updatedTour = { ...tours[tourIndex], ...tourData, id };
  tours[tourIndex] = updatedTour;

  // Write updated tours array back to file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath, 
      JSON.stringify(tours, null, 2), 
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(updatedTour);
        }
      }
    );
  });
};

export const deleteTour = (id) => {
  const tourIndex = tours.findIndex(tour => tour.id === id);
  
  if (tourIndex === -1) {
    return null;
  }

  // Remove tour from array
  tours.splice(tourIndex, 1);

  // Write updated tours array back to file
  return new Promise((resolve, reject) => {
    fs.writeFile(
      dataPath, 
      JSON.stringify(tours, null, 2), 
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