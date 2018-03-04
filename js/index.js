
var canvas, canvasContext;
var debug = false;
var gameHasStarted = false;
var isPlaying = false;
var gameLoop = false;
var playerCar = new carClass();
//Used for testing bullet Collisions. Includes all cars.
var carList = [playerCar];
var numOfEnemiesCars = 0;
var numOfEnemiesShips = 0;
var numOfOscillatingObstacles = 0;
var overheadSpaceshipList= [];
var oscillatingObstacleList= [];

var timeToFinishLevel;
var level;
var playerLives = 3;
var backgroundMusicArray;
var powerupText = "";
var musicIndex = 0;
var delayedCallbacks = [];
var amtOfNos;
// var obstacle = new obstacleClass(0,5);


window.onload = function() {

	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvas.width = 700;
	canvas.height = 525;
	canvasContext.font = "04b30";
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	level = 0;
	playerLives = 3;
	amtOfNos = 3
	loadImages();
	setupInput();
	mainMenu();
	menuMusic.loopSong();
	backgroundMusicArray = [trancyMusic, draftMonkMusic, varyzeMusic];
	// misfortuneMusic
	window.addEventListener('blur', pauseGame);
	window.addEventListener('focus', continueGame);

};


// used to be called imageLoadingDoneSoStart but now we run the main menu first
function startGame() {

  	gameHasStarted = true;
	loadLevel(level);
	isPlaying = true;
    gameLoop = setInterval(updateAll, msPerFrame);

}


function pauseGame() {

	if (isPlaying && gameLoop) {
	    console.log('Pause game');
	    isPlaying = false;
	    clearInterval(gameLoop);
	    gameLoop = false;
	    colorText('Game paused!', canvas.width / 2, canvas.height / 2, 'white', 'center', "40px '04b30'");
	    currentBackgroundMusic.pauseSound();
	    menuMusic.loopSong();
  	}

}


function slowSpeedGame(){

	if(isPlaying && gameLoop){
		console.log('slowing game - game feel ;)');
		clearInterval(gameLoop);
		framesPerSecond = 12;
		msPerFrame = 1000 / framesPerSecond;
		gameLoop = setInterval(updateAll, msPerFrame);
	}

}


function normalSpeedGame(){

	if(isPlaying && gameLoop){
		clearInterval(gameLoop);
		framesPerSecond = DEFAULT_FRAME_PER_SEC;
		msPerFrame = 1000 / framesPerSecond;
		gameLoop = setInterval(updateAll, msPerFrame);
	}

}


function continueGame() {

	if (gameHasStarted && !gameLoop) {
	    console.log('Continue game');
	    isPlaying = true;
	    gameLoop = setInterval(updateAll, msPerFrame);
	    menuMusic.pauseSound();
	    currentBackgroundMusic.startOrStopMusic();
  	}

}

function togglePause() {
	if (isPlaying) {
		pauseGame();
	}
	else {
		continueGame();
	}
}


function introDone() {
	console.log('Intro complete. Starting game!');
	startGame();
}


function loadLevel(whichLevel) {

	//clearing previously saved objects and data
	menuMusic.pauseSound();
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
	numOfOverheadShips = levelData.overheadSpaceships;
	numOfOscillatingObstacles = levelData.oscillatingObstacles;
	amtOfNos = 3;
	carsReset();
	// console.log(currentBackgroundMusic);
	if(currentBackgroundMusic != undefined)
			currentBackgroundMusic.pauseSound();

	musicIndex = Math.floor(Math.random()*backgroundMusicArray.length);
	currentBackgroundMusic = backgroundMusicArray[musicIndex];
	currentBackgroundMusic.loopSong();

}


function resetLevel() {

    loadLevel(level);

}


function levelDataReset(){

	enemyCars = [];

	while(carList.length > 1){
		carList.pop();
	}

	overheadSpaceshipList = [];
	oscillatingObstacleList = [];

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
	numOfOverheadShips = levelData.overheadSpaceships;
	numOfOscillatingObstacles = levelData.oscillatingObstacles;
	carsReset();

}


