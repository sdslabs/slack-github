var request = require('request');
var express = require('express');
var app = express();

app.use(express.logger());
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.send('Hello Cruel World!');
});

app.post('/', function(req, res) {

  var textTosend = '';

  var Body = req.body;
  var Data = JSON.parse(Body.payload);

  for(var i=0;i<Data.commits.length;i++)
  {
    var commit = Data.commits[i];

    textTosend += '<@' + commit.author.username + '>' + ' <' +commit.url+  '|committed:> ' + commit.message;
    textTosend += '\n';
  }
  
  var options = {
    url: ''+process.env.webhook_url+'',
    method: 'POST',
    body: {
    		"channel": "#"+process.env.slack_channel+"", "username": ""+process.env.slack_username+"", "text": "" + textTosend + ""
    },
    json: true
  }

  request(options, function (err, res, body) {
    var headers = res.headers
    var statusCode = res.statusCode
    res.send(statusCode);
  });

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("express server listening on " + port);
});