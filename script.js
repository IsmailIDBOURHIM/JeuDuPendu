//motAleatoire = Mots[Math.floor(Math.random() * Mots.length)];
let motAleatoire = "add";
console.log(motAleatoire);
let nbrChances = 2;
const lettreMotAleatoire = motAleatoire.split("");
const nbrLettreDeMot = new Array(motAleatoire.length);
console.log(lettreMotAleatoire);
const lettresutilisees = [];

function obtenirLesIndexes(monMot, maLettreSelec) {
  const tabIndex = [];
  for (let pos = 0; pos < monMot.length; pos++) {
    const element = monMot[pos];
    if (element == maLettreSelec) {
      tabIndex.push(pos);
    }
  }
  console.log("index [" + tabIndex);
  return tabIndex;
}

function lettreSelectionnee() {
  if ( $("#lettreSelectionnee").val() == "" || $("#lettreSelectionnee").val() == " ") {
    $("#lettreSelectionnee").val("");
  } 
  else {
    let lettre = $("#lettreSelectionnee").val();
    $("#lettreSelectionnee").val("");
    lettresutilisees.push(lettre);
    console.log(lettresutilisees);

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
    affichageLettres();
    if (nbrChances == 0) {
      console.log("perdu");

      $("#message").html("Vous avez perdu ! Le mot à trouver était : " +"<span id='mot' style = 'color : black'>"+motAleatoire+"</span>").css("color", "red");
        $("#lettreSelectionnee").prop('disabled', true);
    }
    if (lettreMotAleatoire.every(function (lettreMotAleatoire) {
        for (let i = 0; i < lettreMotAleatoire.length; i++) {
          const element = lettreMotAleatoire[i];
          if (element != "") {
            return false;
          }
        }
        return true;
      })
    ) {
      console.log("gangné");
      $("#message").text("Vous avez gangné").css("color", "green");
      $("#lettreSelectionnee").prop('disabled', true);
    }
  }
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
  $("#motDeviner")
    .text(tabAffichage.join(""))
    .css({ "font-weight": "bold", "font-size": "24px" });
}
function affichageLettres() {
  $("#lettreUtilisee")
    .text("Lettre utilisées : " + lettresutilisees)
    .css({ "font-weight": "bold", "font-size": "24px" });
  motDeviner(nbrLettreDeMot);
}
$(affichageLettres);

function reload() {
    location.reload(true);
}
