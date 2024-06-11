import express from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv'
const PORT = process.env.PORT || 3031

import userRoutes from './routes/userRoutes.js'; 
import connectDB from './config/connection.js';

dotenv.config()
connectDB()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', userRoutes)
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});