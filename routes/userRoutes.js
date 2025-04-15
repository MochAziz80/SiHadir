const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser );
router.get('/getall', userController.getUsers);

module.exports = router;