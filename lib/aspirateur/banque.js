var aspirateur = require("./aspirateur.js"),
    EventsEmetteur = require('events'),
    logger = require("../logger.js");

var mapType = {};
var mapRarity = {};

//objet json des donnes courante disponnible
var steevenData = {};
var steevenDataParType = {};
var steevenDataParRarete = {};

/*Evenement: se declenche lorsque des donnees sont construite.
 *      Ecouteurs :
 *          - processeur.js
 */
class Emmetteur extends EventsEmetteur {}
var emits = new Emmetteur();

//inscription a l'evement donnees d'aspirateur.js###########
aspirateur.emetteur.on('donnees', function(donnees) {
    logger.log('silly', "traitement...");
    construireDonneesGW2(donnees);
    construireDonneesGW2ParType(steevenData);
    construireDonneesGW2ParRarete(steevenData);
    logger.log('silly', "traitement fini");
	emits.emit('finConstructionDonneesSpidy');
});
//##########################################################

/*
 * Construit la structure de donnees a partir des donnes de gw2spidy :
 * parametre : donnees recu par l'appelle REST a l'api de gw2spidy
 */
function construireDonneesGW2(donnees) {
    logger.log('silly', "Construction des donnees");

    for(var i = 0; i < donnees.results.length; i++){
        steevenData[donnees.results[i].name] = {
            'rarete': rarityToString(donnees.results[i].rarity),
            'type': typeToString(donnees.results[i].type_id),
            'sous_type': subTypeToString(donnees.results[i].type_id, donnees.results[i].sub_type_id),
            'prix_demande_max': donnees.results[i].max_offer_unit_price,
            'prix_offre_max': donnees.results[i].min_sale_unit_price,
            'stock_demande': donnees.results[i].offer_availability,
            'stock_offre': donnees.results[i].sale_availidity,
            'demande_prix_heure': donnees.results[i].sale_price_change_last_hour,
            'offre_prix_heure': donnees.results[i].offer_price_change_last_hour
        };
    }

};

function construireDonneesGW2ParType(donnees) {
    logger.log('silly', "Construction des donnees par type");
    
    for(var i = 0; i < mapType.results.length ; i++){
        var type = mapType.results[i].name;
        steevenDataParType[type] = {};

        for(var j = 0; j < mapType.results[i].subtypes.length; j++){
            var subtype = mapType.results[i].subtypes[j].name; 
            steevenDataParType[type][subtype] = trouverObjetDeType(donnees, subtype);
        }
    }
}

function trouverObjetDeType(donnees, subtype){
    var retour = {};

    for(var cle in donnees){
        if(donnees[cle].sous_type == subtype)
            retour[cle] = donnees[cle];
    }
    return retour;
}


function construireDonneesGW2ParRarete(donnees) {
    logger.log('silly', "Construction des donnees par rarete");

    for(var i = 0; i < mapRarity.results.length; i++){
        var rarete = mapRarity.results[i].name;
        steevenDataParRarete[rarete] = trouverObjetDeRarete(donnees, rarete);
    }
}

function trouverObjetDeRarete(donnees, rarete){
    var retour = {};

    for(var cle in donnees){
        if(donnees[cle].rarete == rarete)
            retour[cle] = donnees[cle];
    }
    return retour;
}


function typeToString(typeId) {
    for(var i = 0; i < mapType.results.length; i++){
        if(mapType.results[i].id == typeId)
            return mapType.results[i].name;
    }
};

function subTypeToString(typeId, subTypeId) {
    for(var i = 0; i < mapType.results.length; i++){
        if(mapType.results[i].id == typeId)
            for(var j = 0; j < mapType.results[i].subtypes.length; j++){
                var subtype = mapType.results[i].subtypes[j]; 
                if(subtype.id == subTypeId)
                    return subtype.name; 
            }
    }  
};

function rarityToString(rarityId) {
    for(var i = 0; i < mapRarity.results.length; i++){
        if(mapRarity.results[i].id == rarityId)
            return mapRarity.results[i].name;
    }
};

module.exports = {
    'emetteur': emits,
    'objets': steevenData,
    'type': steevenDataParType,
    'rarete': steevenDataParRarete,
    'mapType': function(){return mapType;},
    'mapRarity': function(){return mapRarity;},
    initialiserMap: function(){
        aspirateur.getmapType(function(resultat){
            mapType = resultat;
            aspirateur.getmapRarity(function(resultat){
                mapRarity = resultat;
            });
        });
    }
}