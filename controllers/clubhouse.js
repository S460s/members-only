const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const clubhouse_get = (req, res) => {
	res.render('clubhouse', { title: 'Clubhouse Verification' });
};

const clubhouse_post = [
	body('clubhousePswd')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Password is required')
		.escape()
		.custom((value) => {
			if (value !== process.env.CLUBHOUSE_PASSWORD) {
				throw new Error('Password does not match clubhouse password.');
			} else return true;
		}),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('clubhouse', {
				title: 'Clubhouse Verification',
				errors: errors.array(),
			});
		}

		await User.findByIdAndUpdate(req.user._id, { status: 'member' });
		res.redirect('/');
	},
];

module.exports = {
	clubhouse_get,
	clubhouse_post,
};
