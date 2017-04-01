var logger = require("../logger.js"),
	gabarit = require("./gabarit.js"),
	gw2SpidyRequete = require("../gw2SpidyRequete.js");
	
function Factory() {

	this.creerMessage = function (type, item, data) {
	
		var message;
		
		// Verifier si l'objet existe
		// var objet = trouverItem("MONSTER ONLY Moa Unarmed Pet");
		// if(objet == null){
		// 	   message = new Erreur();
		// } else ...		
		if (type === "abonnementItem") {
			message = new AbonnementItem(item);
		} else if (type === "desabonnementItem") {
			message = new DesabonnementItem(item);
		} else if (type === "MAJ") {
			message = new MAJ(item, data);
		} else if(type === "MAJavecDiff"){
			message = new MAJavecDiff(item, data, data);
		} else if(type === "MAJavecProfit"){
			message = new MAJavecProfit(item, data, data);
		} else if(type === "afficher"){
			message = new Afficher(item, data);
		} else if(type === "afficherOffre"){
			message = new AfficherOffre(item, data);
		} else if(type === "afficherDemande"){
			message = new AfficherDemande(item, data);
		} else if(type === "afficherProfit"){
			message = new AfficherProfit(item, data);
		}
 
		message.type = type;
 
		message.ecrire = function () {
			return this.type + " => " + this.contenu;
		}
 
		return message;
	}
}

var Erreur = function() {
	this.contenu = "Commande erronee";
}
     
var AbonnementItem = function (item) {
	this.contenu = gabarit.inscrire(item);
};
 
var DesabonnementItem = function (item) {
	this.contenu = gabarit.deinscrire(item);
};
 
var MAJ = function (item, data) {
	this.contenu = gabarit.MAJ(item, data);
};

var MAJavecDiff = function (item, data, data){
	this.contenu = gabarit.MAJavecDiff(item, data, data);
};

var MAJavecProfit = function (item, data, data){
	this.contenu = gabarit.MAJavecProfit(item, data, data);
};

var Afficher = function (item, data){
	this.contenu = gabarit.afficher(item, data);
};

var AfficherOffre = function (item, data){
	this.contenu = gabarit.afficherOffre(item, data);
};

var AfficherDemande = function (item, data){
	this.contenu = gabarit.afficherDemande(item, data);
};

var AfficherProfit = function (item, data){
	this.contenu = gabarit.afficherProfit(item, data);
};

function trouverItem(nomItem) {
	// Recherche de l'item dans la banque
	var item;
	return item;
}

function creerMessageTest(item, data) {

	var messages = [];
	var factory = new Factory();

	logger.log('silly', typeof gw2SpidyRequete.tousLesObjets);
	
	// messages.push(factory.creerMessage("abonnementItem", "nomItemErroneTest"));
	messages.push(factory.creerMessage("abonnementItem", item));
	messages.push(factory.creerMessage("desabonnementItem", item));
	messages.push(factory.creerMessage("MAJ", item, data));
	messages.push(factory.creerMessage("MAJavecDiff", item, data, data));
	messages.push(factory.creerMessage("MAJavecProfit", item, data, data));
	messages.push(factory.creerMessage("afficher", item, data));
	messages.push(factory.creerMessage("afficherOffre", item, data));
	messages.push(factory.creerMessage("afficherDemande", item, data));
	messages.push(factory.creerMessage("afficherProfit", item, data));
	
	for (var i = 0, len = messages.length; i < len; i++) {
		logger.log('silly', messages[i].ecrire());
	}   
}

module.exports = {
    test: function(item, data) {
		creerMessageTest(item, data);
    }
}