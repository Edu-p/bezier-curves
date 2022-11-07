let curvas = 0;
var arrayPontos = [[]];
let curvaAtiva = 0;
let pontoArray = 0;

let pontosShow = true;
let poligonaisShow = true;
let curvasShow = true;

var labelCurvas = document.getElementById("curvas");
var labelCurvaAtiva = document.getElementById("curvaAtiva");

//Pinta ou apaga os pontos
function setPontosShow() {
  pontosShow = !pontosShow;
  reDraw();
}

//Pinta ou apaga as retas
function setPoligonaisShow() {
  poligonaisShow = !poligonaisShow;
  reDraw();
}

//Pinta ou apaga as curvas
function setCurvasShow() {
  curvasShow = !curvasShow;
  reDraw();
}

//Seta o valor total de curvas
function setCurvas(curvasUpdate) {
  curvas = curvasUpdate;
  labelCurvas.innerHTML = curvasUpdate + 1;
}

//Seta o nr da curva atual
function setCurvaAtiva(curvaAtivaUpdate) {
  curvaAtiva = curvaAtivaUpdate;
  labelCurvaAtiva.innerHTML = curvaAtivaUpdate + 1;
}

//Cria uma curva no array
function criarCurva() {
  setCurvas(curvas + 1);
  setCurvaAtiva(curvaAtiva + 1);
  arrayPontos.length++;
  arrayPontos[curvas] = [];
}

//Verifica se o ponto já existe
function verificarPonto(ponto, array) {
  for (let i = 0; i < array.length; i++) {
    if (isBetween(ponto[0], array[i][0]) && isBetween(ponto[1], array[i][1])) {
      pontoArray = i;
      return true;
    }
  }
  return false;
}

//Função de comparação dos pontos com margem de 4px
function isBetween(valorPonto, valorArray) {
  let valorUp = valorArray + 4;
  let valorDown = valorArray - 4;
  if (valorPonto < valorUp && valorPonto > valorDown) return true;
  return false;
}

//Alterna curva ativa
function suffleCurva() {
  if (curvaAtiva + 1 <= curvas) {
    setCurvaAtiva(curvaAtiva + 1);
  } else {
    setCurvaAtiva(0);
  }
}

//Cria opções no select do deletar
function modalDeletarCurva() {
  var select = document.getElementById("deleteCurveSelect");
  select.innerHTML = "";
  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);
  const formatOrdinals = (n) => {
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
  };
  for (var i = 0; i <= curvas; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = formatOrdinals(i + 1);
    select.appendChild(opt);
  }
}

//Deleta o index do array da curva
function deletarCurva() {
  let select = document.getElementById("deleteCurveSelect");
  let value = select.value;
  arrayPontos.splice(value, 1);
  setCurvas(curvas - 1);
  setCurvaAtiva(curvaAtiva - 1);
  reDraw();
  modalDeletarCurva();
}

//Adiciona um ponto na curva selecionada
function addPonto(pontoX, pontoY) {
  let ponto = [pontoX, pontoY];
  let exists = verificarPonto(ponto, arrayPontos[curvaAtiva]);
  if (!exists) {
    arrayPontos[curvaAtiva].push(ponto);
    reDraw();
  } else {
    pontoOptions(pontoX, pontoY);
  }
}

//Altera um ponto escolhido na curva selecionada
function changePonto(pontoX, pontoY) {
  let ponto = [pontoX, pontoY];
  let oldIndex = pontoArray;
  let exists = verificarPonto(ponto, arrayPontos[curvaAtiva]);
  if (!exists) {
    arrayPontos[curvaAtiva][oldIndex] = ponto;
    reDraw();
    setEditPonto();
  } else {
    setEditPonto();
  }
}

//Função de deletar um ponto selecionado
function deletarPonto() {
  arrayPontos[curvaAtiva].splice(pontoArray, 1);
  reDraw();
  hiddePopup();
}

//Função de editar um ponto selecionado
function editarPonto() {
  setWarningEdit();
  hiddePopup();
  setEditPonto();
}

// Verifica o array para criar a linha
function createLine() {
  const index = arrayPontos[curvaAtiva].length;
  if (index === 1) {
    return;
  } else {
    drawLine(
      arrayPontos[curvaAtiva][index - 2],
      arrayPontos[curvaAtiva][index - 1]
    );
    drawBezierCurve(arrayPontos[curvaAtiva]);
  }
}

//Resenha os pontos
function reDraw() {
  cleanCanvas();
  for (let i = 0; i <= arrayPontos.length - 1; i++) {
    if (arrayPontos[i].length >= 0) {
      if (pontosShow) {
        paintDots(i);
      }
      if (poligonaisShow) {
        paintLines(i);
      }
      if (curvasShow) {
        drawBezierCurve(arrayPontos[i]);
      }
    }
  }
}

//Pintar pontos do array
function paintDots(i) {
  for (let j = 0; j <= arrayPontos[i].length - 1; j++) {
    paintDot(arrayPontos[i][j][0], arrayPontos[i][j][1]);
  }
}

//Pintar retas do array
function paintLines(i) {
  for (let j = 0; j <= arrayPontos[i].length - 2; j++) {
    drawLine(arrayPontos[i][j], arrayPontos[i][j + 1]);
  }
}
