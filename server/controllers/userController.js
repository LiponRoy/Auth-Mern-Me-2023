import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import asyncHandler from 'express-async-handler';
import sendEmail from '../other/sendEmail.js';

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
export const changeUserPassword = asyncHandler(async (req, res) => {
	const { password, password_confirmation } = req.body;

	if (!password || !password_confirmation) {
		res.status(400);
		throw new Error('All Fields are Required');
	}
	if (password !== password_confirmation) {
		res.status(400);
		throw new Error('New Password and Confirm New Password does not match');
	} else {
		const salt = await bcrypt.genSalt(10);
		const newHashPassword = await bcrypt.hash(password, salt);
		await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
		// res.send({ status: 'success', message: 'Password changed succesfully' });
		res.status(201).json({
			message: 'Password changed successfully',
		});
	}
});

// @desc    Forgot Password Initialization /sent Email
export const sentEmail_forgotPassword = async (req, res, next) => {
	// Send Email to email provided but first check if user exists
	const { email } = req.body;

	try {
		const user = await UserModel.findOne({ email });

		if (!user) {
			return next(new ErrorResponse('No email could not be sent', 404));
		}

		// Reset Token Gen and add to database hashed (private) version of token
		const resetToken = user.getResetPasswordToken();

		await user.save();

		// Create reset url to email to provided email
		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		// HTML Message
		const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

		try {
			await sendEmail({
				to: user.email,
				subject: 'Password Reset Request',
				text: message,
			});

			res.status(200).json({ success: true, data: 'Email Sent' });
		} catch (err) {
			console.log(err);

			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			return next(new ErrorResponse('Email could not be sent', 500));
		}
	} catch (err) {
		next(err);
	}
};

// @desc    Reset User Password
export const resetNew_Password = async (req, res, next) => {
	// Compare token in URL params to hashed token
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return next(new ErrorResponse('Invalid Token', 400));
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: 'Password Updated Success',
			token: user.getSignedJwtToken(),
		});
	} catch (err) {
		next(err);
	}
};

// other task update delete user

// update loged in user data
export const updateMe = asyncHandler(async (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) {
		res.status(400);
		throw new Error('Please add all fields');
	}
	// getting user form jwt token
	const me = req.user;

	if (!me) {
		res.status(400);
		throw new Error('User not found');
	}

	const updatedUser = await UserModel.findByIdAndUpdate(
		{ _id: me._id },
		{ name, email },
		{
			new: true,
		},
	);

	res.status(200).json(updatedUser);
});

// Delete user data

export const deleteMe = asyncHandler(async (req, res) => {
	// getting user form jwt token
	const me = await req.user;

	if (!me) {
		res.status(400);
		throw new Error('User not found');
	}

	await UserModel.findByIdAndDelete({ _id: me._id });

	res.status(200).json({ id: me._id, message: 'Delete successfully' });
});
