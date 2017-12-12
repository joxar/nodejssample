var http = require('http'),
	qs = require('querystring'),
	fs = require('fs'),
	ejs = require('ejs'),
	s = require('./settings'),
	template = fs.readFileSync(__dirname + '/html/index.ejs', 'utf-8'),
	server = http.createServer(),
	posts = [];

/*** diplay form ***/
function renderForm(posts, res) {
	var data = ejs.render(template, {
		posts: posts
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.end();
}

server.on('request', function(req, res) {
	if (req.method === 'POST') {
		req.data = '';
		// receive posts data
		req.on('readable', function() {
			req.data += req.read() || '';
			console.log(req.data);
		});
		// end
		req.on('end', function() {
			var query = qs.parse(req.data);
			console.log(query);
			posts.push("ZZZZ" + query.user_name);
			renderForm(posts, res);
		});
	} else {
		renderForm(posts, res);
	}
});
// server.listen(s.port, s.host);
server.listen(process.env.PORT || 8080);
console.log("server started.")
