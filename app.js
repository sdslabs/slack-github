/* required dependencies */
var request = require('request');
var express = require('express');

/* app instance */
var app = express();

/* app configurations */
app.use(express.logger());
app.use(express.bodyParser());

/* redirects to GitHub Repo of the module */
app.get('/', function(req, res) {
  res.redirect('https://github.com/sdslabs/slack-github');
});

/* config variables */
var channel = process.env.CHANNEL;
var username = process.env.USERNAME;
var url = process.env.URL;

/* returns genarated message to send using request payload by GitHub */
var generateMessage = function(req) {
  var result = '';

  var Body = req.body;
  var Data = JSON.parse(Body.payload);

  for(var i=0;i<Data.commits.length;i++)
  {
    var commit = Data.commits[i];

    result += '<@' + commit.author.username + '>' + ' <' +commit.url+  '|committed:> ' + commit.message;
    result += '\n';
  }

  return result;
}

/*
triggers on a POST request by GitHub webhook
and send message to slack-channel, according to commit detail
*/
app.post('/', function(req, res) {

  /* works only, if url config var is there */
  if(url)
  {
    var options = {};
    options.url = url;
    options.method = 'POST';

    /* use default channel and username if they are not present in config */
    options.body = {};
    if(channel) {options.body['channel'] = ''+ channel +'';}
    if(username) {options.body['username'] = ''+ username +'';}
    options.body['text'] = generateMessage(req);

    options.json = true;

    request(options, function (err, res, body) {
      var headers = res.headers
      var statusCode = res.statusCode
      res.send(statusCode);
    });
  }

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("express server listening on " + port);
});