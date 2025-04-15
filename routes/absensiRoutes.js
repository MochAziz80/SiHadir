const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/absensiController');

router.post('/', absensiController.createAbsensi);
router.get('/', absensiController.getAbsensi);

module.exports = router;