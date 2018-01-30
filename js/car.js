const GROUNDSPEED_DECAY_MULT = 0.94;
const GROUNDSPEED_DECAY_MULT_NOS = 0.97;

const DRIVE_POWER = 0.6;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.04;
const DRIFT_TURN_RATE = 0.18;
const MIN_SPEED_TO_TURN = 1;
const DRIFT_MIN_SPEED = 2;
const INITIAL_HEALTH = 3;
const CAR_COLLISION_POINTS = 13;
var enemyCars = [];
var ai_distance = 250

function carClass() {
	//position
	this.pos = vector.create(75,75);
	this.prevPos = vector.create(0,0);
	this.ang = 0;
	this.speed = 0;
	this.health = INITIAL_HEALTH;
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
	this.CollisionPoints = initializeCollisionPoints();
	this.bulletImg = "";

	// Clear tracks when creating a new car
	if (window.tireTracks) tireTracks.reset();

	this.shoot = function(){
		bullets.push(new bulletClass(this));
	}

	this.reset = function(whichImage, carName) {
		this.isDead = false;
		this.health = INITIAL_HEALTH;
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
			this.bulletImg = playerBulletPic;
		}
		else{
			trackValueToCheck = TRACK_ENEMYSTART;
			this.height = 18;
			this.weight = 44;
			this.isAI = true;
			this.bulletImg = enemyBulletPic;

			// console.log("Enemy AI is set to " + this.isAI);
		}	
		placeCarOnTrackTileType(this, trackValueToCheck);	
	} // end of carReset func

	this.gotHurt = function (damageDealt) {
		if (this.isDead) {
			ai_distance = 250;
			return;
		}
		this.health -= damageDealt;
		ai_distance = 400; // To show ai knows it has been hit and follows player.
		console.log("New health is " + this.health + " due to damage " + damageDealt);
		if (this.health <= 0) {
			console.log("You got me this time! (car dead)");
			this.isDead = true;
			this.myCarPic = wreckedCarPic;
			if (this.name === "Player") {
				setTimeout(function(){
								if(playerLives > 1){
									playerLives--;
									resetCheckPoint();
								}
								else{
									resetLevel();
								}
							}, 1500);                
			}
		}
	}

	this.move = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		if (this.isAI) {
			// this.keyHeld_TurnRight = true;
			distancePlayerEnemy = distance(playerCar.pos.x,playerCar.pos.y,this.pos.x, this.pos.y)

			//need to change AI angle to match angle of player car
			//check what is 45 degree to the right and left of it.
			this.keyHeld_Gas = true;
			var leftPos = rightPos = frontPos = vector.create();
			// Navigation for AI cars to see bricks are nearby
			frontPos.x = this.pos.x +  Math.cos(this.ang)* this.width; 
	 		frontPos.y = this.pos.y + Math.sin(this.ang)* this.width;;
			leftPos.x =  this.pos.x +  Math.cos(this.ang - Math.PI/7)* this.width -  Math.sin(this.ang - Math.PI/7)* this.width; 
			leftPos.y =  this.pos.y +  Math.cos(this.ang - Math.PI/7)* this.width +  Math.sin(this.ang - Math.PI/7)* this.width; 
			rightPos.x = this.pos.x +  Math.cos(this.ang + Math.PI/7)* this.width + Math.sin(this.ang + Math.PI/7)* this.width;
			rightPos.y = this.pos.y -  Math.cos(this.ang + Math.PI/7)* this.width + Math.sin(this.ang + Math.PI/7)* this.width;

			if(trackCollisionCheck(frontPos.x, frontPos.y, goalCheck = false)){
				this.ang += 0.5;
			}

			if(trackCollisionCheck(leftPos.x, leftPos.y, goalCheck = false)){
				this.ang += 0.15;
			}
			if(trackCollisionCheck(rightPos.x, rightPos.y, goalCheck = false)){
				this.ang -= 0.15;
			}

			if (!anyWallsBetweenTwoPoints(this.pos.x, this.pos.y, playerCar.pos.x, playerCar.pos.y) 
				&& !debug && !this.isDead && !playerCar.isDead) {

				if(distancePlayerEnemy < ai_distance){

					this.keyHeld_Gas = true;
					var dx = playerCar.pos.x - this.pos.x;
					var dy = playerCar.pos.y - this.pos.y;
					var angle = Math.atan2(dy, dx);
					this.ang = angle ;
					this.keyHeld_Shooting = Math.random() < 0.3;
				}	
			} 
			else{
					this.keyHeld_Gas = false;
					this.keyHeld_Shooting = false;	
			} 
		
		}
		
		if (this.isDead) {  // shutting off all controls for AI/player since car is dead.
			this.keyHeld_Gas = false;
			this.keyHeld_Reverse = false;
			this.keyHeld_TurnLeft = false;
			this.keyHeld_TurnRight = false;
			this.keyHeld_Nos = false;
			this.keyHeld_Shooting = false;
		}
		if(this.keyHeld_Shooting) {
			if (this.semiAutoLock == false) {
				this.shoot();
			}
			this.semiAutoLock = true;  // semi-automatic
		} 
		else {
			this.semiAutoLock = false;
		}
		if(this.keyHeld_Nos){
			this.speed *= GROUNDSPEED_DECAY_MULT_NOS;
		}
		else{
			this.speed *= GROUNDSPEED_DECAY_MULT;
		}
		if(this.keyHeld_Gas){
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
		this.pos.x += Math.cos(this.ang) * this.speed;
		this.pos.y += Math.sin(this.ang) * this.speed;
		carTrackHandling(this);
		this.carCarHandling(this);
		
		// white trail
		// particles.add(this.pos.x+Math.random()*20-10,this.pos.y+Math.random()*20-10,particlePic,1500,32,"rgb(32,32,32)");
		
		if (window.tireTracks) tireTracks.add(this.pos.x, this.pos.y, this.ang, 0.5);
		//trail particles for player
		if(this.name == 'Player'){
			if(this.keyHeld_Nos){
				particles.add(this.pos.x,this.pos.y,particlePic,500,64,"rgb(46,148,200)",0,this.ang-Math.PI);
			}
			else{
				particles.add(this.pos.x,this.pos.y,particlePic,1000,32,"rgb(240,248,255)",0,this.ang-Math.PI);
				particles.add(this.pos.x,this.pos.y,particlePic,500,64,"rgb(46,148,193)",0,this.ang-Math.PI);
			} 
		}
		//trail particles for enemy
		else{
			particles.add(this.pos.x,this.pos.y,particlePic,1000,32,"rgb(241,180,241)",0,this.ang-Math.PI);
			particles.add(this.pos.x,this.pos.y,particlePic,500,64,"rgb(148,20,211)",0,this.ang-Math.PI);
		}
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.pos.x ,this.pos.y, this.ang);
		if(debug){
			colorCircle(this.pos.x,this.pos.y ,1,"lime");
			for(var i = 0; i<this.CollisionPoints.length; i++){
				colorCircle(this.CollisionPoints[i].x,this.CollisionPoints[i].y ,1,"lime");
			}
		}
	}

	this.withinDistOfCollision = function(dist, testX, testY) {
		var centerDx = Math.abs(this.pos.x - testX);
		var centerDy = Math.abs(this.pos.y - testY);
		var approxDistToCar = centerDx + centerDy;
		if (approxDistToCar > this.myCarPic.width) {
			return;  // nowhere near close enough to bother checking individual points
		}
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

	this.carCarHandling =function(){
		for(var i = 0; i < carList.length; i++) {
			
				if(carList[i].pos.x != this.pos.x && carList[i].pos.y != this.pos.y){

					var xDistance = Math.pow((this.pos.x - carList[i].pos.x),2);
					var yDistance = Math.pow((this.pos.y - carList[i].pos.y),2);
					//safe distance to check collision points

					if(Math.sqrt(xDistance + yDistance) <= this.myCarPic.width/1.5){
						
						console.log("car to car collision!");

						// collision response: bounce off each other
						// both cars are affected

						// back up a bit so we no longer collide
						this.pos.x -= Math.cos(this.ang) * this.speed ;
						this.pos.y -= Math.sin(this.ang) * this.speed ;

						var car1mass = 1;
						var car2mass = 1;
						var car1velX = Math.cos(this.ang) * this.speed;
						var car1velY = Math.sin(this.ang) * this.speed;
						var car2velX = Math.cos(carList[i].ang) * carList[i].speed;
						var car2velY = Math.sin(carList[i].ang) * carList[i].speed;

						// transfer velocities using classic "elastic collision" formula (like pool balls)
						var newVelX1 = (car1velX * (car1mass - car2mass) + (2 * car2mass * car2velX)) / (car1mass + car2mass);
						var newVelY1 = (car1velY * (car1mass - car2mass) + (2 * car2mass * car2velY)) / (car1mass + car2mass);
						var newVelX2 = (car2velX * (car2mass - car1mass) + (2 * car1mass * car1velX)) / (car1mass + car2mass);
						var newVelY2 = (car2velY * (car2mass - car1mass) + (2 * car1mass * car1velY)) / (car1mass + car2mass);

						// set new velocity
						this.speed = Math.sqrt(newVelX1*newVelX1+newVelY1*newVelY1); // pythagoras
						this.ang = Math.atan2(newVelY1,newVelX1);

						// also bounce the other car
						carList[i].speed = Math.sqrt(newVelX2*newVelX2+newVelY2*newVelY2); // pythagoras
						carList[i].ang = Math.atan2(newVelY2,newVelX2);

						// FIXME: we need to force cars to face velocity. 
						// so they always face to be angled in whatever direction they
						// are moving, even if hit from the side... hmmmm what to do...

						// what angle did we collide at? unused but handy to find perpendicular angle TODO
						//var dx = this.pos.x - carList[i].pos.x;
						//var dy = this.pos.y - carList[i].pos.y;
						//var collisionAngle = Math.atan2(dy, dx);
						// rotate like we bounced off a wall? (Math.PI = 180 deg)
						//this.ang = collisionAngle + Math.PI/2; 
						//carList[i].ang = collisionAngle - Math.PI/2; 

						// slow down?
						this.speed *= 0.75;	// FIXME: consider using a proper restitution % (bouncines)
						carList[i].speed *= 0.75;

						/*
						// old version "works":
						this.pos.x -= Math.cos(this.ang) * this.speed ;
						this.pos.y -= Math.sin(this.ang) * this.speed ;
						this.ang +=  0.05;
						this.speed *= -0.5;	
						*/

						carCollisionEffect(this.pos.x, this.pos.y);

						break;
				}
					//code for making collision more precise - don't remove

					// if(Math.sqrt(xDistance + yDistance) <= this.myCarPic.width){	
					// 	for(j = 1; j < carList[i].CollisionPoints.length; j++){
					// 		var xCollisionDistance = Math.pow((this.pos.x - carList[i].CollisionPoints[j].x),2);
					// 		var yCollisionDistance = Math.pow((this.pos.y - carList[i].CollisionPoints[j].y),2);
					// 		if(Math.sqrt(xCollisionDistance + yCollisionDistance) <= 18){
					// 			this.pos.x -= Math.cos(this.ang) * this.speed ;
					// 			this.pos.y -= Math.sin(this.ang) * this.speed ;
					// 			this.ang += 0.05;
					// 			this.speed *= -0.5;	
					// 			carCollisionEffect(this.pos.x, this.pos.y);
					// 			break;
					// 		}
					// 	}				
					// }
				}
		}
	}
}// end car class 


function initializeCollisionPoints(){
	var arr = [];
	for(var i = 0; i < CAR_COLLISION_POINTS; i++){
		arr.push({x:'',y:''});
	}
	return arr;
}

function placeCarOnTrackTileType(whichCar, tileTypeToCheck) {
	for(var eachRow=0;eachRow<track_rows;eachRow++) {
			for(var eachCol=0;eachCol<track_cols;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
					if(trackGrid[arrayIndex] == tileTypeToCheck) {
						trackGrid[arrayIndex] = TRACK_ROAD;
						whichCar.ang = -Math.PI/2;
						whichCar.pos.x = eachCol * TRACK_W + TRACK_W/2;
						whichCar.pos.y = eachRow * TRACK_H + TRACK_H/2;
						return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO CAR START FOUND, type: (" + tileTypeToCheck + ")");	
}

