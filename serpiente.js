
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let intervaloSerpiente;
let direccionActual;
let puntaje = 0;
const TAMANIO_CELDA = 25;
//CREACIÓN DE LA SERPIENTE
const SERPIENTE = [
  // { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA },
  // { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 1 },
  // { x: ((canvas.width / 2) / TAMANIO_CELDA) - 1, y: (canvas.height / 2) / TAMANIO_CELDA - 1 },
  // { x: ((canvas.width / 2) / TAMANIO_CELDA) - 2, y: (canvas.height / 2) / TAMANIO_CELDA - 1 },
  //Una serpiente de 5 cuadros subiendo pegada al borde izquierdo.
  // { x: (canvas.width / 2) / TAMANIO_CELDA - (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 5 },
  // { x: (canvas.width / 2) / TAMANIO_CELDA - (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 4 },
  // { x: (canvas.width / 2) / TAMANIO_CELDA - (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 3 },
  // { x: (canvas.width / 2) / TAMANIO_CELDA - (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 2 },
  // { x: (canvas.width / 2) / TAMANIO_CELDA - (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 1 },

  { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 5 },
  { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 4 },
  { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 3 },
  { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 2 },
  { x: (canvas.width / 2) / TAMANIO_CELDA, y: (canvas.height / 2) / TAMANIO_CELDA - 1 },
];

let comida = {
  comidaX: 10,
  comidaY: 10
}
generarComida();

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
  dibujarTablero2();
  pintarSerpiente();
  pintarComida();

  //dibujarTablero();
  // pintarParte(5, 1);
  // pintarParte(0, 3);
  // pintarParte(5, 5);
  // pintarParte(10, 2);
  // //Pintar un cuadrado pegado al borde inferior del canvas.
  // pintarParte((canvas.width - TAMANIO_CELDA) / TAMANIO_CELDA, (canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA);
  // //Pintar un cuadrado pegado al borde derecho del canvas.
  // pintarParte((canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA, (canvas.width / 2) / TAMANIO_CELDA);
  // //Pintar un cuadrado pegado al borde izquierdo del canvas.
  // pintarParte((canvas.height / 2) / TAMANIO_CELDA - (canvas.height / 2) / TAMANIO_CELDA, (canvas.width / 2) / TAMANIO_CELDA);
  // //Pintar un cuadrado en cualquier esquina del canvas.
  // pintarParte(canvas.width - canvas.width, (canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA);
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
  //verticales
  for (let i = 0; i < canvas.width; i += TAMANIO_CELDA) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  //horizontales
  for (let i = 0; i < canvas.height; i += TAMANIO_CELDA) {
    ctx.strokeStyle = "white";
    ctx.beginPath();//Empeiza a dibujar en el canva
    ctx.moveTo(0, i); //Donde empieza a dubujar
    ctx.lineTo(canvas.width, i);//Hasta donde dibujar
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY) {
  let valorX = lineaX * TAMANIO_CELDA;
  let valorY = lineaY * TAMANIO_CELDA;

  ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "yellow";
  ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  let serpiente;
  for (i = 0; i < SERPIENTE.length; i++) {
    serpiente = SERPIENTE[i];
    if (i === 0) {
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "red";
    }
    pintarParte(serpiente.x, serpiente.y);
  }
}
function moverDerecha() {
  let cabeza = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabeza.x + 1,
    y: cabeza.y
  };
  SERPIENTE.unshift(nuevaCabeza); // agrega al inicio
  SERPIENTE.pop();                // elimina la cola
}

function moverIzquierda() {
  let cabeza = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabeza.x - 1,
    y: cabeza.y
  };
  SERPIENTE.unshift(nuevaCabeza); // agrega al inicio
  SERPIENTE.pop();                // elimina la cola
}

function moverArriba() {
  let cabeza = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1
  };
  SERPIENTE.unshift(nuevaCabeza); // agrega al inicio
  SERPIENTE.pop();                // elimina la cola
}

function moverAbajo() {
  let cabeza = SERPIENTE[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1
  };
  SERPIENTE.unshift(nuevaCabeza); // agrega al inicio
  SERPIENTE.pop();                // elimina la cola

}

function cambiarDireccion(nuevaDireccion) {
  direccionActual = nuevaDireccion;
}

function iniciarJuego() {
  intervaloSerpiente = setInterval(moverSerpiente, 500);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
}

function moverSerpiente() {
  let cola = SERPIENTE[SERPIENTE.length - 1]
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }
  if (atraparComida() == true) {
    puntaje += 1;
    document.getElementById("puntaje").innerText = puntaje;
    SERPIENTE.push(cola);
    generarComida();
  }
  dibujarTodo();
}

function generarComida() {
  let totalColumnas = canvas.width / TAMANIO_CELDA;
  let totalFilas = canvas.height / TAMANIO_CELDA;
  comida.comidaX = Math.floor(Math.random() * totalColumnas);
  comida.comidaY = Math.floor(Math.random() * totalFilas);
}

function pintarComida() {
  let totalColumnas = canvas.width - TAMANIO_CELDA / TAMANIO_CELDA;
  let totalFilas = canvas.height - TAMANIO_CELDA / TAMANIO_CELDA;
  ctx.fillStyle = "blue"
  pintarParte(comida.comidaX, comida.comidaY);
}

function atraparComida() {
  let cabeza = SERPIENTE[0];
  if (cabeza.x === comida.comidaX && cabeza.y === comida.comidaY) {
    return true;
  }
  return false;
}