var passport = require('passport'),
  Auth0Strategy = require('passport-auth0');

if(!process.env.clientId || !process.env.clientSecret){
  console.log('you need to set the "connections" environment variable');
  process.exit(1);
}

passport.use(new Auth0Strategy({
    authorizationURL: 'https://jose.auth0.com/authorize',
    tokenURL:         'https://jose.auth0.com/oauth/token',
    userInfoURL:      'https://jose.auth0.com/userinfo',
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