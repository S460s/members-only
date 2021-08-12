const express = require('express');
const { isAuth, isAdmin } = require('../config/authMiddleware');
const {
	home,
	about,
	signup_get,
	singup_post,
	logout_get,
	login_get,
	login_post,
	message_get,
	message_post,
	clubhouse_get,
	clubhouse_post,
	admin_get,
	admin_post,
	delete_message,
} = require('../controllers');

const router = express.Router();

router.get('/', home);
router.get('/about', about);

router.get('/signup', signup_get);
router.post('/signup', singup_post);

router.get('/login', login_get);
router.post('/login', login_post);

router.get('/message', isAuth, message_get);
router.post('/message', isAuth, message_post);

router.get('/clubhouse', isAuth, clubhouse_get);
router.post('/clubhouse', clubhouse_post);

router.get('/admin', isAuth, admin_get);
router.post('/admin', admin_post);

router.get('/message/:id', isAdmin, delete_message);
router.get('/logout', logout_get);

module.exports = router;
