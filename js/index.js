
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
var playerLives;
const DEFAULT_PLAYER_LIVES = 3;
const HIGHSCORE_PLAYER_LIVES = 1;
var backgroundMusicArray;
var powerupText = "";
var musicIndex = 0;
var delayedCallbacks = [];
var amtOfNos;
var isGameLose, isGameWin;

const DEFAULT_NOS_AMT = 100;

// var obstacle = new obstacleClass(0,5);

var levelNames = ["Random","Tut","Obstacles","Traps","EnemyCars","SpaceCars","Assault","Long Road",];
var levelIndex;
var bestTimeToBeat = 300;
function getBestLevelTime(index) {
	var localStorageName = "highScore_"+levelNames[index]; // name instead of index in case we rearrange array/order
	var oldHighScore = localStorage.getItem(localStorageName);
    if ((oldHighScore === "null") || (oldHighScore == null)) {
        localStorage.setItem(localStorageName, 300);
    }
    var scoreVal = parseInt(localStorage.getItem(localStorageName));
    return (scoreVal < 300 ? scoreVal : "No Record");
}

function compareOrUpdateBestTime() {
	var localStorageName = "highScore_"+levelNames[level]; // name instead of index in case we rearrange array/order
	var oldHighScore = localStorage.getItem(localStorageName);
	if ((oldHighScore === "null") || (oldHighScore == null)) {
        oldHighScore = 300;
    } else {
    	oldHighScore = parseInt(oldHighScore);
    }
    var newTime = Math.ceil(timeToFinishLevel / framesPerSecond);
    console.log(oldHighScore);
    if(newTime > oldHighScore || oldHighScore == 300) {
	    localStorage.setItem(localStorageName, newTime);
	}

	regenerateLevelMenu();
}

function resetBestTimes() {
	localStorage.clear();
	regenerateLevelMenu();
}

function regenerateLevelMenu() {
	var levelSelectMenu = document.getElementById('Levels');
	var levelSelectMenuFirstLine = '<h1 class = "animated bounceInLeft">LEVEL SELECT:</h1>';
	var levelSelectMenuLastLine = '<br><a href="#" onclick="mainMenu()" class = "animated bounceInRight">[M]ain Menu</a>';
	levelSelectMenu.innerHTML = levelSelectMenuFirstLine;
	for(var i=0;i<levelNames.length;i++) {
		levelSelectMenu.innerHTML += "<a href='#' onclick='menuLevel("+i+")'>["+(i+1)+"] "+levelNames[i]+" ("+getBestLevelTime(i)+")</a>"
	}
	levelSelectMenu.innerHTML += "<br/><a href='#' onclick='resetBestTimes()'>Reset all local best times</a>";
	levelSelectMenu.innerHTML += levelSelectMenuLastLine;
}

window.onload = function() {
	regenerateLevelMenu();
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvas.width = 700;
	canvas.height = 525;
	canvasContext.font = "04b30";
	canvasContext.clearRect(0,0, canvas.width,canvas.height);
	colorText("LOADING ASSETS", canvas.width/2, canvas.height/2, '541a3d', 'center', "30px '04b30'");
	level = 1;
	playerLives = DEFAULT_PLAYER_LIVES;
	amtOfNos = DEFAULT_NOS_AMT;
	loadImages();
	setupInput();
	menuMusic.loopSong();
	backgroundMusicArray = [trancyMusic, draftMonkMusic, varyzeMusic, escapeToCoreMusic, clashLegendsMusic, misfortuneMusic];
	window.addEventListener('blur', pauseGame);
	window.addEventListener('focus', continueGame);
	isGameLose = false;
	isGameWin = false;

};


// used to be called imageLoadingDoneSoStart but now we run the main menu first
function startGame() {
	clearInterval(gameLoop); // prevents it from stacking due to previous plays
  	gameHasStarted = true;
	loadLevel(level);
	isPlaying = true;
    gameLoop = setInterval(updateAll, msPerFrame);
    playerNosReplenishLoop = setInterval(playerNosReplenish, msPerFrame*8);

}


function pauseGame() {

	if (isPlaying && gameLoop) {
	    console.log('Pause game');
	    isPlaying = false;
	    clearInterval(gameLoop);
	    clearInterval(playerNosReplenishLoop);
	    gameLoop = false;
	    colorText('Game paused!', canvas.width / 2, canvas.height / 2 - 60, 'white', 'center', "40px '04b30'");
	    colorText('[M] for Main Menu', canvas.width / 2, canvas.height / 2 , '#acacac', 'center', "24px 'audiowide'");
	    colorText('[P] to resume', canvas.width / 2, canvas.height / 2 + 30, '#acacac', 'center', "24px 'audiowide'");
	    currentBackgroundMusic.pauseSound();
	    menuMusic.loopSong();
  	}

}


function slowSpeedGame(){

	if(isPlaying && gameLoop){
		console.log('slowing game - game feel ;)');
		clearInterval(gameLoop);
		clearInterval(playerNosReplenishLoop);
		framesPerSecond = 12;
		msPerFrame = 1000 / framesPerSecond;
		gameLoop = setInterval(updateAll, msPerFrame);
		playerNosReplenishLoop = setInterval(playerNosReplenish, msPerFrame*8);
	}

}


