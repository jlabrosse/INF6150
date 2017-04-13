var logger = require("../logger.js"),
processeurHelper = require("./processeur_helper.js"),
gw2Requete = require("../gw2SpidyRequete.js");
		
/**Liste d'objets situés entre 2 prix **/
function collectionParPrix(minPrix, maxPrix){
	var listObjPrix = {};
	var donnees = gw2Requete.tousLesObjets();
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
	var donnees = gw2Requete.tousLesObjets();
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

module.exports = {
    'emetteur': processeurHelper.emetteur, 
    satisfaire: function(utilisateur){
        var resultat = {};
        for(var propriete in utilisateur){
            if(propriete == "nom"){
                resultat[propriete] = gw2Requete.parNom(utilisateur[propriete]);
            } else if(propriete == "rarete"){
                resultat[propriete] = gw2Requete.parRarete(utilisateur[propriete]);
            } else if(propriete == "type"){
                resultat[propriete] = gw2Requete.parType(utilisateur[propriete]);
            } else if(propriete == "prix"){
                
            }
        }
  		return resultat;
    },
    changementPrix: function(n){
        return processeurHelper.changementPrix(n);
    },
    meilleursProfits: function(n){
        return processeurHelper.meilleursProfits(n);
    }
}