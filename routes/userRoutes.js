const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, isAdmin } = require('../middleware/verify');

router.post('/create', authenticateJWT, isAdmin, userController.createUser);
router.delete('/delete/:id', authenticateJWT, isAdmin, userController.deleteUser );
router.get('/getall', authenticateJWT, isAdmin, userController.getallUser);


router
module.exports = router;