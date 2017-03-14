var aspirateur = require("./aspirateur.js");

aspirateur.emetteur.on('donnees', function(donnees) {
	construireDonneesGW2(donnees);
});

function construireDonneesGW2(donnees) {
	console.log("Construction des donnees.");
	//
};