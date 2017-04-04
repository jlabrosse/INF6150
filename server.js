var express = require('express'),
    fs = require('fs'),
    rl = require('readline'),
    interface = require("./lib/steeven_bot/steven_bot.js"),
    gw2requete = require("./lib/gw2SpidyRequete.js"),
    logger = require('./lib/logger.js'),
    logpath = './server.log',
	processeur = require('./lib/processeur/changementPrix.js'),
    server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(__dirname + '/public'));


function logToJson(logfile, callback){
    var ret = [];
    var linereader = rl.createInterface({
        input: fs.createReadStream('./server.log')
    });

    linereader.on('line', function(line){
        ret.push(JSON.parse(line));
    });

    linereader.on('close', function(){
        callback(JSON.stringify(ret, null, 2));
    });
}


server.get('/', function(req, res, cb){
    logger.log('info', "Requete HTTP recu par GET \'/\'.")
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write("Le serveur est en vie!");
	res.end;
	
	return cb();
});

server.get('/log', function(req, res, cb){
    logToJson(logpath, function(result){
        res.writeHeader(200, {"Content-type":"application/json"});
        res.write(result);
        res.end;

        return cb();
    });
});

server.listen(server.get('port'), function(){
	logger.log('info', "le server ecoute sur: %s", server.get('port'));
});
