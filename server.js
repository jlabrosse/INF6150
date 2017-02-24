var express = require('express');
var server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/public'));

server.get('/index', function(req, res, cb){
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write("hello world, une petite niaiserie");
	res.end;
	
	return cb();
});

server.listen(server.get('port'), function(){
	console.log("le server ecoute sur: %s", server.get('port'));
});