var logger = require("../logger.js"),
    banque = require("../aspirateur/banque.js"),
    gw2SpidyRequete = require ("../gw2SpidyRequete.js");


var tousLesObjets;
gw2SpidyRequete.tousLesObjets(function(resultat){
    tousLesObjets = resultat;
});

//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('data', function() {
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