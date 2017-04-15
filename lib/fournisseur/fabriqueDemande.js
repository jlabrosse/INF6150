var gw2Requete = require('../gw2SpidyRequete.js'),
    fournisseur = require('./fournisseur.js');

// CONFIG #########################
var prix = 'prix';
var type = 'type';
var rarete = 'rarete';
var nom = 'nom';
//#################################

function deployer(chaine){
    var champs = chaine.split(' ');

    if(!isNaN(champs[0]) && !isNaN(champs[1])) {
        return deployerPrix(champs);
    } else if(gw2Requete.parType(champs[0]) != null){
        return deployerType(champs);
    } else if(gw2Requete.parRarete(champs[0]) != null){
        return deployerRarete(champs);
    } else {
        return deployerNom(champs);
    }
}

function deployerPrix(champs){
    var demande = {};
    demande[prix] = {};
    demande[prix]['min'] = champs[0];
    demande[prix]['max'] = champs[1];
    return demande;
}

function deployerType(champs){
    var demande = {};
    demande[type] = champs[0];
    return demande;
}

function deployerRarete(champs){
    var demande = {};
    demande[rarete] = champs[0];
    return demande;
}

function deployerNom(champs){
    var chaine = champs.join(' ');
    var demande = {};
    demande[nom] = chaine;
    return demande;
}

function deployerOffres(champs) {
    var demande = {};
    demande[meilleurs_offres] = meilleurs_offres;
    return demande; 
}

module.exports = {
    construireUtilisateur: function(utilisateur, chaine){
        fournisseur.inscrire(utilisateur, deployer(chaine));
    },
    construireCanal: function(guild, canal, chaine){
        fournisseur.inscrireCanal(guild, canal, deployer(chaine));
    },
    construireSurveillance: function(canal){
        fournisseur.inscrireSurveillance(canal);
    }
}