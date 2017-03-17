var banque = require("./aspirateur/banque.js");

function rechercheParType(type){
    if(banque.type[type] != null)
        return JSON.stringify(banque.type[type]);
    else{
        for(var key in banque.type){
            if(banque.type[key][type] != null)
                return JSON.stringify(banque.type[key][type]);
        }
        return 'Type non trouve';
    }
}

module.exports = {
    tousLesObjets: function(callback) {
        callback(JSON.stringify(banque.objets));
    },

    parType: function(type, callback) { 
        callback(rechercheParType(type)); 
    },

    parRarete: function(rarete, callback) {
        if(banque.rarete[rarete] != null)
            callback(JSON.stringify(banque.rarete[rarete]));
        else
            callback('Rarete non trouvee');
    },

    obtenirObjet: function(nom, callback) {
        if(banque.objets[nom] != null){
            callback(JSON.stringify(banque[nom]));
            
        } else
            callback("Objet non trouve");
    },

    obtenirMapType: function(callback) {
        banque.mapType(function(resultat){
            callback(JSON.stringify(resultat));
        });
    },

    obtenirMapRarete: function(callback) {
        banque.mapRarity(function(resultat){
            callback(JSON.stringify(resultat));
        });
    }
}