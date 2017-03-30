var logger = require("../logger.js");


//inscription a l'evement donnees de banque.js#########
aspirateur.emetteur.on('data', function(donnees) {
    logger.log('silly', "traitement...");
    construireChangementPrix(donnees);

    logger.log('silly', "traitement fini");
});
function construireChangementPrix(donnees) {
    logger.log('silly', "Construction de la liste des changements de prix");

    for(var i = 0; i < donnees.results.length; i++){

    }

};