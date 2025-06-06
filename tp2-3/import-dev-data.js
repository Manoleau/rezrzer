import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Tour } from './models/tour.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DATABASE)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!");
    })
    .catch((err) => {
        console.log("Connection to MongoDB has failed");
        console.error(err);
    });

const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'), 'utf-8')
);

const importData = async () => {
    try {
        const toursWithoutId = tours.map(tour => {
            const { id, ...tourWithoutId } = tour;
            
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

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.error('Error deleting data:', err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Please provide a valid command: --import or --delete');
    process.exit();
}