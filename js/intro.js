// Each array element gets drawn as a new line by drawStory()
var storyText =
["A bunch of stuff",
"that happened to people.",
"A good story should go here, obviously."];

var fontSize = 20;
var leadingBuffer = 2; // The vertical space between lines of text
var introDuration = 5 * 1000; // Change first number to number of desired seconds
var opacity = 0.0;

function showIntro() {
	fadeInStory()
	setInterval(function() {
		opacity += 0.05;
		if (opacity < 1) {
			fadeInStory();
		}
	}, 100);
}

function measureTextWidth(text) { // Used to center text in canvas
	return Math.floor(document.getElementById("gameCanvas").getContext("2d").measureText(text).width);
}

function drawStory(storyLine) { // Draws each storyText array element as a new line
	var yTracking = canvas.height/2 - (fontSize * storyText.length);
	for (var i = 0; i < storyLine.length; i++) {
		canvasContext.fillText(storyLine[i], canvas.width/2 - measureTextWidth(storyLine[i])/2, yTracking);
		yTracking += (fontSize + leadingBuffer);
	}
	
}

function fadeInIntroThenStartGame() {
	showIntro();
	window.setTimeout(imageLoadingDoneSoStartGame, introDuration);
}

function fadeInStory() {
	colorRect(0,0, canvas.width,canvas.height, 'black');
	canvasContext.globalAlpha = opacity;
	canvasContext.fillStyle = 'white';
	canvasContext.font = "" + fontSize + "px Arial Black";
	drawStory(storyText);
}