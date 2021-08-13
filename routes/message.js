const express = require('express');
const router = express.Router();

const { isAuth, isAdmin } = require('../config/authMiddleware');

const {
	message_get,
	message_post,
	delete_message,
} = require('../controllers/message');

router.get('/', isAuth, message_get);
router.post('/', isAuth, message_post);
router.get('/:id', isAdmin, delete_message);

module.exports = router;
