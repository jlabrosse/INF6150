var logger = require('../logger.js'),
    banque = require('../aspirateur/banque.js');

//TODO: remplacer l'event de banque par un event dans processeur une fois que le code sera merged

var utilisateurs = {};
var canaux = {};

banque.emetteur.on('data', function(){

});

module.exports = {
    inscrire: function(utilisateur, demande){
        if(utilisateurs[utilisateur] == null)
            utilisateurs[utilisateur] = {};

        utilisateurs[utilisateur] = demande;
    },

    desinscrire: function(utilisateur, demande){
        if(utilisateurs[utilisateur][demande] != null)
            delete utilisateurs[utilisateur][demande];
    },
    desinscrire: function(utilisateur){
        if(utilisateurs[utilisateur] != null)
            delete utilisateurs[utilisateur];
    },
    inscrireCanal: function(canal, demande){
        if(canaux[canal] == null)
            canaux[canal] = {};

        canaux[canal] = demande;
    },
    desinscrireCanal: function(canal, demande){
        if(canaux[canal][demande] != null)
            delete canaux[canal][demande];
    },
    desinscrireCanal: function(canal){
        if(canaux[canal] != null)
            delete canaux[canal];
    }
}