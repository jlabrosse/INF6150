var express = require("express");
var server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/public'));

server.get('/index', function(req, res, cb){
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write("hello wordl!");
	res.end();

	return cb();	
});

server.listen(server.get('port'), function(){
	console.log("server is listening at port %s", server.get('port'));
});