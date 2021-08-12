const express = require('express');
const { home, about, signup_get } = require('../controllers');

const router = express.Router();

router.get('/', home);
router.get('/about', about);
router.get('/signup', signup_get);

router;

module.exports = router;
