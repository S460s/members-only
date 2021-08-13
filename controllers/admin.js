const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const admin_get = (req, res) => {
	res.render('adminForm', { title: 'Admin Verification' });
};

const admin_post = [
	body('adminPswd')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Password is required')
		.escape()
		.custom((value) => {
			if (value !== process.env.ADMIN_PASSWORD) {
				throw new Error('Password does not match clubhouse password.');
			} else return true;
		}),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('adminForm', {
				title: 'Admin Verification',
				errors: errors.array(),
			});
		}

		await User.findByIdAndUpdate(req.user._id, { status: 'admin' });
		res.redirect('/');
	},
];

module.exports = { admin_post, admin_get };
