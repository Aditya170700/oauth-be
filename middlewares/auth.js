const jwt = require('jsonwebtoken');

module.exports = {
  validateRegister: (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.password_confirmation) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    if (req.body.password !== req.body.password_confirmation) {
      return res.status(400).json({
        message: 'Passwords do not match'
      });
    }

    next();
  },
  validateLogin: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    next();
  },
  isLoggedIn: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid token'
        });
      }

      req.decoded = decoded;
      next();
    });
  }
}
