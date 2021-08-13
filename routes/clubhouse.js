const { isAuth } = require('../config/authMiddleware');

const express = require('express');
const router = express.Router();

const { clubhouse_get, clubhouse_post } = require('../controllers/clubhouse');

router.get('/', isAuth, clubhouse_get);
router.post('/', clubhouse_post);

module.exports = router;
