import express from 'express';
import tourRouter from './routes/tour.route.js';
import userRouter from './routes/user.route.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello from the server");
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
