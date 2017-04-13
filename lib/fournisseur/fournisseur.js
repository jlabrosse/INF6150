var logger = require('../logger.js'),
    processeur = require('../processeur/processeur.js');

//TODO: remplacer l'event de banque par un event dans processeur une fois que le code sera merged

var utilisateurs = {};
var canaux = {};

processeur.emetteur.on('finDeProcesseur', function(){
    //for(var u in utilisateurs)
    //    processeur.satisfaire(u);
});

module.exports = {
    inscrire: function(utilisateur, demande){
        if(utilisateurs[utilisateur] == null)
            utilisateurs[utilisateur] = [];

        utilisateurs[utilisateur].push(demande);
    },
    desinscrire: function(utilisateur, demande){
        if(utilisateurs[utilisateur][demande] != null)
            delete utilisateurs[utilisateur].indexOf(demande); //TODO: gerer l'index
    },
    desinscrire: function(utilisateur){
        if(utilisateurs[utilisateur] != null)
            delete utilisateurs[utilisateur];
    },
    inscrireCanal: function(canal, demande){
        if(canaux[canal] == null)
            canaux[canal] = [];

        canaux[canal].push(demande);
    },
    desinscrireCanal: function(canal, demande){
        if(canaux[canal][demande] != null)
            delete canaux[canal].indexOf(demande); //TODO: gerer l'index
    },
    desinscrireCanal: function(canal){
        if(canaux[canal] != null)
            delete canaux[canal];
    },
    'utilisateurs': utilisateurs,   //TODO: remove from public
    'canaux': canaux                //TODO: remove from public
}