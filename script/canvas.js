var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth - 80);
canvas.setAttribute("height", window.innerHeight);

//Pinta um ponto
function paintDot(x, y) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 4, 4);
}

//Desenha a linha
function drawLine(ponto1, ponto2) {
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(ponto1[0], ponto1[1]);
  ctx.lineTo(ponto2[0], ponto2[1]);
  ctx.stroke();
}

//Limpa a tela
function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
