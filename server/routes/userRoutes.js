import express from 'express';
const userRouter = express.Router();
import { registerUser, loginUser, getMe, changeUserPassword, sentEmail_forgotPassword, resetNew_Password, updateMe, deleteMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/send-reset-password-email', sentEmail_forgotPassword);
userRouter.post('/passwordreset/:resetToken', resetNew_Password);

// Protected Routes
userRouter.put('/changepassword', protect, changeUserPassword);
userRouter.get('/profile', protect, getMe);
userRouter.put('/update', protect, updateMe);
userRouter.delete('/delete', protect, deleteMe);

export default userRouter;
