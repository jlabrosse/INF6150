var http = require('http'),
logger = require("../logger.js"),
processeur = require("../gw2SpidyRequete.js"),
banque = require("../aspirateur/banque.js");
		
/**Liste d'objets situés entre 2 prix **/
function collectionParPrix(minPrix, maxPrix){
	var listObjPrix = {};
	var donnees = processeur.tousLesObjets();
	for(var cle in donnees){
		var prixObj = donnees[cle].prix_demande_max;
		if (prixObj >= minPrix && prixObj <= maxPrix)
			listObjPrix[cle] = prixObj;
	}
	return listObjPrix;
};

// Trouver l'objet plus en stock sur le marché 
function objetMaxOffre(){
	var maxObjStock = {};
	var maxStock = 0;
	var maxNomStock = "";
	var donnees = processeur.tousLesObjets();
	for(var cle in donnees){
		var qteStock = donnees[cle].stock_demande;
		if (qteStock > maxStock){
			maxStock = qteStock;
			maxNomStock = cle;
		}	
	}
	for (var cle in donnees){
		if(cle == maxNomStock)
			maxObjStock[cle] = {
				'rarete': donnees[cle].rarete,
                'type': donnees[cle].type,
				'prix_demande_max': donnees[cle].prix_demande_max,
				'stock_demande': donnees[cle].stock_demande
			};
	}
	return maxObjStock;
}

function collectionDonnees(utilisateur){
        var resultat = [];
        for(var u in utilisateur){
            if(u.propriete == "nom"){
                resultat.push({
                    "propriete": processeur.parNom(u.valeur)
                });
            }
			if(u.propriete == "rarete"){
                resultat.push({
                    "propriete": processeur.parRarete(u.valeur)
                });
            }
			if(u.propriete == "type"){
                resultat.push({
                    "propriete": processeur.parType(u.valeur)
                });
            }
        }
		return resultat;
}

	
	
