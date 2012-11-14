var passport = require('passport'),
  Auth10Strategy = require('./passport-auth10');

var config = require('../package');

passport.use(new Auth10Strategy({

   clientID:         config.authKeys.clientId,
   clientSecret:     config.authKeys.clientSecret,
   callbackURL:      '/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));