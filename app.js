var express = require('express');
var http = require('http');

var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');

//var passport = require('passport');
//var module = require('module');
var favicon = require('static-favicon');
var logger = require('morgan');
var session= require('express-session');
var expressValidator=require('express-validator');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose= require('mongoose');
var url=require('url');
var async = require('async');
var crypto=require('crypto');
var session = require('express-session');
var createError = require('createerror');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var index = require('./routes/index');
//var users = require('./routes/users');
 var about = require('./routes/about');
var hot = require('./routes/hot');
var special = require('./routes/special');
var blog = require('./routes/blog');
var contact = require('./routes/contact');
var signup = require('./routes/signup');
var login = require('./routes/login');
// aro vairalble banate parbo ekhane


var app = express();

console.log("Successufully started!")


//database connection
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true
});
var db = mongoose.connection;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
// ekhane aro app.set banate parbo

app.set('view engine', 'ejs');

app.use(flash());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', express.static(path.join(__dirname, 'public')));
app.use('/users/dashboard', express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);





//app.use('/', routes);
//app.use('/users', users);
app.use('/index', index);
app.use('/about', about);
app.use('/hot', hot);
app.use('/special', special);
app.use('/blog', blog);
app.use('/contact', contact);
app.use('/signup', signup);
app.use('/login', login);

// ekhane aro app.use banate parbo



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//router.get('/data', function(req, res, next){
//	res.render('author');
//});



module.exports = app;
