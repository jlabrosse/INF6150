var express = require("express");
var server = express();

server.url = "http://morning-brushlands-43984.herokuapp.com/"

server.get('/index', function(req, res, cb){
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write("hello wordl!");
	res.end();

	return cb();	
});

server.listen(80, function(){
	console.log("server is listening at %s:%s", server.url, port);
});