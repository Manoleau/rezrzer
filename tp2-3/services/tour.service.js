import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json');

const tours = JSON.parse(fs.readFileSync(dataPath));

export const getAllTours = () => {
  return tours;
};

export const getTourById = (id) => {
  return tours.find(tour => tour.id === id);
};

export const createTour = (tourData) => {
  const newId = tours.length > 0 ? Math.max(...tours.map(tour => tour.id)) + 1 : 0;

  const newTour = { id: newId, ...tourData };

  tours.push(newTour);

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

  const updatedTour = { ...tours[tourIndex], ...tourData, id };
  tours[tourIndex] = updatedTour;

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

  tours.splice(tourIndex, 1);

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