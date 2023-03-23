import express from 'express';
const userRouter = express.Router();
import { registerUser, loginUser, getMe, changeUserPassword, sendUserPasswordResetEmail, userPasswordReset } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/send-reset-password-email', sendUserPasswordResetEmail);
userRouter.post('/reset-password/:id/:token', userPasswordReset);

// Protected Routes
userRouter.post('/changepassword', protect, changeUserPassword);
userRouter.get('/profile', protect, getMe);

export default userRouter;
