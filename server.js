var express = require('express'), 
  passport = require('passport');


//setup passport
require('./lib/setup-passport');

var app = express(),
  port = process.env.PORT || 9988;
  homeUrl = process.env.domain ? 'http://' + process.env.domain : 'http://localhost:' + port;


var Auth0     = require('auth0'),
  auth0Client = new Auth0({
    namespace:        process.env.namespace,
    clientID:         process.env.clientId,
    clientSecret:     process.env.clientSecret
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
    auth0Client.getConnections(function (err, connections) {
      res.render("index", {
        user: null,
        clientID: process.env.clientId,
        namespace: process.env.namespace,
        connections: connections.map(function(c){
          return c.name;
        })
      });
    });
  } else {
    auth0Client.getUsers(function (err, result) {
      if (err) return res.send(500, err);
      res.render("index-logged", {
        user: req.user,
        others: result.users
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

// a simple example will be
// app.get('/login', passport.authenticate('auth0', {connection: 'google'}), function (req, res) {

app.get('/login', function (req, res, next) {
  if(!req.query.using){
    return res.send(500, "missing using query string");
  }
  return passport.authenticate('auth0', { connection: req.query.using })(req, res, next);
}, function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});