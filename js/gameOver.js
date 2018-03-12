var gameOverArray =[
					 ["GAME OVER"],
					 ["You failed Humanity"],
					 ["Try again? [Y]es or [N]o"]
				];	

var gameWinArray = [["Well done"],
  					["You saved Humanity"],
  					["Your legacy shall shine"],
  					["Even though"], 
  					["You may not live to see"],
  					["another sunshine."],
  					[],
  					["[M] for Main Menu"]  					
  				   ]

 var winTimeout;

function gameOverScreen(gameArray, gameStatus) {
	colorRect(0,0, canvas.width,canvas.height, '#0e0015');
	canvasContext.globalAlpha = 1;
	drawStory(gameArray);
	canvasContext.globalAlpha = 1;

	if(gameStatus == "Lose"){
		isGameLose = true;
	}
	else{
		isGameWin = true;
	}
	// Need to put user entered name and actual score in as variables in updateLeaderboard()
	// updateLeaderboard("WoweeThatWorked", 10);
}


function gameLoseScreen(){
	gameOverScreen(gameOverArray, "Lose");
	pauseGame();
	if(isHighScoreMode){
		gameHasStarted = false;
	}
}


function gameWinScreen(){
	if(!isHighScoreMode){
		gameOverScreen(gameWinArray, "Win");
			winTimeout = setTimeout(function(){
				isGameWin = false;
				menuCredits();
				level = 1;
			}, 6000)
	} 
	else {
		gameOverScreen(gameWinArray, "Win");
		isGameWin = false;
		highScoreModePlay();
	}
	pauseGame();
	if(isHighScoreMode){
		gameHasStarted = false;
	}
}

