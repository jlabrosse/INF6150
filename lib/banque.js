var aspirateur = require("./aspirateur.js");

var mapType = aspirateur.getmapType;
var mapRarity = aspirateur.getmapRarity;

//objet json des donnes courante disponnible
var steevenData = [];

//inscription a l'evement donnees d'aspirateur.js###########
aspirateur.emetteur.on('donnees', function(donnees) {
    console.log("traitement...");
    construireDonneesGW2(donnees);
    console.log("traitement fini");
});
//##########################################################



/*
 * Construit la structure de donnees a partir des donnes de gw2spidy :
 * parametre : donnees recu par l'appelle REST a l'api de gw2spidy
 */
function construireDonneesGW2(donnees) {
    console.log("Construction des donnees");

    var avancement;
    for(var i = 0; i < donnees.results.length; i++){
        steevenData.push({
            [donnees.results[i].name]: {
                'rarete': rarityToString(donnees.results[i].rarity),
                'type': typeToString(donnees.results[i].type_id),
                'sous_type': subTypeToString(donnees.results[i].type_id, donnees.results[i].sub_type_id),
                'prix_demande_max': donnees.results[i].max_offer_unit_price,
                'prix_offre_max': donnees.results[i].max_sale_unit_price,
                'stock_demande': donnees.results[i].offer_availability,
                'stock_offre': donnees.results[i].sale_availidity,
                'demande_prix_heure': donnees.results[i].sale_price_change_last_hour,
                'offre_prix_heure': donnees.results[i].offer_price_change_last_hour
            }
        });
    }
};

function typeToString(typeId) {
    for(var i = 0; i < mapType.length; i++){
        if(mapType.results[i].id == typeId)
            return mapType.results[i].name;
    }
};

function subTypeToString(typeId, subTypeId) {
    for(var i = 0; i < mapType.length; i++){
        if(mapType.results[i].id == typeId)
            for(var j = 0; j < mapType.results[i].subtypes.length; j++){
                var subtype = mapType.results[i].subtypes[j]; 
                if(subtype.id == subTypeId)
                    return subtype.name; 
            }
    }  
};

function rarityToString(rarityId) {
    for(var i = 0; i < mapRarity.length; i++){
        if(mapRarity.results[i].id == rarityId)
            return mapRarity.results[i].name;
    }
};

module.exports = steevenData;