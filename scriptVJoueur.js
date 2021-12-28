let startTime, motAleatoire, nbrDePenalite, nom, temps, lettre;
var lettreMotAleatoire, nbrLettreDeMot;
let tableauMeilleurJoueurs = new Array();
//Méthodes pour créer la table des meilleurs joueurs
creationTabMeilleurJoueurs();

//Méthode pour créer le clavier
creationCalvier();

//Afficher le support du Bonhomme et cacher le reste
let cachePendu = $('#tete, #corps, #brasG, #brasD, #jambeG, #jambeD')
cachePendu.hide();


function obtenirLesIndexes(monMot, maLettreSelec) {
  const tabIndex = [];
  for (let pos = 0; pos < monMot.length; pos++) {
    const element = monMot[pos];
    if (element == maLettreSelec) {
      tabIndex.push(pos);
    }
  }
  console.log("index [" + tabIndex + "]");
  return tabIndex;
}

function devinerLettre(tabIndexes) {
  if (tabIndexes.length == 0) {
    nbrDePenalite++;
    affichagePendu(nbrDePenalite);
    console.log("chances = " + nbrDePenalite);
  } else {
    for (let j = 0; j < tabIndexes.length; j++) {
      nbrLettreDeMot[tabIndexes[j]] = lettreMotAleatoire[tabIndexes[j]];
      lettreMotAleatoire[tabIndexes[j]] = "";
    }
    console.log(lettreMotAleatoire);
  }
}

function affichageMot(nbrLettreDeMot) {
  const tabAffichage = [];
  for (let index = 0; index < nbrLettreDeMot.length; index++) {
    const element = nbrLettreDeMot[index];
    if (element) {
      tabAffichage.push(element);
    } else {
      tabAffichage.push(" _ ");
    }
  }
  $("#motDeviner")
    .text(tabAffichage.join(""))
    .css({ "font-weight": "bold", "font-size": "24px" });
}

function resultatJeu() {
  if (nbrDePenalite == 6) {
    console.log("perdu");
    $("#message")
      .html(
        "Vous avez perdu ! Le mot à trouver était : " +
          "<span id='mot' style = 'color : black'>" +
          motAleatoire +
          "</span>"
      )
      .css("color", "red");
      $('.class-clavier').hide();
      $('#rejouer').show();
  }
  if (lettreMotAleatoire.every((element) => element == "")) {
    temps = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    console.log("temps = " + temps);
    $('.class-clavier').hide();
    $("#inname").attr("type", "text");
    $("#inname").show();
    console.log("gangné");
    $("#message").text("Vous avez gangné").css("color", "green");
    $("#nom-joueur").text("Entrez votre nom SVP");

    $("#inname").change(function () {
      nom = $("#inname").val();
      $("#inname").val("");
      $("#nom-joueur").text("");
      $("#inname").hide();
      ajoutJoueur(nom, nbrDePenalite, temps, tableauMeilleurJoueurs);
      //méthodes pour remplire la table des meilleurs joueurs
      remplissageTabJoueurs(tableauMeilleurJoueurs);
      $('#rejouer').show();
    });
  }
}
function lettresSelectionnees() {
  lettre = this.id.toUpperCase();
  $(this).prop('disabled', true).css({ "background": "black", "border": "1px solid #999999" });
  console.log("lettre : " + lettre);
  
  const tabIndexTemp = obtenirLesIndexes(lettreMotAleatoire, lettre);

  devinerLettre(tabIndexTemp);
  affichageMot(nbrLettreDeMot);
  resultatJeu();
}

function demarrerJeu(){
  startTime = new Date();
  
  motAleatoire = "ADD";
  //mots[Math.floor(Math.random() * mots.length)].toUpperCase();
  console.log("motAleatoire : " + motAleatoire);
  lettreMotAleatoire = motAleatoire.split("");
  console.log(lettreMotAleatoire);
  nbrLettreDeMot = new Array(motAleatoire.length);
  console.log(nbrLettreDeMot);
  affichageMot(nbrLettreDeMot);
  nbrDePenalite = 0;
  $("#message").text("");
  $('.class-clavier').show();
  $('.class-clavier').prop('disabled', false).css({ "background": "", "border": "" });
  $('.class-clavier').click(lettresSelectionnees);
}
demarrerJeu();

//rejouer
  // convertir noeud JQuery en noeud DOM
var rejouer = $('#rejouer').get(0);

rejouer.addEventListener("click", () => {
  $('#message').text("");
  startTime = new Date();
  cachePendu.hide();
  //vider les tableaux
  lettreMotAleatoire.splice(0);
  nbrLettreDeMot.splice(0);
  $('#rejouer').hide();
  //Supprimer les executions précédentes qui restent actives.
   $('#rejouer').off('click');
   $('.class-clavier').off('click');
  
  demarrerJeu();
  
});


