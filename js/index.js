const framesPerSecond = 30;
// const TIME_TO_FINISH_LVL_1 = 2 * 60 * framesPerSecond; // 2 minutes
const TIME_TO_FINISH_LVL_1 = 1 * 50 * framesPerSecond;
var canvas, canvasContext;
var debug = false;
var playerCar = new carClass();
var enemyCar = new carClass();
var carList = [playerCar, enemyCar];
var timeToFinishLevel;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	loadImages();
}

function imageLoadingDoneSoStartGame() {
	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel(levelOne);
	timeToFinishLevel = TIME_TO_FINISH_LVL_1;
}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice();
	playerCar.reset(playerCarPic, "Player");
	enemyCar.reset(enemyCarPic, "Enemy");
}

function resetLevel() {
    timeToFinishLevel = TIME_TO_FINISH_LVL_1;
    loadLevel(levelOne);
}

function updateLevelCounter() {
    timeToFinishLevel--;
}

function updateAll() {
    if (timeToFinishLevel > 0) {
        updateLevelCounter();
	} else {
    	resetLevel();
	}
	moveAll();
	drawAll();
	particles.update();
	console.log(bullets);
}

function moveAll() {
	playerCar.move();
	enemyCar.move();
	// playerCar.checkOtherCarCollision(enemyCar);
	cameraFollow();
}

function drawAll() {
	canvasContext.save(); // needed to undo this .translate() used for scroll
    // this next line is like subtracting camPanX and camPanY from every
    // canvasContext draw operation up until we call canvasContext.restore
    // this way we can just draw them at their "actual" position coordinates
  	canvasContext.translate(-camPanX,-camPanY);
	drawTracks();
	particles.draw();
	playerCar.draw();
	enemyCar.draw();
	drawBullets();
	// anyWallsBetweenTwoPoints(playerCar.x, playerCar.y, enemyCar.x, enemyCar.y);
	canvasContext.restore(); // undoes the .translate() used for cam scroll
	colorText("TIME: " + Math.ceil(timeToFinishLevel / framesPerSecond), 30, 30, 'white');
    colorText("HP: " + playerCar.health, canvas.width - 30, 30, 'white', 'right');
}
