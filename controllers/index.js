const { body, validationResult } = require('express-validator');
const debug = require('debug')('myapp');
const User = require('../models/User');
const Message = require('../models/Message');
const passport = require('passport');

const home = async (req, res) => {
	try {
		const messages = await Message.find({}).populate('author');
		res.render('home', { title: 'Home', messages });
	} catch (err) {
		next(err);
	}
};
const about = (req, res) => res.render('about', { title: 'About' });

const inputValidationSignUp = [
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
		.withMessage('Invalid email.')
		.custom(async (value, { req }) => {
			const user = await User.findOne({ email: value });
			if (user) {
				throw new Error(`A user with this email (${value}) already exists.`);
			} else return true;
		}),
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

const signup_get = (req, res) => {
	res.render('signup', { title: 'Sign Up', info: {} });
};

const singup_post = [
	...inputValidationSignUp,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('signup', {
				title: 'Sign Up',
				errors: errors.array(),
				info: req.body,
			});
		}
		const newUser = User(req.body);
		try {
			await newUser.save();
		} catch (err) {
			debug(err);
		}
		next();
	},
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/about',
	}),
];

const login_get = (req, res) => {
	res.render('login', {
		title: 'Log in',
		flash: req.flash(),
	});
};

const login_post = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true,
});

const logout_get =
	('/logout',
	(req, res) => {
		req.logout();
		res.redirect('/');
	});

module.exports = {
	home,
	about,
	signup_get,
	singup_post,
	logout_get,
	login_get,
	login_post,
};
