const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, isAdmin } = require('../middleware/verify'); // Pastikan path ini benar

router.post('/create', authenticateJWT, isAdmin, userController.createUser);

// router.get('/getall', userController.getUsers);

// Ekspor router
module.exports = router;