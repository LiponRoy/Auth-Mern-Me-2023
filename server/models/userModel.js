import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},

		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	},
);

// for reset password
userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token (private key) and save to database
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// Set token expire date
	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

	return resetToken;
};

export default mongoose.model('auth_User', userSchema);
