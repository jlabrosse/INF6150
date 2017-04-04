var logger = require("../logger.js");
var banque = require("../aspirateur/banque.js");
var gw2SpidyRequete = require("../gw2SpidyRequete.js");


var tousLesObjets;

//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('finConstructionDonneeSpidy', function() {
    logger.log("silly", "changementPrix...");
    tousLesObjets = gw2SpidyRequete.tousLesObjets();
    construireChangementPrix();
});


function construireChangementPrix() {
    logger.log("silly", "Construction de la liste des changements de prix");

}

