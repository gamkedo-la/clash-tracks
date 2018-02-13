
const DRIVE_POWER = 0.6;
const REVERSE_POWER = 0.2;
const NOS_BOOST_MULT = 1.5;
const TURN_RATE = 0.04;
const DRIFT_TURN_RATE = 0.18;
const MIN_SPEED_TO_TURN = 1;
const DRIFT_MIN_SPEED = 2;
const INITIAL_HEALTH = 3;
const CAR_COLLISION_POINTS = 13;
var enemyCars = [];
var ai_distance = 250;


//TODO Drift
//TODO Building stuck jitter.

function carClass() {
	//position
	this.pos = vector.create(75,75);
	this.prevPos = vector.create(0,0);
	this.ang = 0;
	this.speed = 0;
	this.friction = 1.0;
	this.skidSpeed = 0; 		// force of skid
	this.skidAngle = 0;			// direction of skid
	this.skidDampening = 0.75; 	// how much less skidding per frame
	this.skidScale = 2.0; 		// 1.0 = transfer energy perfectly like pool balls
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
	this.inTileBroken = false;
	this.jumping = false;
	this.inJumpTile  = false;
	this.autoShoot = false; // only used for player.
	this.shadowColor = "gray";
	this.stuckOnWall = false;
	this.remove = false;
	this.trailColor = "rgb(46,148,193)"


	// Clear tracks when creating a new car
	if (window.tireTracks) tireTracks.reset();

	this.shoot = function(){
		bullets.push(new bulletClass(this));
		if(this.name == 'Player'){
			shootSound.play();
		}else{
			enemyShootSound.play();
		}
	}

	this.reset = function(whichImage, carName) {
		this.isDead = false;
		this.autoShoot = false;
		this.stuckOnWall = false;
		this.inTileBroken = false;
		this.health = INITIAL_HEALTH;
		this.name = carName;
		this.myCarPic = whichImage;
		this.ang = -Math.PI/2;
		this.prevAng = this.ang;
		this.speed = 0;
		this.skidSpeed = 0;
		this.skidAngle = 0;
		this.keyHeld_Nos = false;
		var trackValueToCheck =0;
		// console.log(carName);
		if(carName == "Player"){
			trackValueToCheck = TRACK_PLAYERSTART;
			this.height = 25;
			this.weight = 44;
			this.bulletImg = playerBulletPic;
			this.trailColor = "rgb(46,148,193)"

		}
		else{
			trackValueToCheck = TRACK_ENEMYSTART;
			this.height = 18;
			this.weight = 44;
			this.isAI = true;
			this.bulletImg = enemyBulletPic;
			this.trailColor = "rgb(201, 102, 249)"
			// console.log("Enemy AI is set to " + this.isAI);
		}
		placeCarOnTrackTileType(this, trackValueToCheck);
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	} // end of carReset func

	this.gotHurt = function (damageDealt) {
		carHitSound.play();
		if (this.isDead) {
			ai_distance = 250;
			return;
		}
		if (this.name === "Player")	screenshake(10);
		this.health -= damageDealt;
		ai_distance = 150; // To show ai knows it has been hit and follows player.
		console.log("New health is " + this.health + " due to damage " + damageDealt);
		if (this.health <= 0 && !this.isDead && !this.stuckOnWall) {
			// console.log("You got me this time! (car dead)");
			carSuckedSound.play();
			this.isDead = true;
			this.myCarPic = wreckedCarPic;
			if (this.name === "Player") {
				playerResetCondition();
			}
		}
	}

	this.move = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		this.prevAng = this.ang;
		//TODO  Make ai cars rotate and dissapear on broken tiles
		//TODO Make Ai cars avoid broken tile slightly

		if (this.isAI) {
			// this.keyHeld_TurnRight = true;
			distancePlayerEnemy = distance(playerCar.pos.x,playerCar.pos.y,this.pos.x, this.pos.y)

			//need to change AI angle to match angle of player car
			//check what is 45 degree to the right and left of it.
			this.keyHeld_Gas = true;

			var leftPos = rightPos = frontPos = vector.create();
			// Navigation for AI cars to see bricks are nearby
			frontPos.x = this.pos.x + Math.cos(this.ang)* this.width;
	 		frontPos.y = this.pos.y + Math.sin(this.ang)* this.width;;
			leftPos.x =  this.pos.x + Math.cos(this.ang - Math.PI/7)* this.width -  Math.sin(this.ang - Math.PI/7)* this.width;
			leftPos.y =  this.pos.y + Math.cos(this.ang - Math.PI/7)* this.width +  Math.sin(this.ang - Math.PI/7)* this.width;
			rightPos.x = this.pos.x + Math.cos(this.ang + Math.PI/7)* this.width + Math.sin(this.ang + Math.PI/7)* this.width;
			rightPos.y = this.pos.y - Math.cos(this.ang + Math.PI/7)* this.width + Math.sin(this.ang + Math.PI/7)* this.width;

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
					&& !debug && !this.isDead
					&& !playerCar.isDead
					&& !this.inTileBroken) {

					if(distancePlayerEnemy < ai_distance ){

							this.keyHeld_Gas = true;
							var dx = playerCar.pos.x - this.pos.x;
							var dy = playerCar.pos.y - this.pos.y;

							var angle = Math.atan2(dy, dx);
							this.ang = angle ;
							this.keyHeld_Shooting = Math.random() < 0.1;
					}
			}
			else{
					this.keyHeld_Gas = false;
					this.keyHeld_Shooting = false;
			}
		} // end if AI

		//only for player car.
		else{
				if(playerCar.autoShoot && Math.random() < 0.1){
						playerCar.shoot()
				}
		}

		stopControlsForDeadCar(this);
		this.handleControls();
		this.pos.x += Math.cos(this.ang) * this.speed;
		this.pos.y += Math.sin(this.ang) * this.speed;

		// skidding due to collisions: a sideways force
		if (this.skidSpeed!=0)
		{
			this.pos.x += Math.cos(this.skidAngle) * this.skidSpeed * this.skidScale;
			this.pos.y += Math.sin(this.skidAngle) * this.skidSpeed * this.skidScale;
			this.skidSpeed *= this.skidDampening;
		}

		carTrackHandling(this);
		this.carCarHandling(this);

		// white trail
		// particles.add(this.pos.x+Math.random()*20-10,this.pos.y+Math.random()*20-10,particlePic,1500,32,"rgb(32,32,32)");

		if (window.tireTracks) tireTracks.add(this.pos.x, this.pos.y, this.ang, 0.5);
		//trail particles for player

		// if(this.isDead){
		//
		// }

		if(!this.keyHeld_Nos){
			particles.add(this.pos.x,this.pos.y,particlePic,1000,32,"rgb(240,248,255)",0,this.ang-Math.PI);
		}
		particles.add(this.pos.x,this.pos.y,particlePic,500,64,this.trailColor,0,this.ang-Math.PI);


	} // end move function

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.pos.x ,this.pos.y, this.ang);
		// this.drawShadow(this.shadowColor);
		if(debug){
			colorCircle(this.pos.x,this.pos.y ,1,"lime");
			for(var i = 0; i<this.CollisionPoints.length; i++){
				colorCircle(this.CollisionPoints[i].x,this.CollisionPoints[i].y ,1,"lime");
			}
		}

	}

	this.drawShadow = function(shadowColor){
		if(this.jumping){
			var shadowPosX = this.prevPos.x - Math.cos(this.ang + 0.2) * this.speed* 1.1;
			var shadowPosY = this.prevPos.y - Math.sin(this.ang + 0.2) * this.speed * 1.1;
			var radius = map(this.speed, 0, 40, 15, 2)
			colorCircle(shadowPosX ,shadowPosY , radius ,shadowColor);
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

	this.handleControls = function() {
		// Shooting
		if(this.keyHeld_Shooting) {
			if (this.semiAutoLock == false) {
				this.shoot();
			}
			this.semiAutoLock = true;  // semi-automatic
		}
		else {
			this.semiAutoLock = false;
		}

		// Friction
		this.speed *= this.friction;

		// Boosts
		var boostMult = 1.0;
		if(this.keyHeld_Nos){
			boostMult *= NOS_BOOST_MULT;
		}

		// Acceleration
		if(this.keyHeld_Gas &&  !this.inTileBroken){
			this.speed += DRIVE_POWER * boostMult;
		}
		if(this.keyHeld_Reverse &&  !this.inTileBroken) {
			this.speed -= REVERSE_POWER * boostMult;
		}

		// if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
		// }
		// Turning
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
		} // end car is below DRIFT_MIN_SPEED
	} // end handleControls

	this.carCarHandling =function(){
		for(var i = 0; i < carList.length; i++) {

				if(carList[i].pos.x != this.pos.x && carList[i].pos.y != this.pos.y){

					var xDistance = Math.pow((this.pos.x - carList[i].pos.x),2);
					var yDistance = Math.pow((this.pos.y - carList[i].pos.y),2);
					//safe distance to check collision points

					if(Math.sqrt(xDistance + yDistance) <= this.myCarPic.width/1.5){

						console.log("car to car collision!");
						screenshake(14);
						carCollisionSound.play();

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

						// set new velocity? no, this will cause cars to "steer" to the new angle
						//this.speed = Math.sqrt(newVelX1*newVelX1+newVelY1*newVelY1); // pythagoras
						//this.ang = Math.atan2(newVelY1,newVelX1);
						// normal speed and ang are already fine

						// allow sliding sideways by storing some additional momentum for use during car update
						this.skidSpeed = Math.sqrt(newVelX1*newVelX1+newVelY1*newVelY1); // pythagoras
						this.skidAngle = Math.atan2(newVelY1,newVelX1);

						// also bounce the other car
						//carList[i].speed = Math.sqrt(newVelX2*newVelX2+newVelY2*newVelY2); // pythagoras
						//carList[i].ang = Math.atan2(newVelY2,newVelX2);
						carList[i].skidSpeed = Math.sqrt(newVelX2*newVelX2+newVelY2*newVelY2); // pythagoras
						carList[i].skidAngle = Math.atan2(newVelY2,newVelX2);

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
		} // end for each car
	} // end carCarHandling
}// end car class


function initializeCollisionPoints(){
	var arr = [];
	for(var i = 0; i < CAR_COLLISION_POINTS; i++){
		arr.push({x:'',y:''});
	}
	return arr;
}

function stopControlsForDeadCar(whichCar) {
	if (whichCar.isDead) {  // shutting off all controls since car is dead.
		whichCar.keyHeld_Gas = false;
		whichCar.keyHeld_Reverse = false;
		whichCar.keyHeld_TurnLeft = false;
		whichCar.keyHeld_TurnRight = false;
		whichCar.keyHeld_Nos = false;
		whichCar.keyHeld_Shooting = false;
	}
}

function placeCarOnTrackTileType(whichCar, tileTypeToCheck) {
	whichCar.pos = findCenterPositionOfTileType(tileTypeToCheck);
	setTileAtPositionToType(whichCar.pos, TRACK_ROAD);
}

function playerResetCondition(){
	setTimeout(function(){
					if(playerLives > 1){

						playerLives--;
						resetCheckPoint();
					}
					else{
						resetLevel();
					}
				}, 1000);
}
