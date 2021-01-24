// GAME
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// ball
var ballX = canvas.width/2;
var ballY = canvas.height-30;
var ballRadius = 10;
var dbx = 2; // ball movement X
var dby = -2; // ball movement Y

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#afd5aa";
  ctx.fill();
  ctx.closePath();
}

// paddle
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = canvas.height - paddleHeight;
var paddleMove = 7;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#8c6057";
  ctx.fill();
  ctx.closePath();
}

// move paddle
var rightPressed;
var leftPressed;

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }
  else if (event.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);

// draw
function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  // paddle
  if (rightPressed &&
      paddleX < canvas.width - paddleWidth) {
    paddleX += paddleMove;
  }
  else if (leftPressed &&
      paddleX > 0) {
    paddleX -= paddleMove;
  }

  // ball
  if (ballX + dbx > canvas.width - ballRadius || ballX + dbx < ballRadius) {
    dbx = -dbx;
  }
  else if (ballY + dby < ballRadius ||
            (ballY + dby > (canvas.height - paddleHeight - ballRadius) &&
             ballX + dbx > paddleX &&
             ballX + dbx < paddleX + paddleWidth)) {
    dby = -dby;
  }
  else if (ballY + dby > canvas.height) {
    location.reload();
  }

  ballX += dbx;
  ballY += dby;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
