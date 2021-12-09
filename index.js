const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router.js');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, callback) {
    return callback(null, profile)
  }
));

app.use('/api/v1/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
