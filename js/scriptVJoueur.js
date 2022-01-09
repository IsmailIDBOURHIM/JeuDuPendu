let startTime, motAleatoire, nbrDePenalite, nom, temps, lettre;
var lettreMotAleatoire, nbrLettreDeMot;
let tableauMeilleurJoueurs = []; 

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
  return tabIndex;
}

function devinerLettre(tabIndexes) {
  if (tabIndexes.length == 0) {
    nbrDePenalite++;
    affichagePendu(nbrDePenalite);
  } else {
    for (let j = 0; j < tabIndexes.length; j++) {
      nbrLettreDeMot[tabIndexes[j]] = lettreMotAleatoire[tabIndexes[j]];
      lettreMotAleatoire[tabIndexes[j]] = "";
    }
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
  $("#motDeviner").text(tabAffichage.join(" "));
    
}

function resultatJeu() {
  if (nbrDePenalite == 6) {
    $('audio#audio-perdre')[0].play();
    $("#message")
      .html(
        "Vous avez perdu ! Le mot à trouver était : " +
          "<span id='mot' style = 'color : black'>" +motAleatoire +
          "</span>").css("color", "red");
    $('.class-clavier').hide();
    $('#changerMot').hide();
    $('#rejouer').show();
    $('#dessin-bonhomme').hide();
    $('#lose').show();
  }
  if (lettreMotAleatoire.every((element) => element == "")) {
    temps = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    $('audio#audio-gagner')[0].play();
    $('.class-clavier').hide();
    $('#changerMot').hide();
    $("#inname").attr("type", "text");
    $("#inname").show();
    $("#message").text("Vous avez gagné").css("color", "green");
    $("#nom-joueur").text("Entrez votre nom SVP");
    $("#inname").change(function () {
      $('#dessin-bonhomme').hide();
      $('#win').show();
      nom = $("#inname").val();
      $("#inname").val("");
      $("#nom-joueur").text("");
      $("#inname").hide();
      $("#message").text("");
      ajoutJoueur(nom, nbrDePenalite, temps, tableauMeilleurJoueurs);
      localStorage.setItem('personne', JSON.stringify(tableauMeilleurJoueurs));
      //méthodes pour remplire la table des meilleurs joueurs
      remplissageTabJoueurs(tableauMeilleurJoueurs);
      $('#rejouer').show();
    });
  }
}

function lettresSelectionnees() {
  lettre = this.id;
  $(this).prop('disabled', true);
  
  const tabIndexTemp = obtenirLesIndexes(lettreMotAleatoire, lettre);

  devinerLettre(tabIndexTemp);
  affichageMot(nbrLettreDeMot);
  resultatJeu();
}

function demarrerJeu(){
  startTime = new Date();
  motAleatoire = mots[Math.floor(Math.random() * mots.length)].toUpperCase();
  lettreMotAleatoire = motAleatoire.split("");
  nbrLettreDeMot = new Array(motAleatoire.length);
  affichageMot(nbrLettreDeMot);
  nbrDePenalite = 0;
  
  $("#message").text("");
  $('.class-clavier').show();
  $('#changerMot').show();
  $('.class-clavier').prop('disabled', false);
  $('.class-clavier').click(lettresSelectionnees);
}
demarrerJeu();

//rejouer
  // convertir noeud JQuery en noeud DOM
var rejouer = $('#rejouer').get(0);
rejouer.addEventListener("click", () => {
  $('.win_lose').hide();
  $('#dessin-bonhomme').show();
  $('#message').text("");
  startTime = new Date();
  cachePendu.hide();
  $('#rejouer').hide();
  
  //Supprimer les executions précédentes qui restent actives.
   $('#rejouer').off('click');
   $('.class-clavier').off('click');
  
  demarrerJeu();
  
});

//Methode pour changer le mot
$('#changerMot').click( () => {
  lettreMotAleatoire.splice(0);
  nbrLettreDeMot.splice(0);
  //Supprimer les executions précédentes qui restent actives.
  $('#rejouer').off('click');
  $('.class-clavier').off('click');
  cachePendu.hide();
  demarrerJeu();
});

//afficher le Storage
// tableauMeilleurJoueurs = chargementStorage();

// $( document ).ready(function() {
$( () => {
  if (localStorage['personne']){
    tableauMeilleurJoueurs = JSON.parse(localStorage.getItem('personne'));
    remplissageTabJoueurs(tableauMeilleurJoueurs); 
  }    
});