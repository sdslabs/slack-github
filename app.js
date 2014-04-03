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
var Channel = process.env.CHANNEL;
var Username = process.env.USERNAME;
var Url = process.env.URL;

/* checks, if all required config vars are present or not */
var checkConfig = function() {
  if((typeof(Url)!='undefined') && (typeof(Username)!='undefined') && (typeof(Channel)!='undefined')){
    return true;
  }

  else{
    return false;
  }
}

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

  /* send message only if all config vars are present */
  if(checkConfig())
  {
    var options = {
      url: ''+Url+'',
      method: 'POST',
      body: {
          "channel": "#"+Channel+"", "username": ""+Username+"", "text": "" + generateMessage(req) + ""
      },
      json: true
    }

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