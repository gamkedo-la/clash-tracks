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
const KEY_SHIFT = 16;
const KEY_ENTER = 13;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	// canvas.addEventListener('mousemove', updateMousePos);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

// function updateMousePos(evt) {
// 	var rect = canvas.getBoundingClientRect();
// 	var root = document.documentElement;

// 	mouseX = evt.clientX - rect.left - root.scrollLeft;
// 	mouseY = evt.clientY - rect.top - root.scrollTop;

// 	// cheat / hack to test car in any position
// 	/*carX = mouseX;
// 	carY = mouseY;
// 	carSpeedX = 4;
// 	carSpeedY = -4;*/
// }

function keySet(evt, setTo)
{
	switch(evt.keyCode){
		case KEY_UP_ARROW:
		case KEY_W:
			playerCar.keyHeld_Gas = setTo;
      evt.preventDefault();
			break;
		case KEY_DOWN_ARROW:
		case KEY_S:
			playerCar.keyHeld_Reverse = setTo;
			evt.preventDefault();
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
		case SPACE_BAR:
			playerCar.keyHeld_Shooting = setTo;
      evt.preventDefault();
			break;
		case KEY_SHIFT:
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
		case KEY_O:
			debug = !debug;
      evt.preventDefault();
			break;
		case KEY_R:
			if (isPlaying) {
				resetCheckPoint();
      }
      evt.preventDefault();
      break;
		case KEY_L:
			if (isPlaying) {
				playerCar.autoShoot = !playerCar.autoShoot;
      }
      evt.preventDefault();
			break;
		case KEY_I:
			if (debug && isPlaying) {
				playerCar.isInvincible = !playerCar.isInvincible;
        evt.preventDefault();
      }
			break;
		case KEY_U:
			toggleScreenShake();
      evt.preventDefault();
			break;
		case KEY_ENTER:
			if (isPlaying) {
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
	}
}

function keyReleased(evt) {
	if (isPlaying) {
		keySet(evt, false);
  }
}
