var logger = require("../logger.js"),
    banque = require("../aspirateur/banque.js"),
    gw2SpidyRequete = require("../gw2SpidyRequete.js");


var tousLesObjets;
gw2SpidyRequete.tousLesObjets(function(resultat) {
    tousLesObjets = resultat;
});

//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('data', function() {
    logger.log('silly', "traitement meilleur prix...");
    construireChangementPrix(donnees);
    var mapType;
    aspirateur.getmapType(function(resultat) {
        mapType = resultat;
    });
    logger.log('silly', "traitement fini meilleur prix");
});


function garderMeilleursPrix(donnees, quantite) {
    logger.log('silly', "Determination des meilleurs prix");

    //var quantite = 10; //Quantite de meilleurs offres a entrer...
    var meilleursPrix = {};
    var meilleursPrixFinale = {}; 
    var compteur = 0;

    // Mettre tous les prix qui ont un profit du plus petit profit au plus grand
    for (var obj in donnees) {

        if ((obj.prix_demande_max - obj.prix_offre_max) > 0 && meilleursPrix.length == 0) {

            meilleursPrix[0] = obj;

        } else if ((obj.prix_demande_max - obj.prix_offre_max) > 0 && meilleursPrix.length > 0) {

            var essaye = false;
            for (var i = 0; i < meilleursPrix.length; i++) {

                if ((meilleursPrix[i].prix_demande_max - meilleursPrix[i].prix_offre_max) > (obj.prix_demande_max - obj.prix_offre_max)) {

                    for (var j = meilleursPrix.length; j > i; j--) {
                        meilleursPrix[j] = meilleursPrix[j - 1];
                    }
                    meilleursPrix[i] = obj;
                    essaye = true;

                }

            }

            if (essaye == false) {
                meilleursPrix[meilleursPrix.length] = obj;
            }

        }

    }

    var longueur = meilleursPrix.length - 1;

    // Garder la quantite demandes des meilleurs offres du plus grand profit au plus petit
    for (var i = longueur; i > (longueur - quantite); i--) {
        meilleursPrixFinale[compteur++] = meilleursPrix[i];
    }

};
