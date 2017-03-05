var http = require('http');

var version = 'v0.9';
var format = 'json';
var basePath = '/api/' + version + '/' + format;
var text = '';

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

function trouverTypeId(type, result, callback){
	var jsonData = JSON.parse(result);
	for (var i = 0; i < jsonData.results.length; i++) {
		if(type.localeCompare(jsonData.results[i].name) == 0){
			var typeId = jsonData.results[i].id.toString();
			trouverItemsParTypeId(typeId, 1, callback);
		}
	}
}

function trouverItemsParTypeId(typeId, numPage, callback){
	getData(basePath + '/items/' + typeId + '/' + numPage, function(result) {
		console.log(JSON.parse(result).page + ' | ' + JSON.parse(result).last_page);
		if(JSON.parse(result).page <= JSON.parse(result).last_page){
			text += JSON.stringify(JSON.parse(result));
			trouverItemsParTypeId(typeId, JSON.parse(result).page + 1, callback);
		}else{
			processResult(JSON.stringify(text), callback);
		}
	});
}

module.exports = {
	tousLesObjets: function(callback) {
		getData(basePath + '/all-items/all', function(result) {
			processResult(result, callback);
		});
	},

	parType: function(type, callback) {	
		getData(basePath + '/types', function(result) {
			trouverTypeId(type, result, callback);
		});
	},

	parRarete: function(rarete, callback) {
		getData(basePath + '/rarities', function(result) {
			processResult(result, callback);
		});
	},

	obtenirObjet: function(nom, callback) {
		//codez ici!
		callback(nom); //return de la fonction
	}
}