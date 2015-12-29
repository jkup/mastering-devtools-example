var express          = require('express');
var expressSanitizer = require('express-sanitizer');
var bodyParser       = require('body-parser')
var unirest          = require('unirest');
var app              = express();

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSanitizer());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/get/:username', function (req, res) {
  const user = req.sanitize(req.params.username);

  unirest.get("https://ismaelc-pinterest.p.mashape.com/" + user + "/boards")
  .header("X-Mashape-Key", "LrCc1gyiCTmshSvy6HHx3HcuBeolp1ftf2ojsnmqoUt7UkPTop")
  .header("Accept", "application/json")
  .end(function (result) {
    res.render('list', {results: result.body.body})
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
