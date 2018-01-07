var canvas, canvasContext;

var playerCar = new carClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();

	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice();
	playerCar.reset(playerCarPic, "Player");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {

	playerCar.move();
	cameraFollow();
	
}

function drawAll() {
	canvasContext.save(); // needed to undo this .translate() used for scroll

    // this next line is like subtracting camPanX and camPanY from every
    // canvasContext draw operation up until we call canvasContext.restore
    // this way we can just draw them at their "actual" position coordinates
  	canvasContext.translate(-camPanX,-camPanY);

  	drawTracks();
  	drawBullets();

  	console.log(bullets);

	playerCar.draw();
	canvasContext.restore(); // undoes the .translate() used for cam scroll

}
