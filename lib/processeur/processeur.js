var logger = require("../logger.js"),
processeurHelper = require("./processeur_helper.js"),
gw2Requete = require("../gw2SpidyRequete.js");
		
/**Liste d'objets situés entre 2 prix **/
function collectionParPrix(minPrix, maxPrix){
	var listObjPrix = {};
	var donnees = gw2Requete.tousLesObjets();
	for(var cle in donnees){
		var prixObj = donnees[cle].prix_offre_max;
		if (prixObj >= minPrix && prixObj <= maxPrix)
			listObjPrix[cle] = donnees[cle];
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
        var resultat = [];
        for(var i = 0; i < utilisateur.length; i++){
            var propriete = Object.keys(utilisateur[i])[0];
            
            if(propriete == "nom"){
                var valeur = {};
                valeur[utilisateur[i][propriete]] = gw2Requete.parNom(utilisateur[i][propriete]);
                resultat.push(valeur);
            } else if(propriete == "rarete"){
                resultat.push(gw2Requete.parRarete(utilisateur[i][propriete]));
            } else if(propriete == "type"){
                resultat.push(gw2Requete.parType(utilisateur[i][propriete]));
            } else if(propriete == "prix"){
                resultat.push(collectionParPrix(utilisateur[i][propriete]['min'], utilisateur[i][propriete]['max']));
            }
        }
  		return resultat;
    },
    changementPrix: function(n){
        return processeurHelper.changementPrix(n);
    },
    meilleursProfits: function(n){
        return processeurHelper.meilleursProfits(n);
    },
	pertes: function(n){
        return processeurHelper.pertes(n);
    }
}