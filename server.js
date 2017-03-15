var express = require('express'),
	requete = require("./lib/gw2SpidyRequete"),
	server = express();

server.set('port', (process.env.PORT || 8080));
server.use(express.static(__dirname + '/public'));

function reponsehttp(res, body) {
	res.writeHeader(200, {"Content-type":"text/html"});
	res.write(body);
	res.end;
};

server.get('/requete/tous', function(req, res, cb){
	requete.tousLesObjets(function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/type', function(req, res, cb){
	requete.obtenirMapType(function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/type/:type', function(req, res, cb){
	requete.parType(req.params.type, function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});


server.get('/requete/rarete', function(req, res, cb){
	requete.obtenirMapRarete(function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/rarete/:rarete', function(req, res, cb){
	requete.parRarete(req.params.rarete, function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.get('/requete/objet/:nom', function(req, res, cb){
	requete.obtenirObjet(req.params.nom, function(resultat){
		reponsehttp(res, resultat);
		return cb();
	});
});

server.listen(server.get('port'), function(){
	console.log("le server ecoute sur: %s", server.get('port'));
});