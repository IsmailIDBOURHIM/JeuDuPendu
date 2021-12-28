let motADeviner, penalite, debutTemps, tempsJeu;

// créer des tableaux
let tabLettreDeMot, tabLettresUtilisées, nbrDeLettresDeMot;
let tabMeilleursJoueurs = new Array();

//créer tableau des noms
var tabNom = ["Ordinateur_1", "Ordinateur_2", "Ordinateur_3", "Ordinateur_4",
 "Ordinateur_5", "Ordinateur_6", "Ordinateur_7", "Ordinateur_8", "Ordinateur_9"];
var nomOrdi = tabNom[Math.floor(Math.random() * tabNom.length)];

//Méthodes pour créer la table des meilleurs joueurs
creationTabMeilleurJoueurs();

//Afficher le support du Bonhomme et cacher le reste
let cachePendu = $('#tete, #corps, #brasG, #brasD, #jambeG, #jambeD')
cachePendu.hide();

function vérifierLettre(tabLettres) {
  //tirage d'une lettre aléatoirement
  const lettreAleatoire = clavier[Math.floor(Math.random() * clavier.length)].toUpperCase();
  console.log(lettreAleatoire);
  //supprimer les lettres en double
  if (tabLettresUtilisées.includes(lettreAleatoire)) {
    vérifierLettre(tabLettres);
  } else {
    tabLettresUtilisées.push(lettreAleatoire);
    //console.log("utilisees[ " +tabLettresUtilisées);

    for (let index = 0; index < tabLettres.length; index++) {
      if (lettreAleatoire == tabLettres[index]) {
        nbrDeLettresDeMot.splice(index, 1, lettreAleatoire);
      }
    }
    affichageMot(nbrDeLettresDeMot);
    console.log(nbrDeLettresDeMot);

    if (nbrDeLettresDeMot.indexOf(lettreAleatoire) == -1) {
      penalite++;
      affichagePendu(penalite);
      console.log("penalité = " + penalite);
    }
  }
}
//vérifierLettre(tabLettreDeMot);

function checkTabLettres() {
  for (let i = 0; i < nbrDeLettresDeMot.length; i++) {
    if (nbrDeLettresDeMot[i] != tabLettreDeMot[i]) 
      return false;
  }
  return true;
}

function devinerMot() {
  do {

    vérifierLettre(tabLettreDeMot);
    $("#lettresutilisee").text("Lettres Utilisées : "+tabLettresUtilisées.join(","))
    .css({ "font-weight": "bold", "font-size": "24px" });

  } while (checkTabLettres() == false && penalite != 6);

  if (checkTabLettres() == true) {
    //calculer le temps en Millesecondes 
    tempsJeu = Math.round((new Date().getTime() - debutTemps.getTime())/1000);
    console.log("temps = " + tempsJeu);
    console.log("vous avez gagné");
    $('#messageResultat').text("Vous avez gangné").css("color", "green");
    ajoutJoueur(nomOrdi, penalite, tempsJeu, tabMeilleursJoueurs);
    console.log(tabMeilleursJoueurs);
    //méthodes pour remplire la table des meilleurs joueurs
    remplissageTabJoueurs(tabMeilleursJoueurs);
    $('#inMot').hide();
    $('#rejouer').show();
  }

  if (penalite == 6) {
    console.log("vous avez perdu");
    $('#messageResultat')
      .html(
        "Vous avez perdu ! Le mot à trouver était : " +
          "<span id='mot' style = 'color : black'>" +
          motADeviner +
          "</span>"
      )
      .css("color", "red");
      $('.class-clavier').hide();
    $('#inMot').hide();
    $('#rejouer').show();
  }
}
//devinerMot();


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
  $("#affichage-mot").text(tabAffichage.join(" "))
    .css({ "font-weight": "bold", "font-size": "24px" });
}

//commencer la première partie
function demarrerJeu(){
  $('#inMot').change(function(even){
    motADeviner = $('#inMot').val().toUpperCase();
    $('#inMot').val("");
    debutTemps = new Date();
    console.log("mot : " +motADeviner);
    tabLettreDeMot = motADeviner.split("");
    nbrDeLettresDeMot = new Array(tabLettreDeMot.length);
    tabLettresUtilisées = [];
    penalite = 0;
    nomOrdi = tabNom[Math.floor(Math.random() * tabNom.length)];
    devinerMot();
    
  });
}
demarrerJeu();

//rejouer
document.addEventListener('click', () => {
  $('#messageResultat').text("");
  debutTemps = new Date();
  //vider les tableaux
  tabLettresUtilisées.splice(0);
  tabLettreDeMot.splice(0);
  nbrDeLettresDeMot.splice(0);
  $("#affichage-mot").text("");
  $("#lettresutilisee").text("Lettres Utilisées : ")
  .css({ "font-weight": "bold", "font-size": "24px" });
  $('#rejouer').hide();
  cachePendu.hide();
  //Supprimer les executions précédentes qui restent actives.
   $('#rejouer').off('click');
   $('#inMot').off('change');
  //démarrer un nouvelle partie
  $('#inMot').show();
  demarrerJeu();
  
});

