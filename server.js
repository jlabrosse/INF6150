var express = require('express'),
    interface = require("./lib/steeven_bot/steven_bot.js"),
    gw2requete = require("./lib/gw2SpidyRequete.js"),
    logger = require('./lib/logger.js'),
    server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/public'));

server.get('/', function(req, res, cb){
    logger.log('info', "Requete HTTP recu par GET \'/\'.")
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write("Le serveur est en vie!");
	res.end;
	
	return cb();
});

server.listen(server.get('port'), function(){
	logger.log('info', "le server ecoute sur: %s", server.get('port'));
});
