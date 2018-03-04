
// var this.drive_power = 0;
const REVERSE_POWER = 0.4;
const NOS_BOOST_MULT = 1.5;
const TURN_RATE = 0.04;
const DRIFT_TURN_RATE = 0.18;
const MIN_SPEED_TO_TURN = 1;
const DRIFT_MIN_SPEED = 2;
const INITIAL_HEALTH = 3;
const CAR_COLLISION_POINTS = 13;
var enemyCars = [];
var ai_distance = 250;
const SMOKESCREEN_RANGE = 128; // distance to a player car with smokescreen to be affected if you're an AI
const SMOKESCREEN_STEERING_DRIFT = 0.25; // +- this range in radians if an enemy hits smoke it makes steering mistakes
const SMOKESCREEN_SLOWDOWN_SCALE = 0.25; // ai speed is multiplied by this when distracted by smoke

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
	this.isInvincible = false;
	this.isDead = false;
	this.keyHeld_Nos = false;
	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	// this.keyHeld_Shooting = false;
	this.semiAutoLock = false;
	this.height = this.width = 44;
	this.CollisionPoints = initializeCollisionPoints(CAR_COLLISION_POINTS);
	this.bulletImg = "";
	this.inTileBroken = false;
	this.jumping = false;
	this.inJumpTile  = false;
	this.autoShoot = false; // only used for player.
	this.shadowColor = "gray";
	this.stuckOnWall = false;
	this.remove = false;
	this.trailColor = "rgb(46,148,193)";
	this.smokeScreenFramesRemaining = 0;
	this.inTrackPowerup = false;
	this.isPowered = false;
	this.invinciblePic;
	this.invincibleAngle = 0;
	this.splitShoot = false;
	this.isFollowing = false;
	this.resetAngle = 0;
	var leftPos = rightPos = frontPos = vector.create();

	// Clear tracks when creating a new car
	if (window.tireTracks) tireTracks.reset();

	this.shoot = function(){
		bullets.push(new bulletClass(this));
		if(this.name == 'Player'){
			shootSound.play();
			if(this.splitShoot){
				bullets.push(new bulletClass(this, this.ang + 0.5));
				bullets.push(new bulletClass(this, this.ang - 0.5));
			}
		}
		else{
			enemyShootSound.play();
		}
	}

	this.reset = function(whichImage, carName, carAngle = -Math.PI/2){
		this.isDead = false;
		this.isInvincible = false;
		this.autoShoot = false;
		this.stuckOnWall = false;
		this.inTileBroken = false;
		this.isInvincible = false;
		this.isPowered = false;
		this.splitShoot = false;
		this.health = INITIAL_HEALTH;
		this.name = carName;
		this.myCarPic = whichImage;
		this.ang = carAngle;
		this.prevAng = this.ang;
		this.speed = 0;
		this.skidSpeed = 0;
		this.skidAngle = 0;
		this.keyHeld_Nos = false;
		this.smokeScreenFramesRemaining = 0;
		this.nitroFramesRemaining = 0;
		this.invincibleAngle = 0;
	
		if (!this.invinciblePic) {
     		 this.invinciblePic = createTintedSprite(lightBallPic, '#9871b5');
		}

		var trackValueToCheck = 0;
		// console.log(carName);
		if(this.name == "Player"){
			trackValueToCheck = TRACK_PLAYERSTART;
			this.height = 25;
			this.weight = 44;
			this.bulletImg = playerBulletPic;
			this.trailColor = "rgb(46,148,193)";
			this.drive_power = 0.7;
		}

		else if(this.name == "Enemy"){
			trackValueToCheck = TRACK_ENEMYSTART;
			this.height = 18;
			this.weight = 44;
			this.isAI = true;
			this.bulletImg = enemyBulletPic;
			this.trailColor = "rgb(201, 102, 249)";
			this.drive_power = 0.55;
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
		if (!this.isInvincible) {
			if (this.name === "Player"){
				screenshake(15);
			}
			carCollisionEffect(this.pos.x, this.pos.y);
			this.health -= damageDealt;
			ai_distance = 150; // To show ai knows it has been hit and follows player.
			console.log("New health is " + this.health + " due to damage " + damageDealt);
			this.carHealthCheck(this);
		}			
	}

	this.carHealthCheck = function(carInstance){
		if (carInstance.health <= 0 && !carInstance.isDead && !carInstance.stuckOnWall) {
				// console.log("You got me this time! (car dead)");
				carInstance.isDead = true;
				carInstance.myCarPic = wreckedCarPic;
				if (carInstance.name === "Player") {
					slowSpeedGame();
					carSuckedSound.play();
					playerResetCondition();
					// normalSpeedGame();
				}
			}
	}


	this.move = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
		this.prevAng = this.ang;
		//TODO  Make ai cars rotate and dissapear on broken tiles
		//TODO Make Ai cars avoid broken tile slightly
		if(playerCar.smokeScreenFramesRemaining <= 0){
			playerCar.isPowered = false;
		}
		if (this.isAI) {
			// this.keyHeld_TurnRight = true;
			distancePlayerEnemy = distance(playerCar.pos.x,playerCar.pos.y,this.pos.x, this.pos.y)

			// may be affected by a smokeScreen
			if ((distancePlayerEnemy < SMOKESCREEN_RANGE) && (playerCar.smokeScreenFramesRemaining > 0))
			{
				console.log('Enemy is close to smokescreen');
				this.ang += Math.random()*SMOKESCREEN_STEERING_DRIFT*2-SMOKESCREEN_STEERING_DRIFT;
				this.speed *= SMOKESCREEN_SLOWDOWN_SCALE;
				smokeScreenEffect(this.pos.x,this.pos.y);
			}

			//need to change AI angle to match angle of player car
			//check what is 45 degree to the right and left of it.
			this.keyHeld_Gas = true;
			this.setAIMovementPoints();
			if(!this.isFollowing){
				this.steeringForAI();
			}
			
			
			if (!anyWallsBetweenTwoPoints(this.pos.x, this.pos.y, playerCar.pos.x, playerCar.pos.y)
					&& !debug && !this.isDead
					&& !playerCar.isDead
					&& !this.inTileBroken) {

					if(distancePlayerEnemy < ai_distance  ){

							// this.keyHeld_Gas = true;
							var dx = playerCar.pos.x - this.pos.x;
							var dy = playerCar.pos.y - this.pos.y;

							var angle = Math.atan2(dy, dx);
							this.keyHeld_Shooting = Math.random() < 0.2;
							this.isFollowing = true;
							this.ang = angle;
							
					}
			}
			else if (!debug || !this.isDead || !playerCar.isDead || !this.inTileBroken){
					this.keyHeld_Shooting = false;
					this.keyHeld_Gas = false;
			}

			else{
				this.isFollowing = false;
			}

		} // end if AI

		//only for player car.
		else{
				if(playerCar.autoShoot && Math.random() < 0.2){
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
		this.carCarHandling();
		this.carObstacleHandling();

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

		// regular trail behind the vehicle
		particles.add(this.pos.x,this.pos.y,particlePic,500,64,this.trailColor,0,this.ang-Math.PI);

		// smoke screen powerup
		if (this.smokeScreenFramesRemaining>0)
		{
			//console.log("smoking! " + this.smokeScreenFramesRemaining);

			this.smokeScreenFramesRemaining -= 1;

			smokeScreenEffect(this.pos.x,this.pos.y);
		}

    	this.nitroFramesRemaining -= 1;

		if (this.isInvincible) {
	      this.invincibleAngle -= .13;
	      if (this.invincibleAngle < 0) {
	      	this.invincibleAngle = Math.PI * 2;
				}
		}


	} // end move function


	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.pos.x ,this.pos.y, this.ang);
		// this.drawShadow(this.shadowColor);
		if (this.isInvincible) {
			drawBitmapCenteredWithRotation(this.invinciblePic, this.pos.x, this.pos.y, this.invincibleAngle);
   		 }
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

	this.steeringForAI = function(){
			if(trackCollisionCheck(frontPos.x, frontPos.y, goalCheck = false)){
				this.ang += 0.5;
			}

			if(trackCollisionCheck(leftPos.x, leftPos.y, goalCheck = false)){
				this.ang += 0.15;
			}

			if(trackCollisionCheck(rightPos.x, rightPos.y, goalCheck = false)){
				this.ang -= 0.15;
			}
	}

	this.setAIMovementPoints = function(){
		// Navigation for AI cars to see bricks are nearby
		frontPos.x = this.pos.x + Math.cos(this.ang)* this.width;
 		frontPos.y = this.pos.y + Math.sin(this.ang)* this.width;;
		leftPos.x =  this.pos.x + Math.cos(this.ang - Math.PI/5)* this.width -  Math.sin(this.ang - Math.PI/5)* this.width;
		leftPos.y =  this.pos.y + Math.cos(this.ang - Math.PI/5)* this.width +  Math.sin(this.ang - Math.PI/5)* this.width;
		rightPos.x = this.pos.x + Math.cos(this.ang + Math.PI/5)* this.width + Math.sin(this.ang + Math.PI/5)* this.width;
		rightPos.y = this.pos.y - Math.cos(this.ang + Math.PI/5)* this.width + Math.sin(this.ang + Math.PI/5)* this.width;

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
		if(this.keyHeld_Nos || (0 < this.nitroFramesRemaining)){
			boostMult *= NOS_BOOST_MULT;
		}
		// Acceleration
		if(this.keyHeld_Gas &&  !this.inTileBroken){
			this.speed += this.drive_power * boostMult;
		}
		if(this.keyHeld_Reverse &&  !this.inTileBroken) {
			this.speed -= REVERSE_POWER * boostMult;
		}
		// Turning
		if(Math.abs(this.speed) > DRIFT_MIN_SPEED){
			if(this.keyHeld_TurnLeft  && !this.jumping) {
				this.ang -= DRIFT_TURN_RATE;
			}
			if(this.keyHeld_TurnRight  && !this.jumping) {
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

	this.carObstacleHandling = function(){
		for(var i = 0; i < this.CollisionPoints.length; i++){

			for(var j = 0; j < oscillatingObstacleList.length; j++){

				if(distance(this.CollisionPoints[i].x,this.CollisionPoints[i].y, oscillatingObstacleList[j].pos.x, oscillatingObstacleList[j].pos.y) < 25){
					this.speed *= 0.5
					this.pos.x -= Math.cos(this.ang) * this.speed ;
					this.pos.y -= Math.sin(this.ang) * this.speed ;

					if(this.name == "Player" && !this.isDead && this.health > 0 && !this.isInvincible){
						this.health--;
						this.carHealthCheck(this);
						carCollisionEffect(this.pos.x, this.pos.y);
					}
				}
			}
		}
	}


	this.carCarHandling =function(){
		for(var i = 0; i < carList.length; i++) {

				if(carList[i].pos.x != this.pos.x && carList[i].pos.y != this.pos.y){
					var xDistance = Math.pow((this.pos.x - carList[i].pos.x),2);
					var yDistance = Math.pow((this.pos.y - carList[i].pos.y),2);
					//safe distance to check collision points

					if(Math.sqrt(xDistance + yDistance) <= this.myCarPic.width/1.5 && !this.jumping){
						console.log("car to car collision!");
						screenshake(14);
						carCollisionSound.play();
						console.log(this.health);
						if(this.isInvincible ){
							carList[i].health--;
							this.carHealthCheck(carList[i]);

							carList[i].pos.x -= Math.cos(carList[i].ang) * carList[i].speed;
							carList[i].pos.y -= Math.sin(carList[i].ang) * carList[i].speed;
							muzzleEffect(carList[i].pos.x, carList[i].pos.y);

						}
						if(carList[i].isInvincible){
							this.health--;
							this.carHealthCheck(this);
						}
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


function initializeCollisionPoints(points){
	var arr = [];
	for(var i = 0; i < points; i++){
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
  addDelayedCall(function(){
  					normalSpeedGame();
					if(playerLives > 1){
						playerLives--;
						resetCheckPoint();
						if(playerCar.resetAngle!=0){
							playerCar.ang = playerCar.resetAngle;
						}
					}
					else{
						playerCar.resetAngle = 0;
						resetLevel();
					}
				}, 1000);
}

function updateCollisionPoints(whichCar){
	//Center Point
	 whichCar.CollisionPoints[0].x = whichCar.pos.x;
	 whichCar.CollisionPoints[0].y = whichCar.pos.y;

	 //top Collision
	 whichCar.CollisionPoints[1].x = whichCar.pos.x +  Math.cos(whichCar.ang)* whichCar.width/2;
	 whichCar.CollisionPoints[1].y = whichCar.pos.y + Math.sin(whichCar.ang)* whichCar.width/2;;

	 //bottom collision
	 whichCar.CollisionPoints[2].x = whichCar.pos.x - Math.cos(whichCar.ang)*whichCar.width/2;
	 whichCar.CollisionPoints[2].y = whichCar.pos.y - Math.sin(whichCar.ang)* whichCar.width/2;;

	 //left collision
	 whichCar.CollisionPoints[3].x = whichCar.pos.x  + Math.sin(whichCar.ang)*whichCar.height/2; ;
	 whichCar.CollisionPoints[3].y = whichCar.pos.y - Math.cos(whichCar.ang)*whichCar.height/2;

	 //right collision
	 whichCar.CollisionPoints[4].x = whichCar.pos.x  - Math.sin(whichCar.ang)*whichCar.height/2;
	 whichCar.CollisionPoints[4].y = whichCar.pos.y + Math.cos(whichCar.ang)*whichCar.height/2;

	 //top right corner collision body
	 whichCar.CollisionPoints[5].x = whichCar.pos.x +  Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[5].y = whichCar.pos.y + Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;

	 //top left corner collision body
	 whichCar.CollisionPoints[6].x = whichCar.pos.x + Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[6].y = whichCar.pos.y - Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;

	 //bottom left corner collision body
	 whichCar.CollisionPoints[7].x = whichCar.pos.x -  Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[7].y = whichCar.pos.y - Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;

	 //bottom right corner collision body
	 whichCar.CollisionPoints[8].x = whichCar.pos.x - Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[8].y = whichCar.pos.y + Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;

	 //Collision points between middle and corner.
	 //top right corner collision body
	 whichCar.CollisionPoints[9].x = whichCar.pos.x +  Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3;
	 whichCar.CollisionPoints[9].y = whichCar.pos.y + Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3; ;

	 // top left corner collision body
	 whichCar.CollisionPoints[10].x = whichCar.pos.x + Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;
	 whichCar.CollisionPoints[10].y = whichCar.pos.y - Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;

	 //bottom left corner collision body
	 whichCar.CollisionPoints[11].x = whichCar.pos.x -  Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3;
	 whichCar.CollisionPoints[11].y = whichCar.pos.y - Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3; ;

	 //bottom right corner collision body
	 whichCar.CollisionPoints[12].x = whichCar.pos.x - Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;
	 whichCar.CollisionPoints[12].y = whichCar.pos.y + Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;
   
}