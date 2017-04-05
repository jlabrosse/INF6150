var logger = require('../logger.js');
var banque = require('../aspirateur/banque.js');
var gw2SpidyRequete = require('../gw2SpidyRequete.js');

var tousLesObjets;
var historiqueOffrePrix;
var changementPrix = [];



//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('finConstructionDonneesSpidy', function() {
    logger.log("silly", "changementPrix...");
    tousLesObjets = gw2SpidyRequete.tousLesObjets();
    construireChangementPrix(tousLesObjets);
    construireListeChangements(50);
});


function construireChangementPrix(tousLesObjets) {
    logger.log("silly", "Construction de la liste des changements de prix");
    var listePrix;
    var objet;
    var pourcentageOffre;

    //historiqueOffrePrix est vide
    if (historiqueOffrePrix == undefined) {
        console.log("VIDE");
        historiqueOffrePrix = {};
        for (objet in tousLesObjets) {
            listePrix = [];
            //logger.log("info",tousLesObjets[objet].offre_prix_heure + " offre prix heure");
            logger.log("info",tousLesObjets[objet].prix_offre_max + " offre prix MAX");
            historiqueOffrePrix[objet] = [];
            if (tousLesObjets[objet].prix_demande_max != 0) {
                pourcentageOffre = (tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max);
            } else {
                pourcentageOffre = 0;
            }
            listePrix.push(pourcentageOffre);
            //logger.log("silly", pourcentageOffre + " %%");
            historiqueOffrePrix[objet] = listePrix;
        }
    } else {
        console.log("ELSE");
        for (objet in tousLesObjets) {
            historiqueOffrePrix[objet] = gererListePrix(historiqueOffrePrix[objet],
                tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max,12);
        }
    }
}

//fonction qui limite le nombre de prix gardés en mémoire pour chaque item
function gererListePrix(tableau, prix,nombredePrix) {
    if (tableau.length == nombredePrix) {
        tableau.shift();
        tableau.push(prix);
    } else {
            //console.log(prix+" prixtableau pas encore max capacité");
       tableau.push(prix);
    }
    return tableau;
}

function construireListeChangements(longueur) {
    var objet;
    var changementPrixTemp = [];
    var changement;
    for (objet in historiqueOffrePrix) {
        changement = calculerChangementPrix(historiqueOffrePrix[objet]);
        if (changement > 1) {
            changementPrixTemp[objet] = changement;
        }
    }
    changementPrixTemp.sort(function(a, b) {
        return changementPrixTemp[b] - changementPrixTemp[a];
    });
    for (var i = 0; i < longueur; i++) {
        changementPrix[i] = changementPrixTemp[i];
    }
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