var passport = require('passport'),
  Auth0Strategy = require('passport-auth0');

['AUTH0_DOMAIN', 'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET']
  .filter(function (k) { return !(k in process.env); })
  .forEach(function (k){
    console.log('you need to set the "' + k + '" environment variable');
    process.exit(1);
  });

var strategy = new Auth0Strategy({
    domain:        process.env.AUTH0_DOMAIN,
    clientID:      process.env.AUTH0_CLIENT_ID,
    clientSecret:  process.env.AUTH0_CLIENT_SECRET,
    callbackURL:   process.env.CALLBACK_URL || 'http://localhost:9988/callback'
  },
  function(accessToken, refreshToken, profile, done) {

    console.log('profile is', profile);
    return done(null, profile);
  }
);

passport.use(strategy);

//not best practice, we are storing everything in the session
passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//////////////////////////////////////////////////////////////