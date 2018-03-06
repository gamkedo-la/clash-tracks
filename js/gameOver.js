var gameOverArray =[
					 ["GAME OVER"],
					 [],
					 ["Try again? [Y]es or [N]o"]
				];	

function gameOverScreen() {
	colorRect(0,0, canvas.width,canvas.height, '#0e0015');
	canvasContext.globalAlpha = 1;
	drawStory(gameOverArray);
	canvasContext.globalAlpha = 1;
	isGameOver = true;
	// Need to put user entered name and actual score in as variables in updateLeaderboard()
	// updateLeaderboard("WoweeThatWorked", 10);
}