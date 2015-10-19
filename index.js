var express = require('express');
var app = express();
var path    = require("path");

app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


