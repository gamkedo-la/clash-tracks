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
			else{
				if(menuState.isPlayMenuDiv){
					menuLevel(0);
				}
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
			if (isPlaying) {
				// playerCar.autoShoot = !playerCar.autoShoot;
     		}
			else{
				if(menuState.isMenuDiv){
					console.log('going to leaderboards');
				}
			}
      		evt.preventDefault();
			break;

		case KEY_ENTER:
			if (isPlaying) {
				console.log("Level Changing..");
				loadNextLevel();
	        }
	        evt.preventDefault();
			break;

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
			if(isPlaying){
				//Pause screen function
			}
			else{
				if(menuState.isPlayMenuDiv){
					highScoreModePlay();
				}
			}
			break;
			break
		case KEY_H:
			if(isPlaying){
				//Pause screen function
			}
			else{
				if(menuState.isMenuDiv){
					menuHelp();
				}
			}
			break;

		case KEY_O:
			if(isPlaying){
				debug = !debug;
				evt.preventDefault();
			}
			else{
				if(menuState.isMenuDiv){
					menuOptions();
				}
			}
			break;

		case KEY_C:
			if(isPlaying){
			}
			else{
				if(menuState.isMenuDiv){
					menuCredits();
				}
			}
			break;

		case KEY_S:
			if(isPlaying){
			}
			else{
				if(menuState.isPlayMenuDiv){
					menuLevel(0)
				}
			}
			break;

		case KEY_Y:
			if(isGameLose) {
				playerCar.resetAngle = 0;
				if(isHighScoreMode == false) {
					level = 0;
				}
				loadLevel(level);
				isGameLose = false;
				continueGame();
				currentBackgroundMusic.startOrStopMusic();
			}
			break;

		case KEY_N:
			if(isGameLose && !isPlaying) {
				mainMenu();
				isGameLose = false;
			}
			break;


		// remove this
		case KEY_1:
			if(isPlaying){
							var random = Math.ceil(Math.random()*7);
			
			switch(random){
				//free life
				case 1:
					playerLives++;
					playerCar.health = INITIAL_HEALTH;
					console.log('Health increase');
					powerupText = "Health Increase";
					playerCar.isPowered = false;
					break;

				case 2:
					console.log('Timer increase');
					timeToFinishLevel += TIMER_INCREASE_AMT; // Adds time to clock
					powerupText = "Timer Increase";
					playerCar.isPowered = false;
					break;

				case 3:
					console.log('Touched a smokescreen powerup!');
					playerCar.smokeScreenFramesRemaining = SMOKESCREEN_TIMESPAN;
					powerupText = "Smokescreen Activated";
					break;

				case 4:
					console.log('Invincibility Mode!');
					playerCar.isInvincible = true;
     				addDelayedCall(function(){playerCar.isInvincible = false;playerCar.isPowered = false;},5000);
					powerupText = "Shield Activated";
					break;

				case 5:
					console.log('You shoot!');
					playerCar.autoShoot = true;
     				addDelayedCall(function(){playerCar.autoShoot = false;playerCar.isPowered = false;},5000);
					powerupText = "Turret Activated";
					break;

				case 6:
					console.log('You multi - shoot!');
					playerCar.splitShoot = true;
					playerCar.autoShoot = true;
					playerCar.bulletImg = splitShootPic;
      				addDelayedCall(function(){
      					playerCar.splitShoot = false;
      					playerCar.autoShoot = false;
      					playerCar.isPowered = false;
      					playerCar.bulletImg = playerBulletPic;
      				},5000);
					powerupText = "Split-Turret Activated";
					break;
				//should be nitros replanish
				case 7:
					console.log('Nitros!');
					// playerCar.nitroFramesRemaining = NITRO_TIMESPAN;
					amtOfNos = 100;
					powerupText = "Nitros Activated";
      				addDelayedCall(function(){playerCar.isPowered = false;},5000);
					break;
			}
 			addDelayedCall(function(){playerCar.inTrackPowerup = false; powerupText = ""},3000);
			}
			else{
				if(menuState.isLevelDiv){
					menuLevel(0)
				}
			}
			break;

		case KEY_2:
		case KEY_3:
		case KEY_4:
		case KEY_5:
		case KEY_6:
		case KEY_7:
		case KEY_8:
			if(isPlaying == false && menuState.isLevelDiv) {
				menuLevel(evt.keyCode-KEY_1);
			}
			break;
			
		case KEY_M:
			if(!isPlaying){
				mainMenu();
			}
			break;
	}
}

function keyReleased(evt) {
	if (isPlaying) {
		keySet(evt, false);
  }
}
