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


function keyPressed(evt) {
	// console.log(evt.keyCode);
	switch(evt.keyCode){
		case KEY_UP_ARROW:
		case KEY_W:
			playerCar.keyHeld_Gas = true;
			break;
		case KEY_DOWN_ARROW:
		case KEY_S:
			playerCar.keyHeld_Reverse = true;
			break;
		case KEY_LEFT_ARROW:
		case KEY_A:
			playerCar.keyHeld_TurnLeft = true;
			break;
		case KEY_RIGHT_ARROW:
		case KEY_D:
			playerCar.keyHeld_TurnRight = true;
			break;
		case SPACE_BAR:
			playerCar.shooting = true;
			break;
		case KEY_O:
			debug = !debug;
	}
	evt.preventDefault();
}

function keyReleased(evt) {
	switch(evt.keyCode){
		case KEY_UP_ARROW:
		case KEY_W:
			playerCar.keyHeld_Gas = false;
			break;
		case KEY_DOWN_ARROW:
		case KEY_S:
			playerCar.keyHeld_Reverse = false;
			break;
		case KEY_LEFT_ARROW:
		case KEY_A:
			playerCar.keyHeld_TurnLeft = false;
			break;
		case KEY_RIGHT_ARROW:
		case KEY_D:
			playerCar.keyHeld_TurnRight = false;
			break;
		case SPACE_BAR:
			playerCar.shoot(origin = 'player');
			playerCar.shooting = false;	
			break;		
	}	
}