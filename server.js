var http = require('http');
var s = require('./settings');
var server = http.createServer();
server.on('request', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write("hello!");
	res.end();
});
server.listen(s.port, s.host);
// server.listen(process.env.PORT || 8080);
