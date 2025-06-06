import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Tour } from './models/tour.model.js';

// Load environment variables
dotenv.config();

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const DATABASE = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DATABASE)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!");
    })
    .catch((err) => {
        console.log("Connection to MongoDB has failed");
        console.error(err);
    });

// Read the JSON file
const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'), 'utf-8')
);

// Import data into database
const importData = async () => {
    try {
        // Before importing, we need to remove the 'id' field from each tour
        // as MongoDB will create its own '_id' field
        const toursWithoutId = tours.map(tour => {
            const { id, ...tourWithoutId } = tour;
            
            // Convert string dates to Date objects
            if (tourWithoutId.startDates) {
                tourWithoutId.startDates = tourWithoutId.startDates.map(
                    dateStr => new Date(dateStr.replace(',', ' '))
                );
            }
            
            return tourWithoutId;
        });
        
        await Tour.create(toursWithoutId);
        console.log('Data successfully imported!');
    } catch (err) {
        console.error('Error importing data:', err);
    }
    process.exit();
};

// Delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.error('Error deleting data:', err);
    }
    process.exit();
};

// Process command line arguments
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Please provide a valid command: --import or --delete');
    process.exit();
}