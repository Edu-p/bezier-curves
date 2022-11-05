let numeroAvaliacoes = 5;
let index = 0;

//Muda numero de avaliacoes
function changeNrAvaliacoes() {
  let numeros = [5, 10, 15, 100];
  if (index >= 3) {
    index = 0;
  } else {
    index++;
  }

  let labelAvaliacoes = document.getElementById("nrAvaliacoes");
  labelAvaliacoes.innerHTML = numeros[index];
  numeroAvaliacoes = numeros[index];
  reDraw();
}
//Interpola pontos individualmente
function interpolation(pointA, pointB, t) {
  return [
    pointA[0] * (1 - t) + pointB[0] * t,
    pointA[1] * (1 - t) + pointB[1] * t,
  ];
}

//Algoritmo para achar os pontos da curva baseado na quantidade de interpolacoes
function deCasteljau(pontos, t) {
  var grau = pontos.length - 1;
  if (grau == 1) {
    return interpolation(pontos[0], pontos[1], t);
  } else {
    var pontosAux = [];
    for (let i = 0; i < grau; i++) {
      pontosAux.push(interpolation(pontos[i], pontos[i + 1], t));
    }
    return deCasteljau(pontosAux, t);
  }
}

//Desenha linha entre os pontos da curva
function drawControlPolygon(pontos) {
  for (let i = 0; i < pontos.length - 1; i++) {
    drawLine(pontos[i], pontos[i + 1]);
  }
}

//Desenha curva de bezier baseado nos pontos de controle
function drawBezierCurve(curva) {
  if (curva.length > 2) {
    var bezierCurves = [];
    bezierCurves.push(curva[0]);
    for (let i = 1; i <= numeroAvaliacoes; i++) {
      bezierCurves.push(deCasteljau(curva, i / numeroAvaliacoes));
    }
    bezierCurves.push(curva[curva.length - 1]);
    drawControlPolygon(bezierCurves);
  }
}
