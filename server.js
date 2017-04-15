var express = require('express'),
    fs = require('fs'),
    rl = require('readline'),
    interface = require("./lib/steeven_bot/steven_bot.js"),
    processeur = require("./lib/processeur/processeur.js"),
    gw2requete = require("./lib/gw2SpidyRequete.js"),
    logger = require('./lib/logger.js'),
    logpath = './server.log',
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
	res.end();
	
	return cb();
});

server.get('/log', function(req, res, cb){
    logToJson(logpath, function(result){
        res.writeHeader(200, {"Content-type":"application/json"});
        res.write(result);
        res.end();

        return cb();
    });
});

function reponsehttp(res, body) {
    res.writeHeader(200, {"Content-type":"application/json"});
    res.write(body);
    res.end();
};

server.get('/gw2requete/tous', function(req, res, cb){
    reponsehttp(res, JSON.stringify(gw2requete.tousLesObjets(), null, 2));
    return cb();
});

server.get('/gw2requete/type', function(req, res, cb){
    reponsehttp(res, JSON.stringify(gw2requete.obtenirMapType(), null, 2));
    return cb();
});

server.get('/gw2requete/rarete', function(req, res, cb){
    reponsehttp(res, JSON.stringify(gw2requete.obtenirMapRarete(), null, 2));
    return cb();
});

server.get('/gw2requete/type/:type', function(req, res, cb){
    reponsehttp(res, JSON.stringify(gw2requete.parType(req.params.type), null, 2));
    return cb();
});

server.get('/gw2requete/rarete/:rarete', function(req, res, cb){
    reponsehttp(res, JSON.stringify(gw2requete.parRarete(req.params.rarete), null, 2));
    return cb();
});

server.get('/gw2requete/objet/:nom', function(req, res, cb){
    reponsehttp(res, JSON.stringify(gw2requete.parNom(req.params.nom), null, 2));
    return cb();
});

server.get('/test_proc', function(req, res, cb){
    res.writeHeader(200, {"Content-type":"application/json"});
    res.write('LISTE CHANGEMENT PRIX #########################\n' +
              JSON.stringify(processeur.changementPrix(50), null, 2) + 
              '\nMEILLEUR PROFITS ##################\n' +
              JSON.stringify(processeur.meilleursProfits(50), null, 2)
    );
    res.end();

    return cb();
});

server.listen(server.get('port'), function(){
	logger.log('info', "le server ecoute sur: %s", server.get('port'));
});

gw2requete.initialiser();