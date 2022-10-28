
let selectMode, counter, canvas, btnPlay, ctx, grids;

// progreso de celulas
let progress = {
  population: 0, // poblacion
  generated: 0, // generadas
};

// reglas del juego
let rules = {
  born: "", // cantidad de vecinas para nacer
  live: "", // cantidad de vecinas para continuar vivo
  state: "stop", // estado del juego (play, stop)
 
  loadRules (mode) {
    mode = mode.mode.split("/");
    this.live = mode[0];
    this.born = mode[1];
  }
};



// inicializar
function OnStart () {
  
  // elementos
  counter = document.getElementById("counter");
  canvas = document.getElementById("canvas");
  btnPlay = document.getElementById("btn-play");
  selectMode = document.getElementById("game-mode");
  
  // botón Play/Stop
  btnPlay.onclick = function () {
    if (rules.state != "play") play();
    else stop();
  };
  
  // generar lista de modos de juego
  for (let i in GAME_MODES) {
    let gameMode = GAME_MODES[i];
    let option = document.createElement("option");
    option.innerText = i;
    selectMode.appendChild(option);
  }
  selectMode.onchange = function () {
    rules.loadRules(GAME_MODES[selectMode.value]);
  };
  
  // lienzo
  canvas.width = GRID_WIDTH * CELL_SIZE;
  canvas.height = GRID_HEIGHT * CELL_SIZE;
  canvas.ontouchstart = OnTouch;
  canvas.ontouchmove = OnTouch;
  
  ctx = canvas.getContext("2d");
  
  // background canvas
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  
  // generar cuadros
  grids = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    let row = [];
    grids.push(row);
    // 1 => vivo    0 => muerto
    for (let x = 0; x < GRID_WIDTH; x++) row.push(0);
  }
  
  
  // bucle
  rules.loadRules(GAME_MODES["clasic"]);
  renderCounter();
  stop();
  loop();
}


function play () {
  rules.state = "play";
  btnPlay.innerText = "▶️";
  loop();
}

function stop () {
  rules.state = "stop";
  btnPlay.innerText = "⏸️";
}

// bucle de juego
function loop () {
  let _grids = JSON.parse(JSON.stringify(grids));
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    let cols = _grids[y];
    for (let x = 0; x < GRID_WIDTH; x++) {
      let cell = cols[x];
      
      // bucle de vecinos
      let vivos = 0;
      for (let vy = y - 1 < 0 ? y : y - 1; vy <= (y + 1 >= GRID_HEIGHT ? y : y + 1); vy++) {
        let vcols = _grids[vy];
        for (let vx = x - 1 < 0 ? x : x - 1; vx <= (x + 1 >= GRID_WIDTH ? x : x + 1); vx++)
          if ((vx != x || vy != y) && vcols[vx] == 1) vivos++;
      }
      
      // morir
      if (
        cell == 1 &&
        !rules.live.includes(vivos + "")
      ) {
        grids[y][x] = 0;
        progress.population --;
        drawCell(x, y, 0);
      }
      
      // nacer
      if (cell == 0 && rules.born.includes(vivos + "")) {
        grids[y][x] = 1;
        progress.population ++;
        progress.generated ++;
        drawCell(x, y, 1);
      }
    }
  }
  
  renderCounter();
  if (rules.state == "play") setTimeout(loop, SPEED);
}

// renderizar contador
function renderCounter () {
  counter.innerText = "Población: " + progress.population + "\nCreadas: " + progress.generated;
}

// dibujar cuadro
function drawCell(x, y, on) {
  ctx.fillStyle = CELL_COLOR[on];
  ctx.fillRect(
    x * CELL_SIZE, 
    y * CELL_SIZE, 
    CELL_SIZE, 
    CELL_SIZE
  );
}


// evento de usuario
function OnTouch (event) {
  event.preventDefault();
  if (event.targetTouches) event = event.targetTouches[0];
  
  let relative_cell_size = canvas.clientWidth / GRID_WIDTH;
  let x = Math.floor((event.pageX - canvas.offsetLeft) / relative_cell_size);
  let y = Math.floor((event.pageY - canvas.offsetTop) / relative_cell_size);
  
  if (!grids[y][x]) {
    grids[y][x] = 1;
    drawCell(x, y, 1);
    progress.population ++;
    renderCounter();
  }
}


String.prototype.includes = function (value) {
  return this.indexOf(value) != -1;
};