const { body, validationResult } = require('express-validator');

const home = (req, res) => res.render('home', { title: 'Home' });
const about = (req, res) => res.render('about', { title: 'About' });

const inputValidation = [
	body('firstname', 'First name is requied')
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body('lastname', 'Last name is requied').trim().isLength({ min: 1 }).escape(),
	body('email')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Email is required')
		.escape()
		.isEmail()
		.withMessage('Invalid email.'),
	body('password')
		.trim()
		.isLength({ min: 6 })
		.withMessage('Your password must be at least 6 characters long.')
		.escape(),
	body('cnfrmpassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password.');
		} else return true;
	}),
];

const signup_get = (req, res) => res.render('signup', { title: 'Sign Up' });
const singup_post = [
	...inputValidation,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render('signup', { title: 'Sign Up', errors: errors.array() });
		}
	},
];

module.exports = { home, about, signup_get, singup_post };