function normalSpeedGame(){

	if(isPlaying && gameLoop){
		clearInterval(gameLoop);
		clearInterval(playerNosReplenishLoop);
		framesPerSecond = DEFAULT_FRAME_PER_SEC;
		msPerFrame = 1000 / framesPerSecond;
		gameLoop = setInterval(updateAll, msPerFrame);
		playerNosReplenishLoop = setInterval(playerNosReplenish, msPerFrame*8);
	}
}


function continueGame() {

	if (gameHasStarted && !gameLoop) {
	    console.log('Resuming...');
	    setTimeout(function(){
			isPlaying = true;
		    gameLoop = setInterval(updateAll, msPerFrame);
		    playerNosReplenishLoop = setInterval(playerNosReplenish, msPerFrame*8);
		    menuMusic.pauseSound();
		    currentBackgroundMusic.startOrStopMusic();
	    }, 500)  
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
	levelDataReset();
	if(isHighScoreMode) {
		playerLives = HIGHSCORE_PLAYER_LIVES;
	} else {
		playerLives = DEFAULT_PLAYER_LIVES;
	}
	resetLevel(level);
}

// Returns random integer between the provided minimum inclusive and maximum exclusive values.
// Implemented with the correct way to get uniform values.
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function resetLevel(whichLevel) {

    menuMusic.pauseSound();
	levelData = levels[whichLevel];
	trackGrid = levelData.trackLayout.slice();
	trackGridCopy = trackGrid.slice();
	track_cols = levelData.cols;
	track_rows = levelData.rows;
	timeToFinishLevel = levelData.timeLimit;
	numOfEnemiesCars = levelData.enemyCars;
	numOfOverheadShips = levelData.overheadSpaceships;
	numOfOscillatingObstacles = levelData.oscillatingObstacles;
	amtOfNos = DEFAULT_NOS_AMT;
	entitiesReset();
	playerCar.resetAngle = 0;

	// console.log(currentBackgroundMusic);
	if(currentBackgroundMusic != undefined)
			currentBackgroundMusic.pauseSound();

	musicIndex = getRandomInt(0, backgroundMusicArray.length);
	currentBackgroundMusic = backgroundMusicArray[musicIndex];
	currentBackgroundMusic.loopSong();

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
	amtOfNos = DEFAULT_NOS_AMT;
	entitiesReset();

}


function entitiesReset(){

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
		playerLives--;
		if(playerLives > 0){
    		resetLevel(level);
		}
		else{
			pauseGame();
			gameLoseScreen();
		}
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

	if(!isGameLose && !isGameWin){
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
		
		particles.draw(); // regular particles like trails are draw below the car sprites
		
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

    	particlesOntop.draw(); // muzzle flashes etc that are above car sprites

		canvasContext.restore(); // undoes the .translate() used for cam scroll
		
		var time = Math.ceil(timeToFinishLevel / framesPerSecond)
		if (framesPerSecond < DEFAULT_FRAME_PER_SEC) {
			// dividing the time by 2.5 brings it back to 
			// what it should be when it's FPS is slowed down to 12:)
			time = Math.ceil(time/2.5);
		}

		var timeText = "TIME: ";

		if(powerupText != ""){
			colorText(powerupText,20, 60, '#acacac');
		}

		var rightMargin = 20;
		if(isHighScoreMode) {
			colorText(timeText, canvas.width - canvasContext.measureText(""+time).width - rightMargin, 30, 'white', 'right');

			if(time <= 10){
				colorText(time, canvas.width - rightMargin, 30, '#ee00ee', 'right');
			}
			else{
				colorText(time, canvas.width - rightMargin, 30, 'cyan', 'right');
			}

			var bestTime = bestTimeToBeat;
			colorText("BEST: ", 20, 30, 'white', 'left');
			colorText( bestTime,canvasContext.measureText("BEST: ").width + 20,30,'cyan','left' );
		} else {
			colorText(timeText , 30, 30, 'white');

			if(time <= 10){
				colorText(time, canvasContext.measureText(timeText).width + 20, 30, '#ee00ee');
			}
			else{
				colorText(time, canvasContext.measureText(timeText).width + 20, 30, 'cyan');
			}

			colorText("LIVES: ", canvas.width - canvasContext.measureText(playerLives).width - 30, 30, 'white', 'right');
			colorText( playerLives,canvas.width - 30,30,'cyan','right' );
		}
		
		
		// colorText("HP: " , canvas.width  - canvasContext.measureText(playerCar.health).width- 30, 60, 'white', 'right');
		// colorText(playerCar.health, canvas.width - 30, 60, 'cyan', 'right');
		colorText("[N]OS: ", canvas.width - canvasContext.measureText(amtOfNos).width - rightMargin, 60, 'white', 'right');
		if(amtOfNos < 10){
			colorText( amtOfNos,canvas.width - rightMargin, 60,'#ee00ee','right' );
		}
		else{
			colorText( amtOfNos,canvas.width - rightMargin, 60,'cyan','right' );
		}

		colorText("LEVEL: ", canvas.width - canvasContext.measureText(level).width -rightMargin , canvas.height - 40, 'white', 'right');
		colorText( level ,canvas.width -rightMargin,  canvas.height - 40,'cyan','right' );
		}

	}

function playerNosReplenish(){
	if(amtOfNos < DEFAULT_NOS_AMT){
		amtOfNos++;
	}
}
