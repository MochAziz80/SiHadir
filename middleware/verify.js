const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
        jwt.verify(token, '00', (err, user) => {
            if (err) {
                return res.sendStatus(403); 
            }
            req.user = user;
            next(); 
        });
    } else {
        res.sendStatus(401);
    }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
      next();
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