function carsReset(){

	playerCar.reset(playerCarPic, "Player", levelData.playerCarAngle);

	for(var i = 0; i < numOfEnemiesCars; i++){
		var enemyCar = new carClass();
		enemyCar.reset(enemyCarPic, "Enemy");
		enemyCars.push(enemyCar);
		carList.push(enemyCar);
	}

	for(var j = 0; j < numOfOverheadShips; j++){
		var overheadShip = new shipOverheadClass();
		overheadShip.reset();
		overheadSpaceshipList.push(overheadShip);
	}

	for(var k = 0; k < numOfOscillatingObstacles; k++){
		var velocity = [{x: 5, y: 0}, {x : 0, y: 5}];
		var obstacleVelocity = velocity[Math.floor(Math.random()*velocity.length)];
		var obstacle = new obstacleClass(obstacleVelocity.x,obstacleVelocity.y);
		obstacle.reset();
		oscillatingObstacleList.push(obstacle);
	}

	
}


function updateLevelCounter() {

    timeToFinishLevel--;

}


function addDelayedCall(callback, timeout) {
	delayedCallbacks.push({
		callback: callback,
		timeout: timeout
	});
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

	for (var i = delayedCallbacks.length - 1; 0 <= i; i--) {

		if (delayedCallbacks[i].timeout < 0) {
	      delayedCallbacks[i].callback();
	      delayedCallbacks.splice(i, 1);
		}
		else {
      	  delayedCallbacks[i].timeout -= msPerFrame;
		}

	}
}


function moveAll() {

	playerCar.move();
	// overheadShip.move();
	// enemyCar.move();
	// enemyCar2.move();

	for(var i = 0; i < enemyCars.length; i++){
		enemyCars[i].move();
	}

	for(var j = 0; j < overheadSpaceshipList.length; j++){
		if(!overheadSpaceshipList[j].remove){
			overheadSpaceshipList[j].move();
		}
	}
	for(var k = 0; k < oscillatingObstacleList.length; k++){
		oscillatingObstacleList[k].move();
	}
	updateBullets();
	removeSpaceship();
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
	for(i = 0; i < enemyCars.length; i++){
		if(!enemyCars[i].remove){
			enemyCars[i].draw();
		}
	}
	drawBullets();
	for(var k = 0; k < oscillatingObstacleList.length; k++){
		oscillatingObstacleList[k].draw();
	}
	// for(i = 0; i < enemyCars.length; i++){
	// 	if(enemyCars[i].remove){
	// 		enemyCars.slice(i,1);
	// 	}
	// }
	
	if(overheadSpaceshipList.length > 0){
		for(var j = 0; j < overheadSpaceshipList.length; j++){
			if(!overheadSpaceshipList[j].remove){
				overheadSpaceshipList[j].draw();
			}
		}
	}

	canvasContext.restore(); // undoes the .translate() used for cam scroll
	
	var time = Math.ceil(timeToFinishLevel / framesPerSecond)
	colorText("TIME: " , 30, 30, 'white');

	if(time <= 10){
		colorText(time, canvasContext.measureText("TIME: ").width + 20, 30, '#ee00ee');
	}
	else{
		colorText(time, canvasContext.measureText("TIME: ").width + 20, 30, 'cyan');
	}

	if(powerupText != ""){
		colorText(powerupText,30, 60, '#acacac');
	}

	colorText("LIVES: ", canvas.width - canvasContext.measureText(playerLives).width - 30, 30, 'white', 'right');
	colorText( playerLives,canvas.width - 30,30,'cyan','right' )
	colorText("HP: " , canvas.width  - canvasContext.measureText(playerCar.health).width- 30, 60, 'white', 'right');
	colorText(playerCar.health, canvas.width - 30, 60, 'cyan', 'right');
	colorText("NOS: ", canvas.width - canvasContext.measureText(amtOfNos).width - 30, 90, 'white', 'right');
	colorText( amtOfNos,canvas.width - 30,90,'cyan','right' )

}
