var express = require("express");
var server = express();

server.url = "https://morning-brushlands-43984.herokuapp.com"

//server.url = "localhost"

server.get('/index', function(req, res, cb){
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write("hello wordl!");
	res.end();

	return cb();	
});

server.listen(8080, function(){
	console.log("server is listening at %s:%s", server.url, 8080);
});