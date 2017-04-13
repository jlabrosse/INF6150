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
        return null;
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
            return null;
    },

    parNom: function(nom) {
        if(banque.objets[nom] != null)
            return banque.objets[nom];
        else
            return null;
    },

    obtenirMapType: function() {
        return banque.mapType();
    },

    obtenirMapRarete: function() {
        return banque.mapRarity();
    },
    
    initialiser: function(){
        aspirateur.start();
        banque.initialiserMap();
    }
}