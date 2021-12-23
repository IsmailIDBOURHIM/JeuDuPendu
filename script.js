let startTime, motAleatoire, nbrChances, nom, temps;
var lettresutilisees, lettreMotAleatoire, nbrLettreDeMot; 
let tableauMeilleurJoueurs = new Array();


function ajoutJoueur(nom, nbrChances, temps) {
  let personne = {
    name : nom,
    score : nbrChances,
    time : temps
  }
  
  if (personne.name != "") {
    tableauMeilleurJoueurs.push(personne);
    tableauMeilleurJoueurs.sort(function (a, b) {
      if (a.score == b.score) return a.time - b.time;
      return b.score - a.score;
    });
  } 
  //alert(JSON.stringify(tableauMeilleurJoueurs));
  console.log(tableauMeilleurJoueurs);
}

function obtenirLesIndexes(monMot, maLettreSelec) {
  const tabIndex = [];
  for (let pos = 0; pos < monMot.length; pos++) {
    const element = monMot[pos];
    if (element == maLettreSelec) {
      tabIndex.push(pos);
    }
  }
  console.log("index [" + tabIndex+"]");
  return tabIndex;
}

function motDeviner(nbrLettreDeMot) {
  const tabAffichage = [];
  for (let index = 0; index < nbrLettreDeMot.length; index++) {
    const element = nbrLettreDeMot[index];
    if (element) {
      tabAffichage.push(element);
    } else {
      tabAffichage.push(" _ ");
    }
  }
  $("#motDeviner").text(tabAffichage.join(""))
    .css({ "font-weight": "bold", "font-size": "24px" });
}

function lettresSelectionnees() {
  if ( $("#lettreSelectionnee").val() == "" || $("#lettreSelectionnee").val() == " " || lettresutilisees.includes($("#lettreSelectionnee").val())) {
    $("#lettreSelectionnee").val("");
  } 
  else {
    let lettre = $("#lettreSelectionnee").val();
    $("#lettreSelectionnee").val("");
    lettresutilisees.push(lettre);
    $("#lettreUtilisee").text("Lettre utilisées : " + lettresutilisees)
      .css({ "font-weight": "bold", "font-size": "24px" });
    console.log("utilis["+lettresutilisees+"]");
    const tabIndexTemp = obtenirLesIndexes(lettreMotAleatoire, lettre);
    if (tabIndexTemp.length == 0) {
      nbrChances--;
      console.log("chances = " + nbrChances);
    } else {
      for (let j = 0; j < tabIndexTemp.length; j++) {
        nbrLettreDeMot[tabIndexTemp[j]] = lettreMotAleatoire[tabIndexTemp[j]];
        lettreMotAleatoire[tabIndexTemp[j]] = "";
      }
      console.log(lettreMotAleatoire);
    }
    motDeviner(nbrLettreDeMot);
    if (nbrChances == 0) {
      console.log("perdu");
      $("#message").html("Vous avez perdu ! Le mot à trouver était : " +"<span id='mot' style = 'color : black'>"+motAleatoire+"</span>").css("color", "red");
      $("#lettreSelectionnee").prop('disabled', true);
    }
    if (lettreMotAleatoire.every(function (lettreMotAleatoire) {
        for (let i = 0; i < lettreMotAleatoire.length; i++) {
          if (lettreMotAleatoire[i] != "") {
            return false;
          }
        }
        return true;
      })
    ) {
   
      temps = Math.round((new Date().getTime() - startTime.getTime())/1000);
      console.log("temps1 = " +temps);
      console.log("gangné");
      $("#message").text("Vous avez gangné").css("color", "green");
      $("#nom-joueur").text("Entrez votre nom SVP");
      //$("#inname").attr("type", "text");
      $("#inname").change(function(){
        nom = $("#inname").val();
        $("#inname").val("");
        $("#message").text("");
        $("#nom-joueur").text("");
        //$("#inname").hide();
        ajoutJoueur(nom, nbrChances, temps);
        remplissageTabJoueurs();
      }); 
      
     // 
      console.log("temps3 = " +temps);
    }
  }
}

$('#debut-jeu').click(function(){
  startTime = new Date();
  motAleatoire = Mots[Math.floor(Math.random() * Mots.length)];
  console.log("motAleatoire : " +motAleatoire);
  lettreMotAleatoire = motAleatoire.split("");
  console.log(lettreMotAleatoire);
  nbrLettreDeMot = new Array(motAleatoire.length);
  console.log(nbrLettreDeMot);
  lettresutilisees = [];
  motDeviner(nbrLettreDeMot);
  $("#lettreUtilisee").text("Lettre utilisées : " + lettresutilisees)
    .css({ "font-weight": "bold", "font-size": "24px" });
  nbrChances = 2;
  $('#lettreSelectionnee').change(lettresSelectionnees);
});

function creationTabMeilleurJoueurs(){
  const ndiv = $('#tableau-joueur');
  const table = $("<table><tr>");
  let ntr = $("<tr>");
  const tabTete = ["Rang", "Nom", "Score", "Temps"];
  tabTete.forEach(element => {
    ntr.append($("<td>").text(element))
  });
  ndiv.append(table.append(ntr));
  for (let index = 0; index < 10; index++) {
    ntr = $("<tr>");
    ntr.attr("id", index);
    let ntd1 =  $("<td>").text(index+1).css("font-weight", "bold");
    ntr.append(ntd1);
    for (let j = 1; j < 4; j++) {
      let ntd2 = $("<td>").text("..")
      ntr.append(ntd2);
    }
    table.append(ntr);
  }
  ndiv.append(table);
  
}
creationTabMeilleurJoueurs();

function remplissageTabJoueurs() {
  for (let pos = 0; pos < tableauMeilleurJoueurs.length; pos++) {
    if (tableauMeilleurJoueurs[pos].name != ""){
    $('#'+pos).html('<td>'+(pos+1)+'</td><td>'+tableauMeilleurJoueurs[pos].name+'</td><td>'+tableauMeilleurJoueurs[pos].score+'</td><td>'+ tableauMeilleurJoueurs[pos].time+'</td>');
  }
  }
}
// $('tr:nth-child('+(pos+3)+')>td:nth-child('+(pos+2)+')').text(tableauMeilleurJoueurs[pos].name);
//     $('tr:nth-child('+(pos+3)+')>td:nth-child('+(pos+3)+')').text(tableauMeilleurJoueurs[pos].score);
//     $('tr:nth-child('+(pos+3)+')>td:nth-child('+(pos+4)+')').text(tableauMeilleurJoueurs[pos].Time);

