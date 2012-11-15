var express = require('express'), 
  passport = require('passport');


//setup passport
require('./lib/setup-passport');

if(!process.env.connections){
  console.log('you need to set the "connections" environment variable, comma separated');
  process.exit(1);
}

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
  console.log('GET INDEX.. user is', req.user);
  res.render("index", {
    user: req.user || null,
    connections: process.env.connections.split(',')
  });
});

app.get('/callback', 
  passport.authenticate('auth10', { failureRedirect: '/login' }), 
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

app.get('/logout', function(req, res){
  req.logout(res, homeUrl);
});

// a simple example will be
// app.get('/login', passport.authenticate('auth10', {connection: 'google'}), function (req, res) {

app.get('/login', function (req, res, next) {
  if(!req.query.using){
    return res.send(500, "missing using query string");
  }
  return passport.authenticate('auth10', {connection: req.query.using})(req, res, next);
}, function (req, res) {
  res.redirect("/");
});

app.listen(port);