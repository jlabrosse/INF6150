module.exports = {
	tousLesObjets: function(callback){
		callback("tous"); //return de la fonction
	},
	
	parType: function(type, callback){
		callback(type); //return de la fonction
	},
	
	parRarete: function(rarete, callback){
		callback(rarete); //return de la fonction
	},

	obtenirObjet: function(nom, callback){
		callback(nom); //return de la fonction
	}
}