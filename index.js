var express = require('express');
var app = express();
var path    = require("path");
var http = require('http');
var mysql = require('mysql');

var mysqlHost = process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost';
var mysqlPort = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306;
var mysqlUser = 'root';
var mysqlPass = 'Project1234';

if(process.env.OPENSHIFT_MYSQL_DB_PORT) {
  mysqlUser = 'adminBJQ972c';
  mysqlPass = 'h_JyfUysVDh5';
}

var mysqlDb   = 'thefools';
var mysqlString = 'mysql://'   + mysqlUser + ':' + mysqlPass + '@' + mysqlHost + ':' + mysqlPort + '/' + mysqlDb;

var mysqlClient = mysql.createConnection(mysqlString);
mysqlClient.connect(function(err){
  if (err) console.log(err);
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('/TourData', function(req, res) {
  mysqlClient.query('SELECT * from tour', function(err, rows, fields) {
    if (err) {
      res.send('NOT OK' + JSON.stringify(err));
    } else {
      res.send(rows);
    }
  });
});

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'))
});

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
  console.log("Express server listening at %s:%d ", app.get('ip'), app.get('port'));
});

