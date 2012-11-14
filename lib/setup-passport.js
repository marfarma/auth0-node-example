var passport = require('passport'),
  Auth0Strategy = require('passport-auth0');

var config = require('../package');

passport.use(new Auth0Strategy({
   clientID:         config.authKeys.clientId,
   clientSecret:     config.authKeys.clientSecret,
   callbackURL:      '/callback'
  },
  function(accessToken, refreshToken, profile, done) {

    console.log('profile is', profile);
    return done(null, profile);
  }
));

//not best practice, we are storing everything in the session
passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//////////////////////////////////////////////////////////////