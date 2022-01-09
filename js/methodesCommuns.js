var clavier = ["A", "B", "C", "D", "E", "F", "G", "H",
 "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
 "T", "U", "V", "W", "X", "Y", "Z"];

// Methode pour ajouter le joueur au tableau des meilleurs joueurs
function ajoutJoueur(nom, nbrChances, temps, tableau) {
    let personne = {
        name: nom,
        score: nbrChances,
        time: temps,
    }
    if (personne.name != "") {
        tableau.push(personne);
        tableau.sort(function (a, b) {
            if (a.score == b.score) return a.time - b.time;
            return a.score - b.score;
        });  
    }
    //Supprimer les joueurs qui ne font pas partie des dix premiers
    if (tableau.length > 10)
        tableau.pop();
}

//méthodes pour créer la table des meilleurs joueurs
function creationTabMeilleurJoueurs() {
    const ndiv = $("#tableau-joueur");
    const table = $("<table><tr>");
    let ntr = $("<tr>");
    const tabTete = ["Rang", "Nom de joueur", "Nbr de pénalité", " Temps (secondes) "];
    tabTete.forEach((element) => {
    ntr.append($("<td>").text(element));
    });
    ndiv.append(table.append(ntr));
    for (let index = 0; index < 10; index++) {
        ntr = $("<tr>");
        ntr.attr("id", index);
        let ntd1 = $("<td>")
        .text(index + 1)
        .css("font-weight", "bold");
        ntr.append(ntd1);
        for (let j = 1; j < 4; j++) {
        let ntd2 = $("<td>").text("..");
        ntr.append(ntd2);
        }
        table.append(ntr);
    }
    ndiv.append(table);
}

//méthodes pour remplire la table des meilleurs joueurs
function remplissageTabJoueurs(tableau) {
    for (let pos = 0; pos < tableau.length; pos++) {
        $("tr:nth-child(" + (pos + 3) + ")>td:nth-child(2)").text(tableau[pos].name);
        $("tr:nth-child(" + (pos + 3) + ")>td:nth-child(3)").text(tableau[pos].score);
        $("tr:nth-child(" + (pos + 3) + ")>td:nth-child(4)").text(tableau[pos].time );
    }
    //pour stocker les resultats dans localStrogae*
    //initStorage(tableau);
// autre méthode de remplissage
/*$('#'+pos).html('<td>'+(pos+1)+'</td><td>'+tableau[pos].name+'</td><td>'
+tableau[pos].score+'</td><td>'+ tableau[pos].time+'</td>');*/
}

//Méthode pour afficher le Bonhomme Pendu
function affichagePendu(nbrPenalite) {
    const tabPendu = [".support", "#tete", "#corps", "#brasG", "#brasD", "#jambeG", "#jambeD"];
    if (nbrPenalite == 1) {
        $('#tete').show();    
    }
    if (nbrPenalite == 2) {
        $('#tete, #corps').show();    
    }
    if (nbrPenalite == 3) {
        $('#tete, #corps, #brasG').show();   
    }
    if (nbrPenalite == 4) {
        $('#tete, #corps, #brasG, #brasD').show(); 
    }
    if (nbrPenalite == 5) {
        $('#tete, #corps, #brasG, #brasD, #jambeG').show();
    }
    if (nbrPenalite == 6) {
        $('#tete, #corps, #brasG, #brasD, #jambeG, #jambeD').show();
    }
}

//Méthode pour créer le clavier
function creationCalvier() {
    let divClav = $("#clavier");
    for (let index = 0; index < clavier.length; index++) {
      let btn = $("<button>").text(clavier[index]);
      btn.attr("id", clavier[index]);
      btn.attr("class", "class-clavier");
      divClav.append(btn);
    }
}

// méthode our initialiser local storage
// function initStorage (tabPersonne) {
//     localStorage.setItem('personne', JSON.stringify(tabPersonne));
   
// }
// //local storage
// function chargementStorage() {
//     let tableauStorage =[];
//     console.log("storageTab1 ["+tableauStorage+"]");
//     if (localStorage['personne']){
//         tableauStorage = JSON.parse(localStorage.getItem('personne'));
//         if (this.href == initStorage.href ){
//             remplissageTabJoueurs(tableauStorage);
//         }
//     }
//     console.log("storageTab3 ["+tableauStorage+"]");
//     return tableauStorage;
    
// }

//dictionnaire
var mots = ["Col", "Gaz", "Ski", "Car", "Axe", "Beau", "Chez", "Faux", "Long", "Lune", "Loin", "Test",
    "Assez", "Pendu", "Barbe", "Avion", "Aimer", "Cache", "Essai", "Maman", "Pomme", "Poste", "Radar",
    "Tenue", "Texte", "Jambe", "Chien", "Alarme", "Billet", "Gramme", "Trousse", "Batterie", "Logiciel",
    "Parcours", "Question", "Toujours", "Ascenseur", "Graphique", "Populaire", "Printemps", "Vestiaire", 
    "Attraction", "Abandonner", "Accompagner", "Apercevoir", "Approcher", "Appendre", "Alesser", "Commencer", 
    "Desservir", "Fonctionner", "Interrompre", "Mentionner", "Officier", "Prononcer", "Ronronner", "Visionner", 
    "Impossible", "Sorcellerie", "Qualification", "Francophile", "abandonnement", "Arrondissement", "actualisation", 
    "Accessoiriste", "Certification", "Encouragement", "Grossissement", "Psychologique", "Programmation", "Rectangulaire", 
    "Suggestionner", "Traditionnelle", "Vulgarisation"];