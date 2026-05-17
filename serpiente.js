
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;



// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  //dibujarTablero();
  dibujarTablero2();
}

function dibujarTablero() {
  //esquina izquierda hacia abajo
  ctx.strokeStyle = "lightgreen";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 100);
  ctx.stroke();
  //esquina derecha hacia abajo
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(canvas.width - 100, 100);
  ctx.stroke();
  //esquina izquierda hacia arriba
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(100, canvas.height - 100);
  ctx.stroke();
  //esquina derecha hacia arriba
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width, canvas.height);
  ctx.lineTo(canvas.width - 100, canvas.height - 100);
  ctx.stroke();

}

function dibujarTablero2() {
  for (let i = 0; i < canvas.width; i += TAMANIO_CELDA) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += TAMANIO_CELDA) {
    ctx.strokeStyle = "white";
    ctx.beginPath();//Empeiza a dibujar en el canva
    ctx.moveTo(0, i); //Donde empieza a dubujar
    ctx.lineTo(canvas.width, i);//Hasta donde dibujar
    ctx.stroke();
  }
}


