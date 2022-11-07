//Pegar as coordenadas dos pontos na tela
var elem = document.getElementById("canvas");
elemLeft = elem.offsetLeft + elem.clientLeft;
elemTop = elem.offsetTop + elem.clientTop;

const widthScreen = window.innerWidth;
const heightScreen = window.innerHeight;

var tabbar = document.querySelector(".tabbar");
var warningEdit = document.querySelector(".warning-edit");
let editPonto = false;

function setEditPonto() {
  editPonto = !editPonto;
}

function setWarningEdit() {
  if ((warningEdit.style.display == "block")) {
    warningEdit.style.display = "none";
  } else {
    warningEdit.style.display = "block";
  }
}

//Função de criar um ponto
elem.addEventListener(
  "click",
  function (event) {
    var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;
    if (editPonto) {
      changePonto(x, y);
    } else {
      addPonto(x, y);
    }
  },
  false
);

//Função de visualizar ou não as 3 opções de pontos, retas ou curvas
function disableOption(idValue) {
  var element = document.getElementById(idValue);
  element.className === "hidden"
    ? element.classList.add("show")
    : element.classList.remove("show");
}

//Função de abrir ou fechar o modal
const switchModal = () => {
  const modal = document.querySelector(".modal");
  const actualStyle = modal.style.display;
  if (actualStyle == "block") {
    modal.style.display = "none";
    document.getElementById("deleteCurveSelect").innerHTML = "";
  } else {
    modal.style.display = "block";
  }
};

const btn = document.querySelector(".modalBtn");
btn.addEventListener("click", switchModal);

//Função de clicar fora do modal e fechar
window.onclick = function (event) {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    switchModal();
  }
};

//Adicionar pop-up do deletar
function pontoOptions(x, y) {
  tabbar.style.display = "block";
  if (240 + x >= widthScreen) {
    tabbar.style.left = x - 75;
  } else {
    tabbar.style.left = x + 95;
  }
  if (100 + y >= heightScreen) {
    tabbar.style.top = y - 62;
  } else {
    tabbar.style.top = y + 20;
  }
}

function hiddePopup() {
  tabbar.style.display = "none";
}
