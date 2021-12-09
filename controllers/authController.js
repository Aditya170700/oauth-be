const User = require('../models/userModel.js');
const bcyrpt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = {
  register: (req, res) => {
    User.findOneByEmail(req.body.email, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'Error in finding user',
          error: err
        });
      }
      if (user) {
        res.status(400).json({
          message: 'User already exists',
          error: err
        });
      }
      if (!user && !err) {
        let hash = bcyrpt.hashSync(req.body.password, 10);
        User.save({
          uuid: uuid.v4(),
          name: req.body.name,
          email: req.body.email,
          password: hash,
        }, function (user) {
          res.status(200).json({
            message: 'User created successfully'
          });
        });
      }
    });
  },
  login: (req, res) => {
    User.findOneByEmail(req.body.email, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'Error in finding user',
          error: err
        });
      }
      if (!user) {
        res.status(400).json({
          message: 'User does not exist',
          error: err
        });
      }
      if (user) {
        if (bcyrpt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign({
            id: user.uuid,
            name: user.name,
            email: user.email
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(200).json({
            message: 'Login successful',
            data: token
          });
        } else {
          res.status(400).json({
            message: 'Password is incorrect',
            error: err
          });
        }
      }
    });
  }
};