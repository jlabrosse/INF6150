var banque = require("./aspirateur/banque.js"),
    aspirateur = require("./aspirateur/aspirateur.js");

function rechercheParType(type){
    if(banque.type[type] != null)
        return banque.type[type];
    else{
        for(var key in banque.type){
            if(banque.type[key][type] != null)
                return banque.type[key][type];
        }
        return undifined;
    }
}

module.exports = {
    tousLesObjets: function() {
        return banque.objets;
    },

    parType: function(type) { 
        return rechercheParType(type); 
    },

    parRarete: function(rarete) {
        if(banque.rarete[rarete] != null)
            return banque.rarete[rarete];
        else
            return undifined;
    },

    parNom: function(nom) {
        if(banque.objets[nom] != null)
            return banque[nom];
        else
            return undifined;
    },

    obtenirMapType: function(callback) {
        banque.mapType(function(resultat){
            callback(resultat);
        });
    },

    obtenirMapRarete: function(callback) {
        banque.mapRarity(function(resultat){
            callback(resultat);
        });
    },
    
    initialiser: function(){
        aspirateur.start();
    }
}