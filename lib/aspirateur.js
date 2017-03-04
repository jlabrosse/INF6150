var http = require('http');

var version = 'v0.9';
var format = 'json';
var basePath = '/api/' + version + '/' + format;

function getData(url, callback) {
	var options = {
		hostname: 'www.gw2spidy.com',
		port: 80,
		path: url,
		method: 'GET'
	}
	var req = http.get(options, function(res) {
		if (res.statusCode == '404') {
			callback(null);
		}
		res.setEncoding('utf8');

		var resultat = ''

		res.on('data', function(chunk) {
			resultat += chunk;
		});

		res.on('end', function() {
			callback(resultat);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
		callback(null);
	});
}

function processResult(result, callback) {
	if (callback) {
		callback(result);
	} else {
		console.log(JSON.stringify(result, null, '\t'));
	}
}

function trouverItemParType(type, result){
	var jsonData = JSON.parse(result);
	for (var i = 0; i < jsonData.results.length; i++) {
		if(type.localeCompare(jsonData.results[i].name) == 0){
			return JSON.stringify(jsonData.results[i]);
		}
	}
	return "'" + type + "'" + " n'existe pas";
}

module.exports = {
	tousLesObjets: function(callback) {
		getData(basePath + '/all-items/all', function(result) {
			processResult(result, callback);
		});
	},

	parType: function(type, callback) {
		getData(basePath + '/types', function(result) {
			processResult(trouverItemParType(type, result), callback);
		});
		//callback(type); //return de la fonction
	},

	parRarete: function(rarete, callback) {
		//codez ici!
		callback(rarete); //return de la fonction
	},

	obtenirObjet: function(nom, callback) {
		//codez ici!
		callback(nom); //return de la fonction
	}
}