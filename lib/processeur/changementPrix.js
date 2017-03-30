var logger = require("../logger.js"),
    banque = require("../aspirateur/aspirateur.js");


//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('data', function(donnees) {
    logger.log('silly', "traitement...");
    construireChangementPrix(donnees);
    logger.log('silly', "traitement fini");
});


function construireChangementPrix(donnees) {
    logger.log('silly', "Construction de la liste des changements de prix");

    for(var i = 0; i < donnees.results.length; i++){

    }

};

function gererhistoriqueChangementPrix(queue){
(if queue.length==12)

};