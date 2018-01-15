const GROUNDSPEED_DECAY_MULT = 0.94;
const GROUNDSPEED_DECAY_MULT_NOS = 0.97;

const DRIVE_POWER = 0.6;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.08;
const DRIFT_TURN_RATE = 0.18;
const MIN_SPEED_TO_TURN = 1;
const DRIFT_MIN_SPEED = 2;


function carClass() {
	this.x = 75;
	this.y = 75;
	this.prevX = 0;
	this.prevY = 0;
	this.ang = 0;
	this.speed = 0;
	this.health = 3;
	this.myCarPic; // which picture to use
	this.name = "Untitled Car";
	this.isAI = false;
	this.isDead = false;

	this.keyHeld_Nos = false;
	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	this.keyHeld_Shooting = false;
	this.semiAutoLock = false;

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
		//corner right top
		{
			x: 75, y: 75
		},
		//corner left top
		{
			x: 75, y: 75
		},
		// //corner left bottom
		{
			x: 75, y: 75
		},
		// //corner right bottom
		{
			x: 75, y: 75
		},
		//30 degree corners for removing collision bugs, Between middle and corner points
		//top right
		{
			x: 75, y: 75
		},
		//corner left top
		{
			x: 75, y: 75
		},
		// //corner left bottom
		{
			x: 75, y: 75
		},
		// // //corner right bottom
		{
			x: 75, y: 75
		}
		


	];

	// Clear tracks when creating a new car
	if (window.tireTracks) tireTracks.reset();

	this.shoot = function(){		
		bullets.push(new Bullet(this.x,this.y, this.ang, this));
	}

	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;
		this.keyHeld_Nos = false;
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
			this.isAI = true;
			console.log("Enemy AI is set to " + this.isAI);
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

	this.gotHurt = function (damageDealt) {
		if (this.isDead) {
			return;
		}
		this.health -= damageDealt;
		console.log("New health is " + this.health + " due to damage " + damageDealt);
		if (this.health <= 0) {
			console.log("You got me this time! (car dead)");
			this.isDead = true;
		}
	}

	this.move = function() {
		this.prevX = this.x;
		this.prevY = this.y;
		if (this.isAI) {
			this.keyHeld_Gas = true;
			this.keyHeld_TurnRight = true;
			this.keyHeld_Shooting = Math.random() < 0.05;
		}
		if (this.isDead) {
			this.keyHeld_Gas = false;
			this.keyHeld_Reverse = false;
			this.keyHeld_TurnLeft = false;
			this.keyHeld_TurnRight = false;
			this.keyHeld_Nos = false;
		}
		if(this.keyHeld_Shooting) {
			if (this.semiAutoLock == false) {
				this.shoot();
			}
			this.semiAutoLock = true;  // semi-automatic
		} else {
			this.semiAutoLock = false;
		}

		if(this.keyHeld_Nos){
			this.speed *= GROUNDSPEED_DECAY_MULT_NOS;
		}else{
			this.speed *= GROUNDSPEED_DECAY_MULT;
		}

		if(this.keyHeld_Gas) {
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_Reverse) {
			this.speed -= REVERSE_POWER;
		}
		// if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
		// }
		if(Math.abs(this.speed) > DRIFT_MIN_SPEED){
			if(this.keyHeld_TurnLeft) {
				this.ang -= DRIFT_TURN_RATE;
			}
			if(this.keyHeld_TurnRight) {
				this.ang += DRIFT_TURN_RATE;
			}
		}
		else{
			if(this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
				
			}
			if(this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
				
			}
		}	
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;
		carTrackHandling(this);
		carCarHandling(this);
		
		// white trail
		// particles.add(this.x+Math.random()*20-10,this.y+Math.random()*20-10,particlePic,1500,32,"rgb(32,32,32)");
		
		if (window.tireTracks) tireTracks.add(this.x, this.y, this.ang, 0.5);

		if(this.name == 'Player'){
			if(this.keyHeld_Nos){
				particles.add(this.x,this.y,particlePic,500,64,"rgb(46,148,200)",0,this.ang-Math.PI);
			}
			else{
				particles.add(this.x,this.y,particlePic,1000,32,"rgb(240,248,255)",0,this.ang-Math.PI);
				particles.add(this.x,this.y,particlePic,500,64,"rgb(46,148,193)",0,this.ang-Math.PI);

			}
		    
		}
		else{
			particles.add(this.x,this.y,particlePic,1500,32,"rgb(173,216,230)",0,this.ang-Math.PI);

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

	this.withinDistOfCollision = function(dist, testX, testY) {
		for(var i = 0; i<this.CollisionPoints.length; i++){
			var xd = Math.abs(this.CollisionPoints[i].x - testX);
			var yd = Math.abs(this.CollisionPoints[i].y - testY);
			var approxDist = xd + yd;
			if (approxDist < dist) {
				return true;
			}
		}
		return false;
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
					carCollisionEffect(whichCar.CollisionPoints[0].x,whichCar.CollisionPoints[0].y);
					break;
				}
			}
		// }		
	}
}
