
var path = require('path');
var logger = require('morgan');
var express = require('express');
var favicon = require('serve-favicon');

var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'src')));
app.use(favicon(__dirname + '/src/images/favicon.ico'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
// });

app.post('/login', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'login.json'));
});

app.post('/logout', function (request, response) {
  console.log(request);
  response.json({})
});

app.get('/dashboard/*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'dashboard.json'));
});

app.get('/boss_user/list', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'userlist.json'));
});

app.get('/classroom/list', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'classroomlist.json'));
});

app.post('/update_role', function (request, response) {
  response.json({});
});

app.post('/upload', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'upload.json'));
});

app.get('/lecturer_Avatar', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'upload.json'));
});

app.get('/lecturer_Info', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'lecturerinfo.json'));
});

app.put('/update_lecturer_info', function (request, response) {
  response.json({});
});

app.post('/add_free_time', function (request, response) {
  response.json({});
});

app.post('/delete_free_time', function (request, response) {
  response.json({});
});

app.put('/admin', function (request, response) {
  response.json({});
});

app.post('/admin', function (request, response) {
  response.json({});
});

app.post('/delete_admin', function (request, response) {
  response.json({});
});

app.get('/menudata', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'menudata.json'));
});

app.put('/menudata', function (request, response) {
  response.json({});
});

app.post('/coupon', function (request, response) {
  response.json({});
});

app.get('/message_list', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'response', 'messagelist.json'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


module.exports = app;
