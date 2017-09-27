var express = require('express');
var app = express();
var path    = require("path");
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');

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
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');

app.post('/Login', function(req, res, next) {
  if(req.headers.authorization && req.headers.authorization == 'AFG345W2QxgO0') {
    mysqlClient.query("SELECT * FROM adminfool", function (err, rows, fields) {
      if (err) {
        return next(err);
      } else {
        var adminfool = rows[0];
        if(req.body.username == adminfool.username && req.body.password == adminfool.password) {
          res.send("OK");
        } else {
          return next(new Error('failed to find user'));
        }
      }
    });
  } else {
    res.redirect('/');
  }
});

app.get('/TourData', function(req, res) {
  if(req.headers.authorization && req.headers.authorization == 'AFG345W2QxgO0') {
    var query = "SELECT id, date, TIME_FORMAT(begintime, '%H:%i') as begintime, TIME_FORMAT(endtime, '%H:%i') as endtime, " +
                "place, cafe, typeOfParty " +
                "FROM tour " +
                "ORDER BY date desc"
    mysqlClient.query(query, function (err, rows, fields) {
      if (err) {
        res.send('NOT OK' + JSON.stringify(err));
      } else {
        res.send(rows);
      }
    });
  } else {
    res.redirect('/');
  }
});

app.get('/SingleTourData', function(req, res) {
  if(req.headers.authorization && req.headers.authorization == 'AFG345W2QxgO0') {
    var query = "SELECT id, date, TIME_FORMAT(begintime, '%H:%i') as begintime, TIME_FORMAT(endtime, '%H:%i') as endtime, " +
                "place, cafe, typeOfParty " +
                "FROM tour where id =" + mysql.escape(req.headers.id)
    mysqlClient.query(query, function (err, rows, fields) {
      if (err) {
        res.send('NOT OK' + JSON.stringify(err));
      } else {
        res.send(rows[0]);
      }
    });
  } else {
    res.redirect('/');
  }
});

app.post('/TourData/Update', function(req, res) {
  if(req.headers.authorization && req.headers.authorization == 'AFG345W2QxgO0') {
    var query = 'UPDATE tour SET date=' + mysql.escape(req.body.date) + ', place=' + mysql.escape(req.body.place) +
        ', cafe=' + mysql.escape(req.body.cafe) + ', begintime=' + mysql.escape(req.body.begintime) +
        ', endtime=' + mysql.escape(req.body.endtime) + ', typeOfParty=' + mysql.escape(req.body.typeOfParty) +
        ' where id=' + mysql.escape(req.body.id);
    mysqlClient.query(query, function (err) {
      if (err) {
        throw new Error();
      }
      res.end("Succeed");
    });
  } else {
    res.redirect('/');
  }
});

app.post('/TourData/Create', function(req, res, next) {
  if(req.headers.authorization && req.headers.authorization == 'AFG345W2QxgO0') {
    var query = 'INSERT INTO tour (date, place, cafe, begintime, endtime, typeOfParty) VALUES (' +
        mysql.escape(req.body.date) + ', ' +
        mysql.escape(req.body.place) + ', ' +
        mysql.escape(req.body.cafe) + ', ' +
        mysql.escape(req.body.begintime) + ', ' +
        mysql.escape(req.body.endtime) + ', ' +
        mysql.escape(req.body.typeOfParty) + ');';
    mysqlClient.query(query, function (err) {
      if (err) {
        return next(err);
      }
      res.end("Succeed");
    });
  } else {
    res.redirect('/');
  }
});

app.post('/TourData/Delete', function(req, res) {
  if(req.headers.authorization && req.headers.authorization == 'AFG345W2QxgO0') {
    var query = 'DELETE FROM tour WHERE id=' + mysql.escape(req.body.id);
    mysqlClient.query(query, function (err) {
      if (err) {
        throw new Error();
      }
      res.end("Succeed");
    });
  } else {
    res.redirect('/');
  }
});

app.get('/robots.txt', function(req, res) {
  res.sendFile(path.join(__dirname+'/robots.txt'))
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'))
});

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
  console.log("Express server listening at %s:%d ", app.get('ip'), app.get('port'));
});

