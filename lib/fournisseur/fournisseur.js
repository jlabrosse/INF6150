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
    inscrireCanal: function(guild, canal, demande){
        if(canaux[guild] == null)
            canaux[guild] = {};
        if(canaux[guild][canal] == null)
            canaux[guild][canal] = [];

        canaux[guild][canal].push(demande);
    },
    desinscrireCanal: function(guild, canal){
        if(canaux[guild][canal] != null)
            delete canaux[guild][canal];
    },
    'utilisateurs': utilisateurs,   //TODO: remove from public
    'canaux': canaux                //TODO: remove from public
}