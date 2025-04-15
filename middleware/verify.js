const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization

    if (token) {
        jwt.verify(token, '00', (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token tidak valid
            }
            req.user = user; // Simpan informasi pengguna di req.user
            next(); // Lanjutkan ke route berikutnya
        });
    } else {
        res.sendStatus(401); // Tidak ada token
    }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
      next(); // Jika pengguna adalah admin, lanjutkan ke route berikutnya
  } else {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};


const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};



module.exports = { authenticateJWT, isAdmin, errorHandler, checkValidationResult}