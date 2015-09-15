require ("daemon")();

var https = require('https'),
    redis = require('faye-redis'),
    fs    = require('fs'),
    faye  = require('faye');

var bayeux = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45,
  engine: {
    type: redis
}});

var options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
}

// Handle non-Bayeux requests
var server = https.createServer(options, function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello, non-Bayeux request\n');
});

bayeux.attach(server);
server.listen(5223);
