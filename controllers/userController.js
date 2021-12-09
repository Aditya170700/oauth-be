const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

module.exports = {
  getProfile: (req, res) => {
    User.findOneByEmail(req.decoded.email, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'Error in finding user',
          error: err
        });
      }
      if (user) {
        res.status(200).json({
          message: 'User profile',
          data: user
        });
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    });
  },
  getOne: (req, res) => {
    User.findOneByEmail(req.params.email, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'Error in finding user',
          error: err
        });
      }
      if (user) {
        res.status(200).json({
          message: 'User profile',
          data: user
        });
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    });
  },
  firstOrCreate: (req, callback) => {
    User.findOneByEmail(req.email, (err, user) => {
      if (err) {
        return callback(false);
      }
      let token = "";
      if (user) {
        token = jwt.sign({
          id: user.uuid,
          name: user.name,
          email: user.email
        }, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });
      } else {
        let hash = bcyrpt.hashSync(uuid.v4(), 10);
        let dataUser = {
          uuid: uuid.v4(),
          name: req.name,
          email: req.email,
          password: hash,
        };
        User.save(dataUser, (err, user) => {
          if (err) {
            return callback(false);
          }
          if (user) {
            token = jwt.sign({
              id: dataUser.uuid,
              name: dataUser.name,
              email: dataUser.email
            }, process.env.JWT_SECRET, {
              expiresIn: '1h'
            });
          }
        });
      }

      return callback(token);
    });
  },
};