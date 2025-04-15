const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

router.post('/login', authControl.login)

module.exports = router;