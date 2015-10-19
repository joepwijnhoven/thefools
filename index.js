var express = require('express');
var app = express();
var path    = require("path");
var http = require('http');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// views is directory for all template files
app.set('views', __dirname + '/views');

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
  console.log("? Express server listening at %s:%d ", app.get('ip'), app.get('port'));
  server();
});

