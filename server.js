var express = require('express'), 
  passport = require('passport');

//setup passport
require('./lib/setup-passport');

var app = express();

app.configure(function () {
  this.set('view engine', 'jade');
  this.use(express.logger());
  this.use(express.cookieParser());
  this.use(express.bodyParser());
  this.use(passport.initialize());
  this.use(passport.session());
  this.use(express.session({ secret: 'string' }));
  this.use(express.static(__dirname + '/public'));
  this.use(app.router);
  this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function (req, res) {
  res.render("index", {
    user: req.user || null
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

app.get('/login', passport.authenticate('auth10'), function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 9988);