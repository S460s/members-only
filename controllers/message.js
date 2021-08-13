const Message = require('../models/Message');
const { body, validationResult } = require('express-validator');

const message_get = (req, res) => {
	res.render('messageForm', { title: 'Add Message' });
};

const delete_message = async (req, res) => {
	await Message.findByIdAndDelete(req.params.id);
	res.redirect('/');
};

const inputValidationMessage = [
	body('title')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Title is required')
		.escape(),
	body('text')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Text is required.')
		.escape(),
];

const message_post = [
	...inputValidationMessage,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('signup', {
				title: 'Add Message',
				errors: errors.array(),
				info: req.body,
			});
		}
		const message = new Message({ ...req.body, author: req.user._id });
		await message.save();
		res.redirect('/');
	},
];

module.exports = {
	message_get,
	delete_message,
	message_post,
};
