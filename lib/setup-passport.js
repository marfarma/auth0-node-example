var passport = require('passport'),
  Auth0Strategy = require('passport-auth0');

['clientId', 'clientSecret', 'namespace']
  .filter(function (k) { return !(k in process.env); })
  .forEach(function (k){
    console.log('you need to set the "' + k + '" environment variable');
    process.exit(1);
  });

passport.use(new Auth0Strategy({
    namespace:        process.env.namespace,
    clientID:         process.env.clientId,
    clientSecret:     process.env.clientSecret,
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