const express = require('express');
const {
	home,
	about,
	signup_get,
	singup_post,
	logout_get,
	login_get,
	login_post,
} = require('../controllers');

const router = express.Router();

router.get('/', home);
router.get('/about', about);

router.get('/signup', signup_get);
router.post('/signup', singup_post);

router.get('/login', login_get);
router.post('/login', login_post);

router.get('/logout', logout_get);

module.exports = router;
