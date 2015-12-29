var express = require('express');
var unirest = require('unirest');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/get/:username', function (req, res) {
  const user = req.params.username;

  unirest.get("https://ismaelc-pinterest.p.mashape.com/" + user + "/boards")
  .header("X-Mashape-Key", "LrCc1gyiCTmshSvy6HHx3HcuBeolp1ftf2ojsnmqoUt7UkPTop")
  .header("Accept", "application/json")
  .end(function (result) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result.body.body));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
