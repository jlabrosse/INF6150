var express = require('express');
var aspirateur = require("./lib/aspirateur.js");
var server = express();

server.set('port', (process.env.PORT || 8080));
server.use(express.static(__dirname + '/public'));

function reponsehttp(res, body) {
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write(body);
	res.end;
};


server.get('/requete/tous', function(req, res, cb){
	aspirateur.tousLesObjets(function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/type/:type', function(req, res, cb){
	aspirateur.parType(req.params.type, function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/rarete/:rarete', function(req, res, cb){
	aspirateur.parRarete(req.params.rarete, function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/objet/:nom', function(req, res, cb){
	aspirateur.obtenirObjet(req.params.nom, function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/index', function(req, res, cb){
	reponsehttp(res, "Hello World");
	return cb();
});

server.listen(server.get('port'), function(){
	console.log("le server ecoute sur: %s", server.get('port'));
});
