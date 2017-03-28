

function enGras(text){
    return ( "**" + text + "**");
}
//GWspiddy a deja un format de prix? 
function formatPrix(or, argent, cuivre){
  return ( or + "g " + argent + "s " + cuivre + "c" )
}

//liste des gabarits disponible au bot
module.exports = {

  inscrire: function(item){
    //return( " est maintenant abonne a " + item );
    return ( " is now following " + item );
  },

  deinscrire: function(item){
    //return( " n'est plus abonne a " + item );
    return ( " is no longer following " + item );
  },

  MAJ: function(item, prix){
    return ( item + " est maintenant a: " + prix);
  },

  //not tested -> no format for prices
  MAJavecDiff: function(item, ancienPrix, nouvPrix){
    var diff = ancienPrix - nouvPrix;
    var text = MAJ(item, prix);
    return ( text + " (" + diff + ")" );
  },

  affiche: function(item, prix){
    return ( item + " est disponible pour " + prix);
  },

  ajouteHeure: function(text, heure){
    return (text + "  [" + heure + "]");
  },

  //not tested -> no format for items set
  listeItems: function(items){
    var liste = "";
    for(var item in items){
        liste += item + "\n";
    }
    return liste;
  }
};


