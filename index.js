var express = require('express');
var app = express();
var path    = require("path");
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var mysqlHost = process.env['MYSQL_SERVICE_HOST'] || 'localhost';
var mysqlPort = process.env['MYSQL_SERVICE_PORT'] || 3306;
var mysqlUser = 'root';
var mysqlPass = 'Project1234';

if(process.env['MYSQL_SERVICE_PORT']) {
  mysqlUser = 'adminBJQ972c';
  mysqlPass = 'h_JyfUysVDh5';
}

var tourdatajson = [
    {
        "id": 22,
        "date": "2017-10-14T04:00:00.000Z",
        "begintime": null,
        "endtime": null,
        "place": "Bedrijfsfeest",
        "cafe": "Overloon",
        "typeOfParty": "besloten"
    },
    {
        "id": 21,
        "date": "2017-09-23T04:00:00.000Z",
        "begintime": null,
        "endtime": null,
        "place": "Sinaai (BE)",
        "cafe": "Jeugdhuis Troelant",
        "typeOfParty": "open"
    },
    {
        "id": 23,
        "date": "2017-08-20T04:00:00.000Z",
        "begintime": "15:00",
        "endtime": "19:00",
        "place": "Overloon",
        "cafe": "Partycentrum Bos",
        "typeOfParty": "open"
    },
    {
        "id": 15,
        "date": "2017-08-11T04:00:00.000Z",
        "begintime": "21:30",
        "endtime": "01:00",
        "place": "Vierlingsbeek",
        "cafe": "Kermistent Concordia",
        "typeOfParty": "open"
    },
    {
        "id": 20,
        "date": "2017-06-13T04:00:00.000Z",
        "begintime": "19:00",
        "endtime": "22:30",
        "place": "Oploo",
        "cafe": "Kermistent",
        "typeOfParty": "open"
    },
    {
        "id": 14,
        "date": "2017-04-08T04:00:00.000Z",
        "begintime": "20:30",
        "endtime": "23:00",
        "place": "Vierlingsbeek",
        "cafe": "Zalencentrum Concordia",
        "typeOfParty": "open"
    },
    {
        "id": 13,
        "date": "2016-10-08T04:00:00.000Z",
        "begintime": "23:30",
        "endtime": "00:30",
        "place": "Overloon",
        "cafe": "Leuke Broeders",
        "typeOfParty": "open"
    },
    {
        "id": 11,
        "date": "2016-09-24T04:00:00.000Z",
        "begintime": "00:00",
        "endtime": "01:30",
        "place": "Sinaai",
        "cafe": "Troelantfeesten",
        "typeOfParty": "open"
    },
    {
        "id": 10,
        "date": "2016-08-19T04:00:00.000Z",
        "begintime": "20:30",
        "endtime": "22:30",
        "place": "Castenray",
        "cafe": "Examenfeest Casele",
        "typeOfParty": "open"
    },
    {
        "id": 12,
        "date": "2016-07-15T04:00:00.000Z",
        "begintime": null,
        "endtime": null,
        "place": "Stevensbeek",
        "cafe": "Ut Fust",
        "typeOfParty": "open"
    },
    {
        "id": 9,
        "date": "2016-07-04T04:00:00.000Z",
        "begintime": null,
        "endtime": null,
        "place": "Ysselsteyn",
        "cafe": "Kermistent Roelanzia",
        "typeOfParty": "open"
    },
    {
        "id": 19,
        "date": "2016-06-30T04:00:00.000Z",
        "begintime": "19:00",
        "endtime": "21:00",
        "place": "Overloon",
        "cafe": "Partycentrum Bos",
        "typeOfParty": "open"
    },
    {
        "id": 5,
        "date": "2016-05-21T04:00:00.000Z",
        "begintime": "22:15",
        "endtime": "22:45",
        "place": "Someren",
        "cafe": "Comeet",
        "typeOfParty": "open"
    },
    {
        "id": 4,
        "date": "2016-05-06T04:00:00.000Z",
        "begintime": null,
        "endtime": null,
        "place": "Overloon",
        "cafe": null,
        "typeOfParty": "besloten"
    },
    {
        "id": 8,
        "date": "2016-04-27T04:00:00.000Z",
        "begintime": "14:00",
        "endtime": "15:00",
        "place": "St.Anthonis",
        "cafe": "De Brink",
        "typeOfParty": "open"
    },
    {
        "id": 7,
        "date": "2016-04-26T04:00:00.000Z",
        "begintime": "22:30",
        "endtime": "00:30",
        "place": "Overloon",
        "cafe": "Partycentrum Bos",
        "typeOfParty": "open"
    },
    {
        "id": 6,
        "date": "2016-01-16T05:00:00.000Z",
        "begintime": "21:30",
        "endtime": "01:00",
        "place": "Stevensbeek",
        "cafe": "Ut Fust",
        "typeOfParty": "open"
    },
    {
        "id": 2,
        "date": "2015-11-20T05:00:00.000Z",
        "begintime": "00:00",
        "endtime": "01:00",
        "place": "Overloon",
        "cafe": "Partycentrum Bos",
        "typeOfParty": "open"
    },
    {
        "id": 1,
        "date": "2015-11-07T05:00:00.000Z",
        "begintime": "22:30",
        "endtime": "23:00",
        "place": "Someren",
        "cafe": "Comeet",
        "typeOfParty": "open"
    },
    {
        "id": 18,
        "date": "2015-09-21T04:00:00.000Z",
        "begintime": "18:00",
        "endtime": "20:00",
        "place": "Overloon",
        "cafe": null,
        "typeOfParty": "besloten"
    },
    {
        "id": 17,
        "date": "2015-09-20T04:00:00.000Z",
        "begintime": null,
        "endtime": null,
        "place": "Ledeacker",
        "cafe": "Besloten",
        "typeOfParty": "open"
    }
];

//var mysqlDb   = 'thefools';
//var mysqlString = 'mysql://'   + mysqlUser + ':' + mysqlPass + '@' + mysqlHost + ':' + mysqlPort + '/' + mysqlDb;

//var mysqlClient = mysql.createConnection(mysqlString);
//mysqlClient.connect(function(err){
 // if (err) console.log(err);
//});

app.set('port', process.env.PORT || 5000);
app.set('ip',  process.env.IP || "127.0.0.1");

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
    //var query = "SELECT id, date, TIME_FORMAT(begintime, '%H:%i') as begintime, TIME_FORMAT(endtime, '%H:%i') as endtime, " +
    //            "place, cafe, typeOfParty " +
    //            "FROM tour " +
    //            "ORDER BY date desc"
    //mysqlClient.query(query, function (err, rows, fields) {
    //  if (err) {
    //    res.send('NOT OK' + JSON.stringify(err));
    //  } else {
    //    res.send(rows);
    //  }
    //});
    res.send(tourdatajson)
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

