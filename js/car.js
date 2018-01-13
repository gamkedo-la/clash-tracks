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
		//bottom
		{
			x: 75, y: 75
		},
		//top
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
		//corner 1
		{
			x: 75, y: 75
		},
		//corner 2
		{
			x: 75, y: 75
		},
		//corner 3
		{
			x: 75, y: 75
		},
		//corner 4
		{
			x: 75, y: 75
		}

	];

	this.shoot = function(){
		
		bullets.push(new Bullet(this.x,this.y, this.ang));
	}

	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;
		var trackValueToCheck =0;
		// console.log(carName);
		if(carName == "Player"){
			trackValueToCheck = TRACK_PLAYERSTART;
			this.height = 29;
			this.weight = 44;
		}
		else{
			trackValueToCheck = TRACK_ENEMYSTART;
			this.height = 19;
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
		particles.add(this.x+Math.random()*20-10,this.y+Math.random()*20-10,particlePic,1500,32,"rgb(32,32,32)");
		// red fire
		particles.add(this.x,this.y,particlePic,350,64,"rgb(255,100,0)");

	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x,this.y, this.ang);
		if(debug){
			colorCircle(this.x,this.y ,5,"lime");
			for(var i = 0; i<this.CollisionPoints.length; i++){
				colorCircle(this.CollisionPoints[i].x,this.CollisionPoints[i].y ,5,"lime");
			}
		}
	}

	

}


function carCarHandling(whichCar){
	// console.log(whichCar);

	if(whichCar.name == "Player"){
		var xDistance ,yDistance;


		for(var i = 0; i < whichCar.CollisionPoints.length; i++){
			for(var j = 0; j < enemyCar.CollisionPoints.length; j++){
					
					xDistance = Math.abs(whichCar.CollisionPoints[i].x - enemyCar.CollisionPoints[j].x);
					yDistance = Math.abs(whichCar.CollisionPoints[i].y - enemyCar.CollisionPoints[j].y);
					//console.log(xDistance);
					//console.log(yDistance);
					if(xDistance <= 5 &&  xDistance >=0 && yDistance <= 5 &&  yDistance >=0){
				
						whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed ;
						whichCar.y -= Math.cos(whichCar.ang) * whichCar.speed ;
						whichCar.speed *= -0.6;


					}

			}
		}

		
	}

}
