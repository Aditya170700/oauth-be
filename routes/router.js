const express = require('express');
const router = express.Router();
const passport = require('passport')

const authMiddleware = require('../middlewares/auth.js');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');

router.post('/register', authMiddleware.validateRegister, (req, res) => {
  authController.register(req, res);
});
router.post('/login', authMiddleware.validateLogin, (req, res) => {
  authController.login(req, res);
});
router.get('/oauth/google', passport.authenticate('google', { scope: ['profile','email'] }))
router.get('/oauth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), function(req, res) {
  userController.firstOrCreate({
    email: req.user.emails[0].value,
    name: req.user.displayName,
  }, (token) => {
    if (!token) {
      res.redirect(`${process.env.FE_BASE_URL}error`);
    }

    res.redirect(`${process.env.FE_BASE_URL}google/callback?token=${token}`);
  });
});
router.get('/users', authMiddleware.isLoggedIn, (req, res) => {
  userController.getProfile(req, res);
});
router.get('/users/:email', (req, res) => {
  userController.getOne(req, res);
});

module.exports = router;
