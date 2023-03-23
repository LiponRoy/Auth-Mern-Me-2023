import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT;

// CORS Policy
app.use(cors());

// Database Connection
connectDB();

// JSON
app.use(express.json());

// Load Routes
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
