//Função de visualizar ou não as 3 opções de pontos, retas ou curvas
function disableOption(idValue) {
  var element = document.getElementById(idValue);
  element.className === "hidden"
    ? element.classList.add("show")
    : element.classList.remove("show");
}

//Pegar as coordenadas dos pontos na tela
var elem = document.getElementById("canvas");
elemLeft = elem.offsetLeft + elem.clientLeft;
elemTop = elem.offsetTop + elem.clientTop;

//Função de criar um ponto
elem.addEventListener(
  "click",
  function (event) {
    var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;
    addPonto(x, y);
  },
  false
);

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
