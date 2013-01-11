var express = require('express'), 
  passport = require('passport');


//setup passport
require('./lib/setup-passport');

var app = express(),
  port = process.env.PORT || 9988;


var Auth0     = require('auth0'),
  auth0Client = new Auth0({
    domain:           process.env.AUTH0_DOMAIN,
    clientID:         process.env.AUTH0_CLIENT_ID,
    clientSecret:     process.env.AUTH0_CLIENT_SECRET
  });

app.configure(function () {
  this.set('view engine', 'jade');
  this.use(express.logger());
  this.use(express.cookieParser());
  this.use(express.bodyParser());
  this.use(express.session({ secret: 'string' }));
  
  this.use(passport.initialize());
  this.use(passport.session());
  
  this.use(express.static(__dirname + '/public'));
  this.use(app.router);
  this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function (req, res) {
  if (!req.user){
    // This example uses the login widgets to render a list of connections
    // but you can use this method to render a list of connections in the ui:
    // auth0Client.getConnections(function (err, connections) {
    //  connections: connections.map(function(c){
    //   return c.name;
    //  })

    res.render("index", {
      domain:       process.env.AUTH0_DOMAIN,
      clientId:     process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackUrl:  process.env.CALLBACK_URL || 'http://localhost:9988/callback'
    });

  } else {
    auth0Client.getUsers({connection: req.user.identities[0].connection}, function (err, users) {
      if (err) return res.send(500, err);
      res.render("index-logged", {
        user: req.user,
        others: users
      });
    });
  }
});

app.get('/callback', 
  passport.authenticate('auth0', { failureRedirect: '/failure' }), 
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

app.get('/failure', function (req, res) {
  res.send('user didn\'t grant permissions');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Examples of routes that you can put in your application
// if you dont want to use the login widgets we provide.
// 
// 
// a simple example will be
// app.get('/login', passport.authenticate('auth0', {connection: 'google'}), function (req, res) {
// 
// you can pass to this url the name of the connection:
// app.get('/login', function (req, res, next) {
//   if(!req.query.using){
//     return res.send(500, "missing using query string");
//   }
//   return passport.authenticate('auth0', { connection: req.query.using })(req, res, next);
// }, function (req, res) {
//   res.redirect("/");
// });

app.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});