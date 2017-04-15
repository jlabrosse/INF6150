var logger = require('../logger.js'),
    banque = require('../aspirateur/banque.js'),
    gw2SpidyRequete = require('../gw2SpidyRequete.js'),
    EventsEmetteur = require('events');

var tousLesObjets
var longueurListeChangements = 50;
var longueurListeProfit = 50;
var longueurListePertes = 50;
var longueurListeStocks = 50;

class Emetteur extends EventsEmetteur {};
var emits = new Emetteur();

//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('finConstructionDonneesSpidy', function() {
    logger.log("silly", "debut processeur...");
    tousLesObjets = gw2SpidyRequete.tousLesObjets();
    construireChangementPrix(tousLesObjets);
    construireListeChangements(longueurListeChangements);
    garderMeilleursPrix(tousLesObjets,longueurListeProfit);
	construirePertes(tousLesObjets,longueurListePertes);
	construireListeStocks(tousLesObjets,longueurListeStocks);
    emits.emit('finDeProcesseur');
	logger.log("silly", "fin processeur...");
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
    meilleursProfitsTous = {};
    meilleursProfits = []; 
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

            listePrix = [];
            if (tousLesObjets[objet].prix_demande_max != 0) {
                pourcentageOffre = (tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_offre_max);
                    listePrix.push(pourcentageOffre);
                    historiqueOffrePrix[objet] = listePrix;
            }
        }
    } else {
        for (var objet in tousLesObjets) {
            if (tousLesObjets[objet].prix_demande_max != 0) {
                historiqueOffrePrix[objet] = gererListe(historiqueOffrePrix[objet],
                    tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max, 12);
            }
        }
    }
}

//fonction qui limite le nombre de prix gardés en mémoire pour chaque item
function gererListe(tableau, prix, nombredePrix) {
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
/*###################################
*
*Structure contenant objets sur lequels il y a des pertes

*/
var pertesTous = {};
var pertesCoupe = []; 

function construirePertes(tousLesObjets, quantite) {
    logger.log('silly', "Construction de la liste des pertes");
    var pertes;
    pertesTous = {};
    pertesCoupe = []; 
    for (var obj in tousLesObjets) {
        pertes = tousLesObjets[obj].prix_demande_max - tousLesObjets[obj].prix_offre_max;
        if (pertes < 0)
            pertesTous[obj]=pertes;
    }
    for (var obj in pertesTous)
        pertesCoupe.push([obj, pertesTous[obj]]);

    pertesCoupe.sort(function(a, b) {return a[1] - b[1];});
    pertesCoupe = pertesCoupe.slice(0, quantite);
}
/*###################################
*
*Structure contenant objets sur lequels il y a des modifications des stocks

*/

var historiqueStocks;
var changementStocks = [];

function construireListeStocks(tousLesObjets,longueurListeStocks){
	logger.log("silly", "Construction de la liste des changements de stocks");
    var listeStock;
    var pourcentageOffre;
    if (historiqueStocks == undefined) {
        historiqueStocks = {};
        for (var objet in tousLesObjets) {
            listeStock = [];
            listeStock.push(tousLesObjets[objet].stock_offre);
            historiqueStocks[objet] = listeStock;
        }
    } else {
		console.log("coucou");
        for (var objet in tousLesObjets) {
            historiqueStocks[objet] = gererListe(historiqueStocks[objet],tousLesObjets[objet].stock_offre, 2);
        }
		
		
		var changementStocksTemp = [];
		for (var objet in historiqueStocks) {
			if(historiqueStocks[objet][1]<=historiqueStocks[objet][0]/2){
				changementStocksTemp[objet]=1-historiqueStocks[objet][1]/historiqueStocks[objet][0];
				console.log(changementStocksTemp[objet]);
			}
		}
		for (var obj in changementStocksTemp)
			changementStocks.push([obj, changementStocksTemp[obj]]);
		changementStocks.sort(function(a, b) {return b[1] - a[1];});
		changementStocks = changementStocks.slice(0, longueurListeStocks);
    }
	
}

module.exports = {
    'emetteur': emits,
    changementPrix: function(n){
        if(n < longueurListeChangements)
            return changementPrix.slice(0, n);

        return changementPrix;
    },
    meilleursProfits: function(n){
        if(n < longueurListeProfit)
            return meilleursProfits.slice(0, n);

        return meilleursProfits
    },
    pertes: function(n){
        if(n < longueurListePertes)
            return pertesCoupe.slice(0, n);

        return pertesCoupe
    },
    stocks: function(n){
        if(n < longueurListeStocks)
            return changementStocks.slice(0, n);

        return changementStocks
    }
};