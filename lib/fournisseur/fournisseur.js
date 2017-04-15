var logger = require('../logger.js'),
    processeur = require('../processeur/processeur.js'),
    formateur = require('../formateur/constructeur.js').factory(),
    bot = require('../steeven_bot/steven_bot.js');

var utilisateurs = {};
var canaux = {};
var surveillance = '';

function produireMessageUtilisateur(){
    var messages = {};

    for(var u in utilisateurs){
        messages[u] = [];
        
        var resultat = processeur.satisfaire(utilisateurs[u]);
        for(var i = 0; i < resultat.length; i++){
            for(var item in resultat[i]){
                messages[u].push(formateur.creerMessage("afficherOffre", item).ecrire());
            }
        }
    }

    return messages;
}

function produireMessageCanaux(){
    var messages = {};

    for(var guild in canaux){
        messages[guild] = {};
        for(var canal in canaux[guild]){
            messages[guild][canal] = [];

            var resultat = processeur.satisfaire(canaux[guild][canal]);

            for(var i = 0; i < resultat.length; i++){
                for(var item in resultat[i])
                    messages[guild][canal].push(formateur.creerMessage("afficherOffre", item).ecrire());
            }
        }
    }

    return messages;
}

processeur.emetteur.on('finDeProcesseur', function(){
    var messagesU = produireMessageUtilisateur();
    var messagesC = produireMessageCanaux();

    for(var u in messagesU){
        for(var i = 0; i < messagesU[u].length; i++){
            logger.log('info', 'envoie de \"' + messagesU[u][i] +'\" a '+ u);
            bot.envoyerMessagePerso(u, messagesU[u][i]);
        }
    }
    
    for(var guild in messagesC){
        for(var canal in messagesC[guild]){
            for(var i = 0; i < messagesC[guild][canal].length; i++){
                logger.log('info', 'envoie de \"' + messagesC[guild][canal][i] + '\" sur ' + canal);
                bot.envoyerMessageChannel("", canal, messagesC[guild][canal][i]);    
            }
        }
    }
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
    inscrireSurveillance: function(canal){
        surveillance = canal;
    }
}