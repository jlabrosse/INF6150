/**A faire
	var http = require('http'),
	logger = require("../logger.js");**/
	var processeur = require("../gw2SpidyRequete.js");
	//logger.log('silly', "entree collect");
	
	
	//var nom = "";
	/*var mapObj;
	processeur.tousLesObjets(function(resultat){
		mapObj = resultat;
	});
console.log("Debut collection");


	var listItemsDemande = [];
	var listRareteDemande = [];
	listRareteDemande[0] = "Common";
	listItemsDemande[0] = "Weapon";
	listItemsDemande[1] = "Armor";
	listItemsDemande[2] = "Trinkets";
	listItemsDemande[3] = "Outfit";
	collectionDonnees(listItemsDemande);
	//collectionRarete(listRareteDemande);
	var mapNom, nom;
	var chercheItem = {};

// Prendre en entrée une liste d'objets(nom) et retourner les prix demande, les prix max et le stock_offre pour chaque objet
function  collectionDonnees(listItemsDemande) {
	var listItems = {};
	console.log(listItemsDemande.length);
	for(var i = 0; i < listItemsDemande.length; ++i) {
		var nom = listItemsDemande[i];
		//console.log(nom);
		processeur.parNom(function(nom,result){
			if(result == null) {
            console.log("Aucun élément trouvé!");
			} else {
				mapNom = result;
				console.log(mapNom);
				var chercheItem = {};
				listItems[mapNom.result[i].name] = chercheItem;
				console.log(listItems[mapNom.result[i].name]);
				chercheItem.prix_demande_max = mapNom.result[i].max_offer_unit_price;
				chercheItem.prix_offre_max = mapNom.result[i].max_sale_unit_price;
				chercheItem.stock_offre = mapNom.result[i].sale_availidity;
			}
		});
  }
  return(chercheItem);
}

/**Liste d'objets situés entre 2 prix **//*
function collectionParPrix(minPrix, maxPrix){
	for(var i = 0; i < mapObj.results.length ; i++){
		var prixObj = mapObj.results[i].max_sale_unit_price;
		if (prixObj >= minPrix && prixObj <= maxPrix)
			listObj[i] = mapObj.results[i].name;
	}
	return(listObj);
}

/** Trouver l'objet plus en stock sur le marché: stock_offre 
function objetMaxOffre(){
	
	
	return;
}



*/
// Prendre en entrée une liste d'objets(nom) et retourner le prix demande max pour chaque objet
/*function  collectionRarete(listRareteDemande) {
	var listRarete = {};
	var totalRarete = listRareteDemande.length;
	console.log(totalRarete);
	for(var i = 0; i < totalRarete; ++i) {
		var objRarete = listRareteDemande[i];
		console.log(objRarete);
		processeur.parRarete(function(objRarete){
		if(result == null) {
        console.log("Aucun élément trouvé!");
      } else {
        var mapRarete = result;
		listRarete[mapRarete.name].rarete = mapRarete.result[i].rarity;
		//console.log(mapRarete);
		//var chercheItem = {};
        //listItems[mapNom.name] = chercheItem;
		//console.log(listItems[mapNom.name]);
        //chercheItem.prix_demande_max = mapNom.result[i].max_offer_unit_price;
		return(listRarete);
		//max_sale_unit_price
     
      }
    });
  }
}*/