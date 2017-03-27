//liste des gabarits disponible au bot
module.exports = {

  inscrire: function(item){
    return ( " is now following " + item );
  },

  deinscrire: function(item){
    return ( " is no longer following " + item );
  },

  MAJ: function(item, prix){
    return ( item + " est maintenant a: " + prix);
  },

  //not tested -> no format for prices
  MAJavecAncien: function(item, ancienPrix, nouvPrix){
    var diff = ancienPrix - nouvPrix;
    var text = MAJ(item, prix);
    return ( text + " (" + diff + ")" );
  },

  affiche: function(item, prix){
    return ( item + " est disponible pour " + prix);
  },

  //not tested -> no format for items set
  listeItems: function(items){
    var liste = "";
    for(var item in items){
        liste += item + "\n";
    }
    return liste;
  },

  //GWspiddy a deja un format de prix? 
  formatPrix: function(or, argent, cuivre){
    return ( or + "g " + argent + "s " + cuivre + "c" )
  }
};


