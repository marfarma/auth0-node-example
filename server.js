var express = require('express'), 
  passport = require('passport');


//setup passport
var strategy = require('./lib/setup-passport');

var app = express(),
  port = process.env.PORT || 9988;
  homeUrl = process.env.domain ? 'http://' + process.env.domain : 'http://localhost:' + port;

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
  strategy.getConnections(function (err, connections) {
    
    res.render("index", {
      user: req.user || null,
      connections: connections.map(function(c){
        return c.name;
      })
    });
    
  });
});

app.post('/connections', function (req, res, next) {
  var connection = {
    "name": req.body.name,
    "strategy": "google-oauth2",
    "options": {
      "client_id": req.body.client_id,
      "client_secret": req.body.client_secret,
      "email": true, 
      "profile": true
    },
    "status": 0
  };

  strategy.createConnection(connection, function (err) {
    if(err) return next(err);
    res.redirect('/');
  });
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