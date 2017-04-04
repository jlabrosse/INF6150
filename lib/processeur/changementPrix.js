var logger = require('../logger.js');
var banque = require('../aspirateur/banque.js');
var gw2SpidyRequete = require('../gw2SpidyRequete.js');

var tousLesObjets;
var historiqueOffrePrix;
var changementPrix = {};



//inscription a l'evement donnees de banque.js#########
banque.emetteur.on('finConstructionDonneesSpidy', function() {
    logger.log("silly", "changementPrix...");


    tousLesObjets = gw2SpidyRequete.tousLesObjets();
    construireChangementPrix();
});


function construireChangementPrix() {
    logger.log("silly", "Construction de la liste des changements de prix");
    var listePrix = [];
    var objet;
    var pourcentageOffre;
    
    //historiqueOffrePrix est vide
    if(historiqueOffrePrix==undefined){
        console.log("historiqueOffrePrix Vide");
        historiqueOffrePrix ={}
        for (objet in tousLesObjets) {
            //logger.log("info",tousLesObjets[objet].offre_prix_heure + " offre prix heure");
            //logger.log("info",tousLesObjets[objet].prix_offre_max + " offre prix MAX");
            historiqueOffrePrix[objet]=[];
            if(tousLesObjets[objet].prix_demande_max!=0){
                pourcentageOffre =(tousLesObjets[objet].offre_prix_heure / tousLesObjets[objet].prix_demande_max);
            }else{
                pourcentageOffre =0;
            }
                listePrix[0]=pourcentageOffre;
                logger.log("silly",pourcentageOffre + " %%");
                historiqueOffrePrix[objet] = listePrix;
                listePrix = [];
            
        }
    }else{
        console.log("else");
    }
}

//fonction qui limite le nombre de prix gardés en mémoire pour chaque item
function gererFileChangementPrix(file, prix) {
    if (file.length == 12) {
        file.shift();
        file.push(prix);
    } else {
        file.push(prix);
    }
    return file;
}


