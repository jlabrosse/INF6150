var http = require('http'),
	cron = require('node-cron'),
	EventsEmetteur = require('events'),
	logger = require('../logger.js');

/*Evenement: se declenche lorsque des donnees sont aspiree.
 *		Ecouteurs :
 *			- banque.js
 */
class Emmetteur extends EventsEmetteur {}
var emits = new Emmetteur();



//CONFIG GW2SPIDY API #########################################
var version = 'v0.9';
var format = 'json';
var basePath = '/api/' + version + '/' + format;
var text = '';
//#############################################################

/*
 * Callback un resultat de l'API gw2 spidy en JSON
 * parametre : url de la requete REST
 *             fonction callback
 */
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
			callback(JSON.parse(resultat));
		});
	}).on('error', function(e) {
		logger.log('error', "Got error: " + e.message);
		callback(null);
	});
}

//Tache s'executant toutes les minutes #########################
var tache = cron.schedule('*/30 * * * * *', function(){
	logger.log('info', "Tache cron demaree");
	
	getData(basePath + '/all-items/all', function(gw2spidyData){
		logger.log('info', "Les donnees ont ete aspiree");
		
		emits.emit('donnees', gw2spidyData);
	});
}, true);
//##############################################################


module.exports = {
	'emetteur': emits,
	start: function(){
		logger.log('info', "Initialisation de la banque de donnees");
		getData(basePath + '/all-items/all', function(gw2spidyData){
			logger.log('info', "Les donnees ont ete aspiree");
			
			emits.emit('donnees', gw2spidyData);
		});
	},
	getmapType: function(callback) { // Retourne la map entre les id et les types
					getData(basePath + '/types', function(resultat){
						callback(resultat);
					});

				},
	getmapRarity: function(callback) { // Retourne la map entre les id et les raretes
					getData(basePath + '/rarities', function(resultat){
						callback(resultat);
					});
				}
};