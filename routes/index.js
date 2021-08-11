const express = require('express');
const { home, about } = require('../controllers');

const router = express.Router();

router.get('/', home);
router.get('/about', about);

router;

module.exports = router;
