var controleur = {
};

////////////////////////////////////////////////////////////////////////////////
// Session : variables qui représentent l'état de l'application
////////////////////////////////////////////////////////////////////////////////

controleur.session = {
    partieEnCours: null, // La partie en train d'être jouée
};

////////////////////////////////////////////////////////////////////////////////
// initialise : exécuté au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

controleur.initialise = function () {
    // On duplique Header et Footer sur chaque page (sauf la première !)
    $('div[data-role="page"]').each(function (i) {
        if (i)
            $(this).html($('#shifumiHeader').html() + $(this).html() + $('#shifumiFooter').html());
    });
    // On afficher la page d'accueil
    $.mobile.changePage("#vueAccueil");
};

////////////////////////////////////////////////////////////////////////////////
// Controleurs de pages : 1 contrôleur par page, qui porte le nom de la page
//  et contient les callbacks des événements associés à cette page
////////////////////////////////////////////////////////////////////////////////

controleur.vueAccueil = {
    initialise: function () {
        $("#nomJoueur").val("");
    },

    nouvellePartie: function () {
        // on récupère de l'information de la vue en cours
        var nomJoueur = $("#nomJoueur").val();
        if (nomJoueur === "") {
            alert("Entrez un nom de joueur svp");
        } else {
            // On utilise le modèle pour créer une nouvelle partie
            controleur.session.partieEnCours = new modele.Partie(nomJoueur); // on crée une entité
            // On "propage" le nom du joueur sur toutes les vues
            $('span[data-role="nomJoueur"]').each(function () {
                $(this).html(nomJoueur);
            });
            // Et on passe à une autre vue
            $.mobile.changePage("#vueJeu");
        }
    }
};
// On définit ici la callback exécutée au chargement de la vue Accueil
$(document).on("pagebeforeshow", "#vueAccueil", function () {
    controleur.vueAccueil.initialise();
});

////////////////////////////////////////////////////////////////////////////////
controleur.vueJeu = {

    initialise: function () {
        // on active et on montre tous les boutons du joueur
        $("button[id^=joueur]").prop('disabled', false).show();
        // on cache toutes les réponses de la machine
        $("img[id^=machine]").hide();
        // on cacne la dic resultat
        $("#resultat").hide();
    },

    jouer: function (coupJoueur) {
        // on interroge le modèle pour voir me résultat du nouveau coup
        var resultat = controleur.session.partieEnCours.nouveauCoup(coupJoueur);
        // on désactive le bouton cliqué et on cache les autres boutons
        if (coupJoueur === modele.Partie.CISEAU) {
            $("#joueurCiseau").prop('disabled', true);
            $("#joueurFeuille").hide(); $("#joueurPierre").hide();
        } else if (coupJoueur === modele.Partie.FEUILLE) {
            $("#joueurFeuille").prop('disabled', true);
            $("#joueurCiseau").hide(); $("#joueurPierre").hide();
        } else {
            $("#joueurPierre").prop('disabled', true);
            $("#joueurCiseau").hide(); $("#joueurFeuille").hide();
        }
        // on affiche le coup joué par la machine
        if (resultat.mainMachine === modele.Partie.CISEAU) {
            $("#machineCiseau").show();
        } else if (resultat.mainMachine === modele.Partie.FEUILLE) {
            $("#machineFeuille").show();
        } else {
            $("#machinePierre").show();
        }
        // on affiche le résultat
        var couleur=resultat.message==="Victoire"?"green":(resultat.message==="Défaite"?"red":"orange");
        $("#texteResultat").html(resultat.message).css("color",couleur);
        $("#resultat").show();
    },

    nouveauCoup: function () {
        controleur.vueJeu.initialise();
    },

    finPartie: function () {
        $.mobile.changePage("#vueFin");
    }
};

// On définit ici la callback exécutée au chargement de la vue Jeu
$(document).on("pagebeforeshow", "#vueJeu", function () {
    controleur.vueJeu.initialise();
});

////////////////////////////////////////////////////////////////////////////////
controleur.vueFin = {
    initialise: function () {
        $("#nbVictoires").html(controleur.session.partieEnCours.nbVictoires);
        $("#nbNuls").html(controleur.session.partieEnCours.nbNuls);
        $("#nbDefaites").html(controleur.session.partieEnCours.nbDefaites);
    },

    retourJeu: function () {
        $.mobile.changePage("#vueJeu");
    },

    retourAccueil: function () {
        $.mobile.changePage("#vueAccueil");
    }
};

// On définit ici la callback exécutée au chargement de la vue Fin
$(document).on("pagebeforeshow", "#vueFin", function () {
    controleur.vueFin.initialise();
});