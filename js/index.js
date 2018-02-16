

// const TIME_TO_FINISH_LVL_1 = 2 * 60 * framesPerSecond; // 2 minutes
const TIME_TO_FINISH_LVL_1 = 1 * 50 * framesPerSecond;

var canvas, canvasContext;
var debug = false;
var playerCar = new carClass();
//Used for testing bullet Collisions. Includes all cars.
var carList = [playerCar];
var enemyShip = new shipOverheadClass();
var timeToFinishLevel;
var level;
var playerLives = 3;
// var numOfEnemiesCars = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.font = "04b30";
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	level = 0;
	playerLives = 3;
	loadImages();
	trancyMusic.loopSong();
}

function imageLoadingDoneSoStartGame() {
	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel(level);
}

function loadLevel(whichLevel) {
	//clearing previously saved objects and data
	levelDataReset();
	playerLives = 3;
	//loading level data to current level
	levelData = levels[whichLevel];
	trackGrid = levelData.trackLayout.slice();
	trackGridCopy = trackGrid.slice();
	track_cols = levelData.cols;
	track_rows = levelData.rows;
	timeToFinishLevel = levelData.timeLimit;
	numOfEnemiesCars = levelData.enemyCars;
	carsReset();
}

function resetLevel() {
    timeToFinishLevel = TIME_TO_FINISH_LVL_1;
    loadLevel(level);
}

function levelDataReset(){
	enemyCars = [];
	while(carList.length > 1){
		carList.pop();
	}
	bullets = [];
	particles.clear();
	ai_distance = 250;
}

function resetCheckPoint() {
	levelDataReset();
	levelData = levels[level];
	trackGrid = trackGridCopy.slice();
	track_cols = levelData.cols;
	track_rows = levelData.rows;
	numOfEnemiesCars = levelData.enemyCars;
	carsReset();
}

function carsReset(){
	playerCar.reset(playerCarPic, "Player");
	for(var i = 0; i < numOfEnemiesCars; i++){
		var enemyCar = new carClass();
		enemyCar.reset(enemyCarPic, "Enemy");
		enemyCars.push(enemyCar);
		carList.push(enemyCar);
	}
	enemyShip.reset();
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
	updateScreenshake();
}

function moveAll() {
	playerCar.move();
	enemyShip.move();
	// enemyCar.move();
	// enemyCar2.move();
	for(var i = 0; i < enemyCars.length; i++){
		enemyCars[i].move();
	}

	updateBullets();
	cameraFollow();
}

function drawAll() {
	canvasContext.save(); // needed to undo this .translate() used for scroll
    // this next line is like subtracting camPanX and camPanY from every
    // canvasContext draw operation up until we call canvasContext.restore
    // this way we can just draw them at their "actual" position coordinates
  canvasContext.translate(-camPanX,-camPanY);
	drawTracks();
	playerCar.drawShadow(playerCar.shadowColor);
	//To draw shadow underneath particles
	for(var i = 0; i < enemyCars.length; i++){
		enemyCars[i].drawShadow(enemyCars[i].shadowColor)
	}
	particles.draw();

	playerCar.draw();
	for(var i = 0; i < enemyCars.length; i++){
		if(!enemyCars[i].remove){
			enemyCars[i].draw();
		}
	}
	// for(var i = 0; i < enemyCars.length; i++){
	// 	if(enemyCars[i].remove){
	// 		enemyCars.slice(i,1);
	// 	}
	// }
	drawBullets();

	enemyShip.draw();
	// anyWallsBetweenTwoPoints(playerCar.x, playerCar.y, enemyCar.x, enemyCar.y);
	canvasContext.restore(); // undoes the .translate() used for cam scroll
	colorText("TIME: " , 30, 30, 'white');
	colorText(Math.ceil(timeToFinishLevel / framesPerSecond), canvasContext.measureText("TIME: ").width + 20, 30, 'cyan');
	colorText("HP: " , canvas.width  - canvasContext.measureText(playerCar.health).width- 30, 60, 'white', 'right');
	colorText(playerCar.health, canvas.width - 30, 60, 'cyan', 'right');
  colorText("LIVES: ", canvas.width - canvasContext.measureText(playerLives).width - 30, 30, 'white', 'right');
	colorText( playerLives,canvas.width - 30,30,'cyan','right' )

}
