var logger = require("../logger.js"),
	gabarit = require("./gabarit.js"),
	gw2SpidyRequete = require('../gw2SpidyRequete.js')
	processeur = require('../processeur/processeur.js');
	
function Factory() {

	this.creerMessage = function (type, nomItem) {
	
		var message;
		var item = gw2SpidyRequete.tousLesObjets()[nomItem];
		
		if(type == "meilleursProfits"){
			message = new MeilleursProfits();
		}else if(item == null) {
			message = new Erreur();
		} else if (type === "abonnementItem") {
			message = new Abonnementitem(nomItem, item);
		} else if (type === "desabonnementItem") {
			message = new Desabonnementitem(nomItem, item);
		} else if (type === "MAJ") {
			message = new MAJ(nomItem, item);
		} else if(type === "MAJavecDiff"){
			message = new MAJavecDiff(nomItem, item);
		} else if(type === "MAJavecProfit"){
			message = new MAJavecProfit(nomItem, item);
		} else if(type === "afficher"){
			message = new Afficher(nomItem, item);
		} else if(type === "afficherOffre"){
			message = new AfficherOffre(nomItem, item);
		} else if(type === "afficherDemande"){
			message = new AfficherDemande(nomItem, item);
		} else if(type === "afficherProfit"){
			message = new AfficherProfit(nomItem, item);
		}
 
		message.type = type;
 
		message.ecrire = function () {
			return this.contenu;
		}
 
		return message;
	}
}

var Erreur = function() {
	this.contenu = "Commande erronee";
}
     
var Abonnementitem = function (nomItem, item) {
	this.contenu = gabarit.inscrire(nomItem);
};
 
var Desabonnementitem = function (nomItem, item) {
	this.contenu = gabarit.deinscrire(nomItem);
};
 
var MAJ = function (nomItem, item) {
	this.contenu = gabarit.MAJ(nomItem, item['offre_prix_heure']);
};

var MAJavecDiff = function (nomItem, item){
	this.contenu = gabarit.MAJavecDiff(nomItem, item['offre_prix_heure'], item['offre_prix_heure']);
};

var MAJavecProfit = function (nomItem, item){
	this.contenu = gabarit.MAJavecProfit(nomItem, item['offre_prix_heure'], item['offre_prix_heure']);
};

var Afficher = function (nomItem, item){
	this.contenu = gabarit.afficher(nomItem, item['offre_prix_heure']);
};

var AfficherOffre = function (nomItem, item){
	this.contenu = gabarit.afficherOffre(nomItem, item['prix_offre_max']);
};

var AfficherDemande = function (nomItem, item){
	this.contenu = gabarit.afficherDemande(nomItem, item['demande_prix_heure']);
};

var AfficherProfit = function (nomItem, item){
	this.contenu = gabarit.afficherProfit(nomItem, item['demande_prix_heure']);
};

var MeilleursProfits = function(){
	var tab = processeur.meilleursProfits(10);
	var reponse = '\n';
	for (var i = 0; i < 10; i++) {
		var item = tab[i];
		reponse += 
				item[0]
				+ ' -> '
				+ gabarit.formatPrix(item[1])
				+ '\n' ;
	}
	this.contenu = reponse;
};

function creerMessageTest(nomItem, item) {

	var messages = [];
	var factory = new Factory();

	messages.push(factory.creerMessage("abonnementItem", nomItem));
	messages.push(factory.creerMessage("desabonnementItem", nomItem));
	messages.push(factory.creerMessage("MAJ", nomItem));
	messages.push(factory.creerMessage("MAJavecDiff", nomItem));
	messages.push(factory.creerMessage("MAJavecProfit", nomItem));
	messages.push(factory.creerMessage("afficher", nomItem));
	messages.push(factory.creerMessage("afficherOffre", nomItem));
	messages.push(factory.creerMessage("afficherDemande", nomItem));
	messages.push(factory.creerMessage("afficherProfit", nomItem));
	
	for (var i = 0, len = messages.length; i < len; i++) {
		logger.log('silly', messages[i].ecrire());
	}   
}

module.exports = {
    test: function(nomItem, item) {
		creerMessageTest(nomItem, item);
    },
	factory: function(){
		return new Factory();
	}
}