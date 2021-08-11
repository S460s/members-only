const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: [true, 'Please enter your first name.'],
	},
	lastname: { type: String, required: [true, 'Please enter your last name.'] },
	email: {
		type: String,
		required: [true, 'Please enter an email.'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email.'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password.'],
		minlength: [6, 'Minimum password length is 6 characters.'],
	},
	status: {
		type: String,
		enum: ['admin', 'unknown', 'user'],
	},
});

UserSchema.virtual('fullname').get(function () {
	return `${this.firstname} ${this.lastname}`;
});

const User = model('user', UserSchema);
module.exports = User;
