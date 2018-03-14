const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const SPACE_BAR = 32;
const KEY_O = 79;
const KEY_R = 82;
const KEY_L = 76;
const KEY_U = 85;
const KEY_I = 73;
const KEY_P = 80;
const KEY_B = 66;
const KEY_H = 72;
const KEY_C = 67;
const KEY_M = 77;
const KEY_N = 78;
const KEY_Y = 89;
const KEY_SHIFT = 16;
const KEY_ENTER = 13;
const KEY_ESC = 27;
const KEY_0 = 48;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;

function setupInput() {
	// canvas.addEventListener('mousemove', updateMousePos);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

function keySet(evt, setTo){
	
	switch(evt.keyCode){
		case KEY_UP_ARROW:
		case KEY_W:
			playerCar.keyHeld_Gas = setTo;
      		evt.preventDefault();
			break;

		case KEY_DOWN_ARROW:
		case KEY_S:
			if(isPlaying){
				playerCar.keyHeld_Reverse = setTo;
				evt.preventDefault();
			}
			break;

		case KEY_LEFT_ARROW:
		case KEY_A:
			playerCar.keyHeld_TurnLeft = setTo;
      		evt.preventDefault();
			break;

		case KEY_RIGHT_ARROW:
		case KEY_D:
			playerCar.keyHeld_TurnRight = setTo;
      		evt.preventDefault();
			break;
		case KEY_SHIFT:
		case KEY_N:
			playerCar.keyHeld_Nos = setTo;
			evt.preventDefault();
			break;
	}
}

function keyPressed(evt) {
	// console.log(evt.keyCode);
	if (isPlaying) {
		keySet(evt, true);
  	}

	switch(evt.keyCode){

		//isplaying actually works only on playscreen.
		case KEY_R:
			if (isPlaying) {
				resetCheckPoint();
		    }
		    evt.preventDefault();
		    break;

		case KEY_L:
			if(menuState.isMenuDiv){
					// console.log('going to leaderboards');
			}
      		evt.preventDefault();
			break;

		/*case KEY_ENTER:
			if (isPlaying) {
				console.log("Level Changing..");
				loadNextLevel();
	        }
	        evt.preventDefault();
			break;
		*/	

		case SPACE_BAR:
			if (startTimeout) {
        		skipStory();
			}
      		evt.preventDefault();
			break;

		case KEY_ESC:
		case KEY_P:
			if(menuState.isMenuDiv){
				menuPlay();
			}
			else{
        		togglePause();
			}
			break;
		
		case KEY_B:
			if(menuState.isPlayMenuDiv){
					highScoreModePlay();
			}
			break;

		case KEY_H:
			if(menuState.isMenuDiv){
					menuHelp();
			}
			break;

		case KEY_O:
			if(isPlaying){
				// debug = !debug;
				// evt.preventDefault();
			}
			else{
				if(menuState.isMenuDiv){
					menuOptions();
				}
			}
			break;

		case KEY_C:
			if(menuState.isMenuDiv){
					menuCredits();
			}
			break;

		case KEY_S:
			if(isPlaying){
			}
			else{
				if(menuState.isPlayMenuDiv){
					menuLevel(level)
				}
			}
			break;

		case KEY_Y:
			if(isGameLose) {
				playerCar.resetAngle = 0;
				if(isHighScoreMode == false) {
					level = 1;
				}
				loadLevel(level);
				isGameLose = false;
				gameHasStarted = true;
				continueGame();
				currentBackgroundMusic.startOrStopMusic();
			}
			break;

		case KEY_N:
			if(isGameLose && !isPlaying) {
				mainMenu();
				isGameLose = false;
				isGameWin = false;
			}
			break;

		case KEY_M:
			if(!isPlaying){
				mainMenu();
			}
			if(isGameWin){
				isGameWin = false;
				isGameLose = false;
				level = 1; 
				clearTimeout(winTimeout);
				mainMenu();
			}
			break;
		

		case KEY_1:
		case KEY_2:
		case KEY_3:
		case KEY_4:
		case KEY_5:
		case KEY_6:
		case KEY_7:
		case KEY_8:
		case KEY_9:
			if(isPlaying == false && menuState.isLevelDiv) {
				menuLevel(evt.keyCode-KEY_1);
			}
			break;
			
		}
}

function keyReleased(evt) {
	if (isPlaying) {
		keySet(evt, false);
  }
}
