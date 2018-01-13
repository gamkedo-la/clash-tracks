const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;


function carClass() {
	this.x = 75;
	this.y = 75;
	this.prevX = 0;
	this.prevY = 0;
	this.ang = 0;
	this.speed = 0;
	this.myCarPic; // which picture to use
	this.name = "Untitled Car";
	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	this.height = this.width = 44;
	this.CollisionPoints = [
		//center
		{
			x: 75, y: 75
		},
		//top
		{
			x: 75, y: 75
		},
		//bottom
		{
			x: 75, y: 75
		},
		//left
		{
			x: 75, y: 75
		},
		//right
		{
			x: 75, y: 75
		},
		//corner right
		{
			x: 75, y: 75
		},
		//corner 2
		{
			x: 75, y: 75
		},
		// //corner 3
		{
			x: 75, y: 75
		},
		// //corner 4
		{
			x: 75, y: 75
		}

	];

	this.shoot = function(origin){
		
		bullets.push(new Bullet(this.x,this.y, this.ang, origin));
	}


	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;
		var trackValueToCheck =0;
		// console.log(carName);
		if(carName == "Player"){
			trackValueToCheck = TRACK_PLAYERSTART;

			this.height = 25;
			this.weight = 44;
		}
		else{
			trackValueToCheck = TRACK_ENEMYSTART;
			this.height = 18;
			this.weight = 44;
		}	
		for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
					if(trackGrid[arrayIndex] == trackValueToCheck) {
						trackGrid[arrayIndex] = TRACK_ROAD;
						this.ang = -Math.PI/2;
						this.x = eachCol * TRACK_W + TRACK_W/2;
						this.y = eachRow * TRACK_H + TRACK_H/2;
						return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");		
	} // end of carReset func



	this.move = function() {
		this.prevX = this.x;
		this.prevY = this.y;
		this.speed *= GROUNDSPEED_DECAY_MULT;
		if(this.keyHeld_Gas) {
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_Reverse) {
			this.speed -= REVERSE_POWER;
		}
		// if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
			if(this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if(this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		// }
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;
		carTrackHandling(this);
		carCarHandling(this);
		// white trail
		// particles.add(this.x+Math.random()*20-10,this.y+Math.random()*20-10,particlePic,1500,32,"rgb(32,32,32)");
		if(this.carName == 'Player'){
		    particles.add(this.x,this.y,particlePic,350,64,"rgb(255,105,180)");
		}
		else{
			particles.add(this.x,this.y,particlePic,350,64,"rgb(173,216,230)");
		}
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x ,this.y, this.ang);
		if(debug){
			colorCircle(this.x,this.y ,5,"lime");
			for(var i = 0; i<this.CollisionPoints.length; i++){
				colorCircle(this.CollisionPoints[i].x,this.CollisionPoints[i].y ,5,"lime");
			}
		}
	}
}// car class 


//car collision handling
function carCarHandling(whichCar){
	// console.log(whichCar);
	if(whichCar.name == "Player"){
		var xDistance ,yDistance;
		// for(var i = 0; i < whichCar.CollisionPoints.length; i++){
			for(var j = 0; j < enemyCar.CollisionPoints.length; j++){					
				xDistance = Math.pow((whichCar.CollisionPoints[0].x - enemyCar.CollisionPoints[j].x),2);
				yDistance = Math.pow((whichCar.CollisionPoints[0].y - enemyCar.CollisionPoints[j].y),2);
				// console.log(Math.sqrt(xDistance + yDistance));
				if(Math.sqrt(xDistance + yDistance) <= 18){
					whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed ;
					whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed ;
					var random = Math.random()*2;
					var sign = random == 1 ? -1 : 1;
					whichCar.ang += sign * 0.05;
					whichCar.speed *= -0.5;						
					break;
				}
			}
		// }		
	}
}
