
function enGras(text){
    return ( "**" + text + "**");
}

// prend un int (total) et applique le format: _g _s _c 
function formatPrix(_prix){
  var prix = Math.abs(_prix);
  var prefixe = _prix < 0 ? " - *" : " *"; //* pour italique
  or = (prix / 10000) | 0;
  argent = ((prix % 10000) / 100) | 0;
  cuivre = prix % 100;
  return ( prefixe + or + "g " + argent + "s " + cuivre + "c*");
}

//liste des gabarits disponible au bot
module.exports = {

	formatPrix: function(prix){
		return enGras(formatPrix(prix));
	},

  inscrire: function(item){
    return( " est maintenant abonne a " + enGras(item) );
  },

  deinscrire: function(item){
    return( " n'est plus abonne a " + enGras(item) );
  },

  MAJ: function(item, prix){
    return ( enGras(item) + " est maintenant a: " + formatPrix(prix) );
  },

  // return = ... <item> est maintenant a: <prix> (<diff>)
  MAJavecDiff: function(item, ancienPrix, nouvPrix){
    var diff = ancienPrix - nouvPrix;
    var text = enGras(item) + " est maintenant a: " + formatPrix(nouvPrix);
    //add prefix +/-
    return ( text + " (" + formatPrix(diff) + ")" );
  },

  // return = ... <item> est maintenant a: <prix> avec une difference de <profit>
  MAJavecProfit: function(item, prix, profit){
    var text = enGras(item) + " est maintenant a: " + formatPrix(prix);
    return ( text + " avec une difference de " + formatPrix(profit) );
  },

  afficher: function(item, prix){
    return ( enGras(item) + " est disponible pour " + formatPrix(prix) );
  },

  afficherOffre: function(item, offre){
    return ( enGras(item) + " est offert a " + formatPrix(offre) );
  },

  afficherDemande: function(item, demande){
    return ( enGras(item) + " est rechercher pour " + formatPrix(demande) );
  },

  afficherProfit: function(item, profit){
    return ( enGras(item) + " propose un profit de " + formatPrix(profit) );
  },
  
  ajouterHeure: function(text, heure){
    return (text + "  [" + heure + "]");
  },

  //error msgs -item not found -invalid command 

  //cree une liste avec un titre (ou non) a partir d'une liste d'items (garde la structure de la banque)
  listerItems: function(titre, items){
    var liste = enGras(titre);
    for(var i in items){
      if(i){
        liste += "\n\t" + afficher(i, items[i].prix_offre_max);
      }
    }
    return liste;
  },

  //cree une liste avec un titre (ou non) a partir d'une liste d'items (garde la structure de la banque)
  //affiche les informations de l'item en details
  listerItemsDetail: function(titre, items){
    var liste = enGras(titre);
    for(var i in items){
      if(i){
        liste += "\n\t" + enGras(i) 
          + "\n\tprix demande: " + items[i].prix_demande_max 
          + "\n\tprix offre: " + items[i].prix_offre_max
          + "\n\tstock demande: " + items[i].stock_demande
          + "\n\tstock offre: " + items[i].stock_offre;
      }
    }
    return liste;
  }  
};


