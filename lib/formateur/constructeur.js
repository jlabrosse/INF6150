var banque = require("../aspirateur/banque.js"),
	logger = require("../logger.js"),
	gabarit = require("./gabarit.js");
	
function Factory() {

	this.creerMessage = function (type, user, item, data) {
	
		var message;
 
		if (type === "abonnementItem") {
			message = new AbonnementItem(user, item);
		} else if (type === "desabonnementItem") {
			message = new DesabonnementItem(user, item);
		} else if (type === "MAJ") {
			message = new MAJ(user, item, data);
		} 
 
		message.type = type;
 
		message.ecrire = function () {
			return this.type + " => " + this.contenu;
		}
 
		return message;
	}
}
     
var AbonnementItem = function (user, item) {
	this.contenu = user + gabarit.inscrire(item);
};
 
var DesabonnementItem = function (user, item) {
	this.contenu = user + gabarit.deinscrire(item);
};
 
var MAJ = function (item, data) {
	this.contenu = gabarit.MAJ(item, data);
};

function creerMessageTest(user, item, data) {

	var messages = [];
	var factory = new Factory();
 
	messages.push(factory.creerMessage("abonnementItem", user, item));
	messages.push(factory.creerMessage("desabonnementItem", user, item));
	messages.push(factory.creerMessage("MAJ", item, data));
	
	for (var i = 0, len = messages.length; i < len; i++) {
		logger.log('silly', messages[i].ecrire());
	}   
}

module.exports = {
    test: function(user, item, data) {
		creerMessageTest(user, item, data);
    }
}