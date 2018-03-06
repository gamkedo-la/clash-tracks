// Each array element gets drawn as a new line by drawStory()
var StoryArray = [
					["Its Year 3018 Aliens have conquered", "mankind and enslaved them."],
					["The rebellion had occurred many times", "but all efforts have been thwarted", " by the superior minds."],
					["According to a Legend the only way", "to defeat the superior minds ", "is by destroying their core and"],
					[" there is only one person strong", "enough to complete this challenge","It's You"]
				];
var gameOverArray =[
					 ["GAME OVER"],
					 [],
					 ["Try again? [Y]es or [N]o"]
				];		

var fontSize = 20;
var leadingBuffer = 10; // The vertical space between lines of text
var durationForEachPart = 5000;
var introDuration = durationForEachPart * StoryArray.length; // Change first number to number of desired seconds
var opacity = 0.0;
var storyPart = 0; // index for story array
var masterTick = 0;
var blurRate = 180;
var introInterval, fadeInterval, startTimeout;
var isGameOver = false;

function showIntro() {
	fadeInStory();
  introInterval = setInterval(function() {
		// masterTick++;
		opacity += 0.05;
		if (opacity < 1) {
			fadeInStory();
		}
	}, blurRate);
}

//Go through loop,
//Each line should fade in and fade out to display the next fillText
//When complete loop has completed lood images

function measureTextWidth(text) { // Used to center text in canvas
	return Math.floor(canvasContext.measureText(text).width);
}

function drawStory(storyLine) { // Draws each StoryArray array element as a new line

		var yTracking = canvas.height/2 - (fontSize * storyLine.length);
		for (var i = 0; i < storyLine.length; i++) {
			// console.log(storyArray[storyPart][i]);
			colorText(storyLine[i], canvas.width/2,yTracking,"white","center");
			yTracking += (fontSize + leadingBuffer);
		}
}

function fadeInIntroThenStartGame() {
	showIntro();
  fadeInterval = setInterval(function(){
		if(storyPart < StoryArray.length - 1 ){
				storyPart++;
				opacity = 0.0;
		}
	}, durationForEachPart);
  startTimeout = setTimeout(introDone, introDuration);
}

function fadeInStory() {
	 // console.log(storyPart);
		colorRect(0,0, canvas.width,canvas.height, '#0e0015');
		canvasContext.globalAlpha = opacity;
		drawStory(StoryArray[storyPart]);
		canvasContext.globalAlpha = 1;

  colorText("[press spacebar to skip story]", canvas.width/2, canvas.height - fontSize, "white", "center", "16px '04b30'");
}

function skipStory() {
	if (introInterval) {
		clearInterval(introInterval);
		introInterval = null;
	}
	if (fadeInterval) {
		clearInterval(fadeInterval);
    fadeInterval = null;
	}
	if (startTimeout) {
		clearTimeout(startTimeout);
    startTimeout = null;
	}
	introDone();
}

function gameOverScreen() {
	colorRect(0,0, canvas.width,canvas.height, '#0e0015');
	canvasContext.globalAlpha = 1;
	drawStory(gameOverArray);
	canvasContext.globalAlpha = 1;
	isGameOver = true;
	// Need to put user entered name and actual score in as variables in updateLeaderboard()
	// updateLeaderboard("WoweeThatWorked", 10);
}

