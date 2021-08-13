const express = require('express');
const router = express.Router();

const { isAuth } = require('../config/authMiddleware');
const { admin_get, admin_post } = require('../controllers/admin');

router.get('/', isAuth, admin_get);
router.post('/', admin_post);

module.exports = router;
