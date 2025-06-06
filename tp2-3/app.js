import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import tourRouter from './routes/tour.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();

const DATABASE = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose.connect(DATABASE)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!")
    })
    .catch(() => {
        console.log("Connection to MongoDB has failed")
    });

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello from the server");
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
