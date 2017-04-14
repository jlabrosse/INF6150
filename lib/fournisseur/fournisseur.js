var logger = require('../logger.js'),
    processeur = require('../processeur/processeur.js');

var utilisateurs = {};
var canaux = {};

processeur.emetteur.on('finDeProcesseur', function(){
    //
    //processeur.satisfaire(u);
});

module.exports = {
    inscrire: function(utilisateur, demande){
        if(utilisateurs[utilisateur] == null)
            utilisateurs[utilisateur] = [];

        utilisateurs[utilisateur].push(demande);
    },
    desinscrire: function(utilisateur, demande){
        if(utilisateurs[utilisateur][demande] != null)
            delete utilisateurs[utilisateur].indexOf(demande);
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
            delete canaux[canal].indexOf(demande);
    },
    desinscrireCanal: function(canal){
        if(canaux[canal] != null)
            delete canaux[canal];
    },
    'utilisateurs': utilisateurs,   //TODO: remove from public
    'canaux': canaux                //TODO: remove from public
}