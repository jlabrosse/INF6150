var logger = require('../logger.js');
var banque = require('../aspirateur/banque.js');
var gw2SpidyRequete = require('../gw2SpidyRequete.js');

var tousLesObjets;
var historiqueOffrePrix;
var changementPrix;
var longueurListeChangements = 50;



//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('finConstructionDonneesSpidy', function() {
    logger.log("silly", "changementPrix...");
    tousLesObjets = gw2SpidyRequete.tousLesObjets();
    construireChangementPrix(tousLesObjets);
    construireListeChangements(longueurListeChangements);
});


function construireChangementPrix(tousLesObjets) {
    logger.log("silly", "Construction de la liste des changements de prix");
    var listePrix;
    var pourcentageOffre;
    if (historiqueOffrePrix == undefined) {
        historiqueOffrePrix = {};
        for (var objet in tousLesObjets) {
            listePrix = [];
            if (tousLesObjets[objet].prix_demande_max != 0) {
                pourcentageOffre = (tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max);
                listePrix.push(pourcentageOffre);
                historiqueOffrePrix[objet] = listePrix;
            }
        }
    } else {
        for (var objet in tousLesObjets) {
            if (tousLesObjets[objet].prix_demande_max != 0) {
                historiqueOffrePrix[objet] = gererListePrix(historiqueOffrePrix[objet],
                    tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max, 12);
            }
        }
    }
}

//fonction qui limite le nombre de prix gardés en mémoire pour chaque item
function gererListePrix(tableau, prix, nombredePrix) {
    if (tableau.length == nombredePrix) {
        tableau.shift();
        tableau.push(prix);
    } else {
        tableau.push(prix);
    }
    return tableau;
}

function construireListeChangements(longueur) {
    var changementPrixTemp = [];
    var changement;
    for (var objet in historiqueOffrePrix) {
        changement = calculerChangementPrix(historiqueOffrePrix[objet]);
        changementPrixTemp[objet] = changement;
    }

    var changementPrix = [];
    for (var obj in changementPrixTemp) {
        changementPrix.push([obj, changementPrixTemp[obj]]);
    }
    changementPrix.sort(function(a, b) {
        return b[1] - a[1];
    });
    changementPrix.slice(0, longueur - 1);


}


function calculerChangementPrix(tableau) {
    var total = 0;
    for (var prix in tableau) {
        total += tableau[prix];
    }
    return total;
}

module.exports = {
    "listeChangementPrix": changementPrix
}
