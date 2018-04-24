var modele = {
};

// Le modele contient ici une seule classe : Partie
modele.Partie = function (nomJoueur) {
    // atributs 
    this.nomJoueur = nomJoueur;
    this.nbVictoires = 0;
    this.nbDefaites = 0;
    this.nbNuls = 0;
    // méthode
    this.nouveauCoup = function (coupJoueur) {
        var mainMachine = Math.floor(Math.random() * 3);
        if (mainMachine === coupJoueur) {
            this.nbNuls++;
            return {mainMachine : mainMachine, message : "Match Nul"};
        } else if ((coupJoueur === modele.Partie.CISEAU  && mainMachine === modele.Partie.FEUILLE) ||
                   (coupJoueur === modele.Partie.FEUILLE && mainMachine === modele.Partie.PIERRE)  ||
                   (coupJoueur === modele.Partie.PIERRE  && mainMachine === modele.Partie.CISEAU)) {
            this.nbVictoires++;
            return {mainMachine : mainMachine, message : "Victoire"};
        } else {
            this.nbDefaites++;
            return {mainMachine : mainMachine, message : "Défaite"};
        }
    };
};

// Constantes de Classe
modele.Partie.CISEAU = 0;
modele.Partie.FEUILLE = 1;
modele.Partie.PIERRE = 2;