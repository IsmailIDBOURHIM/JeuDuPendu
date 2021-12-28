var mots = ["add", "lol"];


var clavier = ["a", "b", "c", "d", "e", "f", "g", "h",
 "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
 "t", "u", "v", "w", "x", "y", "z"];

// Methode pour ajouter le joueur au tableau des meilleurs joueurs
function ajoutJoueur(nom, nbrChances, temps, tableau) {
let personne = {
    name: nom,
    score: nbrChances,
    time: temps,
};

if (personne.name != "") {
    tableau.push(personne);
    tableau.sort(function (a, b) {
    if (a.score == b.score) return a.time - b.time;
    return a.score - b.score;
    });
}
//alert(JSON.stringify(tableau));
//console.log(tableau);
}

//méthodes pour créer la table des meilleurs joueurs
function creationTabMeilleurJoueurs() {
const ndiv = $("#tableau-joueur");
const table = $("<table><tr>");
let ntr = $("<tr>");
const tabTete = ["Rang", "Nom de joueur", "Nbr de pénalité", " Temps(secondes) "];
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
    $("tr:nth-child(" + (pos + 3) + ")>td:nth-child(2)").text(
    tableau[pos].name
    );
    $("tr:nth-child(" + (pos + 3) + ")>td:nth-child(3)").text(
    tableau[pos].score
    );
    $("tr:nth-child(" + (pos + 3) + ")>td:nth-child(4)").text(
    tableau[pos].time
    );
}
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