import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import asyncHandler from 'express-async-handler';

//Register new user
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// Check if user exists
	const userExists = await UserModel.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await UserModel.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// Login a user
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await UserModel.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

//Get user profile
export const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
export const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

// change user password
export const changeUserPassword = async (req, res) => {
	const { password, password_confirmation } = req.body;
	if (password && password_confirmation) {
		if (password !== password_confirmation) {
			res.send({ status: 'failed', message: "New Password and Confirm New Password doesn't match" });
		} else {
			const salt = await bcrypt.genSalt(10);
			const newHashPassword = await bcrypt.hash(password, salt);
			await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
			res.send({ status: 'success', message: 'Password changed succesfully' });
		}
	} else {
		res.send({ status: 'failed', message: 'All Fields are Required' });
	}
};

// sent email for reset password
export const sendUserPasswordResetEmail = async (req, res) => {
	const { email } = req.body;
	if (email) {
		const user = await UserModel.findOne({ email: email });
		if (user) {
			const secret = user._id + process.env.JWT_SECRET_KEY;
			const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
			const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
			console.log(link);
			// // Send Email
			// let info = await transporter.sendMail({
			//   from: process.env.EMAIL_FROM,
			//   to: user.email,
			//   subject: "GeekShop - Password Reset Link",
			//   html: `<a href=${link}>Click Here</a> to Reset Your Password`
			// })
			res.send({ status: 'success', message: 'Password Reset Email Sent... Please Check Your Email' });
		} else {
			res.send({ status: 'failed', message: "Email doesn't exists" });
		}
	} else {
		res.send({ status: 'failed', message: 'Email Field is Required' });
	}
};

// new password for user
export const userPasswordReset = async (req, res) => {
	const { password, password_confirmation } = req.body;
	const { id, token } = req.params;
	const user = await UserModel.findById(id);
	const new_secret = user._id + process.env.JWT_SECRET_KEY;
	try {
		jwt.verify(token, new_secret);
		if (password && password_confirmation) {
			if (password !== password_confirmation) {
				res.send({ status: 'failed', message: "New Password and Confirm New Password doesn't match" });
			} else {
				const salt = await bcrypt.genSalt(10);
				const newHashPassword = await bcrypt.hash(password, salt);
				await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
				res.send({ status: 'success', message: 'Password Reset Successfully' });
			}
		} else {
			res.send({ status: 'failed', message: 'All Fields are Required' });
		}
	} catch (error) {
		console.log(error);
		res.send({ status: 'failed', message: 'Invalid Token' });
	}
};
