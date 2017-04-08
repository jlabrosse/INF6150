var logger = require('../logger.js');
var banque = require('../aspirateur/banque.js');
var gw2SpidyRequete = require('../gw2SpidyRequete.js');


var tousLesObjets
var longueurListeChangements = 50;
var longueurListeProfit = 50;

//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('finConstructionDonneesSpidy', function() {
    logger.log("silly", "changementPrix...");
    tousLesObjets = gw2SpidyRequete.tousLesObjets();
    construireChangementPrix(tousLesObjets);
    construireListeChangements(longueurListeChangements);
    garderMeilleursPrix(tousLesObjets,longueurListeProfit);
});

/*###################################
*
*Structure contenant les plus grands profits

*/


var meilleursProfitsTous = {};
var meilleursProfits = []; 

function garderMeilleursPrix(tousLesObjets, quantite) {
    logger.log('silly', "Construction de la liste des meilleurs prix");
    var profit;
    for (var obj in tousLesObjets) {
        profit = tousLesObjets[obj].prix_demande_max-tousLesObjets[obj].prix_offre_max;
        if (profit > 0)
            meilleursProfitsTous[obj]=profit;
    }
    for (var obj in meilleursProfitsTous)
        meilleursProfits.push([obj, meilleursProfitsTous[obj]]);

    meilleursProfits.sort(function(a, b) {return b[1] - a[1];});
    meilleursProfits = meilleursProfits.slice(0, quantite);
}


/* ###################################
*
*Structure contenant les changements de Prix

*/
var historiqueOffrePrix;
var changementPrix = [];


function construireChangementPrix(tousLesObjets) {
    logger.log("silly", "Construction de la liste des changements de prix");
    var listePrix;
    var pourcentageOffre;
    if (historiqueOffrePrix == undefined) {
        historiqueOffrePrix = {};
        for (var objet in tousLesObjets) {
           // console.log(tousLesObjets[objet].prix_offre_max+ " offremax");
            listePrix = [];
            if (tousLesObjets[objet].prix_demande_max != 0) {
                pourcentageOffre = (tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max);
                //if(pourcentageOffre > 0){
                    listePrix.push(pourcentageOffre);
                    historiqueOffrePrix[objet] = listePrix;
                //}
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

function construireListeChangements(quantite) {
    var changementPrixTemp = [];
    for (var objet in historiqueOffrePrix) 
        changementPrixTemp[objet] = calculerChangementPrix(historiqueOffrePrix[objet]);
    for (var obj in changementPrixTemp)
        changementPrix.push([obj, changementPrixTemp[obj]]);
    changementPrix.sort(function(a, b) {return b[1] - a[1];});
    changementPrix = changementPrix.slice(0, quantite);
}


function calculerChangementPrix(tableau) {
    var total = 0;
    for (var prix in tableau) {
        total += tableau[prix];
    }
    return total;
}

module.exports = {
    'listeChangementPrix': changementPrix,
    'listeMeilleursProfits' : meilleursProfits
}
