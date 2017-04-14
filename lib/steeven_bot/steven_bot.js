	var fs = require('fs'),
		logger = require('../logger.js'),
		gw = require('../gw2SpidyRequete.js'),
		formateur = require('../formateur/constructeur.js'),
		fabrique = require('../fournisseur/fabriqueDemande.js'),
		fournisseur = require('../fournisseur/fournisseur.js'); //TODO: remove test requires


	try {
	    var Discord = require("discord.js");
	} catch (e) {
	    logger.log('error', e.stack);
	    logger.log('error', process.version);
	    logger.log('warn', "Verifer que 'npm install' ne provoque pas d'erreur.");
	    process.exit();
	}
	logger.log('info', "Demarrage de Steven.\nVersion de Node: " + process.version + "\nVersion de Discord.js: " + Discord.version);



	// Cherche les donnees d'authentification du bot (bot_token)
	try {
	    var AuthDetails = require("../config/auth.json");
	} catch (e) {
	    logger.log('error', "Fichier auth.json inexistant ou invalide, un champ bot_token est obligatoire.\n" + e.stack);
	    process.exit();
	}

	//Cherche config.json (peut etre vide/null)
	var Config = {};
	try {
	    Config = require("../config/config.json");
	} catch (e) { //pas de fichier -> valeurs par default
	    Config.debug = false;
	    Config.commandPrefix = '!';
	    try {
	        if (fs.lstatSync("../config/config.json").isFile()) {
	            logger.log('warn', "ATTENTION: config.json est impossible a lire!\n" + e.stack);
	        }
	    } catch (e2) {
	        fs.writeFile("../config/config.json", JSON.stringify(Config, null, 2));
	    }
	}
	if (!Config.hasOwnProperty("commandPrefix")) {
	    Config.commandPrefix = '!';
	}

	//Liste des commandes du bot --- ICI POUR AJOUTER DES COMMANDES
	var commands = {
	    "ping": {
	        description: "Fonction test, repond pong.",
	        process: function(bot, msg, suffix) {
	            msg.channel.sendMessage(msg.author + " pong!");
	            if (suffix) {
	                msg.channel.sendMessage("!ping ne prend pas d'arguments.");
	            }
	        }
	    },
	    "notifiez_moi": {
			description: "Notifier un utilisateur",
			process: function(bot, msg, suffix) {
				fabrique.construireUtilisateur(msg.author, suffix);
				msg.author.sendMessage( msg.author + "Vous etes bien inscrit à " + suffix);
				console.log(JSON.stringify(fournisseur.utilisateurs, null, 2));
				if(!suffix){
					msg.author.sendMessage( "!notifiez_moi doit avoir un argument.");
				}
			}
		},
	    "notifiez_canal": {
	        description: "Notifier sur un canal",
	        process: function(bot, msg, suffix) {
	            fournisseur.inscrire(msg.author, suffix);
	            msg.channel.sendMessage(msg.author + "Vous etes bien inscrit à " + suffix);
	            if (!suffix) {
	                msg.channel.sendMessage("!notifiez_canal doit avoir un argument.");
	            }
	        }
	    },
	    "meilleurs_offres": {
	        description: "Notifier un utilisateur avec les meilleurs offres",
	        process: function(bot, msg, suffix) {
	            fournisseur.inscrire(msg.author, suffix);
	            msg.author.sendMessage(msg.author + "Vous etes bien inscrit à " + suffix);
	            if (!suffix) {
	                msg.author.sendMessage("!meilleurs_offres doit avoir un argument.");
	            }
	        }
	    },
	    "lister": {
			description: "Liste les valeurs disponibles pour les types et les raretes",
			process: function(bot, msg, suffix) {
				if(!suffix){
					msg.author.sendMessage(JSON.stringify(gw.obtenirMapType(), null, 2) + '\n'
						+ JSON.stringify(gw.obtenirMapRarete(), null, 2));
				} else {
					msg.author.sendMessage( "!lister ne prends pas d'argument");
				}
			}
		}
	};

	//Commande extra pour cree des liens pour inviter le bot
	if (AuthDetails.hasOwnProperty("client_id")) {
	    commands["invite"] = {
	        description: "Genere un lien pour inviter Steven a un serveur.",
	        process: function(bot, msg, suffix) {
	            msg.channel.sendMessage("invite link: https://discordapp.com/oauth2/authorize?&client_id=" + AuthDetails.client_id + "&scope=bot&permissions=470019135");
	        }
	    }
	}

	var bot = new Discord.Client();

	bot.on("ready", function() {
	    logger.log('info', "En ligne! Disponible dans  " + bot.guilds.array().length + " serveur(s)");
	    logger.log('info', "Taper " + Config.commandPrefix + "aide sur Discord pour une liste des commandes");
	    bot.user.setGame("TEST");
	});

	bot.on("disconnected", function() {
	    logger.log('info', "hors ligne!");
	    process.exit(1);
	});

	function envoyerAide(msg) {
	    msg.author.sendMessage("**Commandes disponibles:**").then(function() {
	        var lot = "";
	        var cmbTrie = Object.keys(commands).sort();
	        for (var i in cmbTrie) {
	            var cmd = cmbTrie[i];
	            var info = "**" + Config.commandPrefix + cmd + "**";
	            var usage = commands[cmd].usage;
	            if (usage) {
	                info += " " + usage;
	            }
	            var description = commands[cmd].description;
	            if (description instanceof Function) {
	                description = description();
	            }
	            if (description) {
	                info += "\n\t" + description;
	            }
	            var lot2 = lot + "\n" + info;
	            if (lot2.length > (1024 - 8)) { //On limite la taille
	                msg.author.sendMessage(lot);
	                lot = info;
	            } else {
	                lot = lot2
	            }
	        }
	        if (lot.length > 0) {
	            msg.author.sendMessage(lot);
	        }
	    });
	}

	function verifierMessage(msg, isEdit) {
	    //verifie si le message est une commande
	    if (msg.author.id != bot.user.id && (msg.content.startsWith(Config.commandPrefix))) {
	        logger.log('info', "Traite " + msg.content + " de " + msg.author + " comme une commande");
	        var cmdTxt = msg.content.split(" ")[0].substring(Config.commandPrefix.length);
	        var suffix = msg.content.substring(cmdTxt.length + Config.commandPrefix.length + 1); //le +1 est pour le !
	        if (msg.isMentioned(bot.user)) {
	            try {
	                cmdTxt = msg.content.split(" ")[1];
	                suffix = msg.content.substring(bot.user.mention().length + cmdTxt.length + Config.commandPrefix.length + 1);
	            } catch (e) {
	                msg.channel.sendMessage("Yes?");
	                return;
	            }
	        }
	        var cmd = commands[cmdTxt];
	        if (cmdTxt === "aide") {
	            envoyerAide(msg);
	        } else if (cmd) {
	            try {
	                cmd.process(bot, msg, suffix, isEdit);
	            } catch (e) {
	                var msgTxt = "commande " + cmdTxt + " echouee :(";
	                if (Config.debug) {
	                    msgTxt += "\n" + e.stack;
	                }
	                msg.channel.sendMessage(msgTxt);
	            }
	        } else {
	            msg.channel.sendMessage("'" + cmdTxt + "' n'est pas une commande!").then((message => message.delete(5000)))
	        }
	    } else {
	        //si le message n'est pas une commande ou est un message du bot lui meme
	        //on ignore le message.
	        if (msg.author == bot.user) {
	            return;
	        }
	        if (msg.author != bot.user && msg.isMentioned(bot.user)) {
	            msg.channel.sendMessage(msg.author + ", besoin d'aide?");
	        }
	    }
	}


	bot.on("message", (msg) => verifierMessage(msg, false));
	bot.on("messageUpdate", (msgPre, msgNouv) => {
	    verifierMessage(msgNouv, true); //ici aucune commande ne support les edits mais je le garde au cas ou. A supprimer sinon.
	});


	if (AuthDetails.bot_token) {
	    logger.log('info', "Identification avec bot_token.");
	    bot.login(AuthDetails.bot_token);
	} else {
		logger.log('warn', "Le bot support seulement des identifications a partir d'un token Discord. (Discord interdit les comptes utilisateurs pour un bot)");
	}
