const SHIP_OVERHEAD_AGGRO_RANGE = 300;
const SHIP_OVERHEAD_AGGRO_BUFFER = 7;
const SHIP_OVERHEAD_AGRRO_SPEED = 12;
const SHIP_OVERHEAD_IDLE_SPEED = 3;
const SHIP_OVERHEAD_MIN_SPEED = 2;
const SHIP_OVERHEAD_ATTACK_RATE = 1.1 * framesPerSecond;

function shipOverheadClass() {
	this.pos = vector.create();
	this.ang = -Math.PI/2;
	this.target = null;
	this.nextWayPoint = vector.create();
	this.followingTarget = false;
	this.movingToWaypoint = false;
	this.attackTimer = SHIP_OVERHEAD_ATTACK_RATE;
	this.health = 3;
	this.isdead = false;
	this.remove = false;

	this.reset = function() {
		placeShipOnTrack(this, TRACK_SHIP_OVERHEAD_START);
		this.setTarget(playerCar);
	}

	this.setTarget = function(newTarget) {
		this.target = newTarget;
	}

	this.followTarget = function() {
		if(this.target == null) {
			console.log("ERROR: no target found");
			return;
		}
		this.followingTarget = false;
		var distToTarget = distance(this.target.pos.x,this.target.pos.y, this.pos.x,this.pos.y);

		if(distToTarget <= SHIP_OVERHEAD_AGGRO_RANGE) {
			var dx = this.target.pos.x - this.pos.x;
			var dy = this.target.pos.y - this.pos.y;
			this.ang = Math.atan2(dy, dx);
			this.followingTarget = true;

			if(distToTarget > SHIP_OVERHEAD_AGGRO_BUFFER) {
				var distanceRatio = 1 - (distToTarget / SHIP_OVERHEAD_AGGRO_RANGE);
				var shipSpeed = SHIP_OVERHEAD_AGRRO_SPEED * distanceRatio;
				shipSpeed = (shipSpeed < SHIP_OVERHEAD_MIN_SPEED) ? SHIP_OVERHEAD_MIN_SPEED : shipSpeed;

				// may be affected by a smokeScreen
				if ((distToTarget < SMOKESCREEN_RANGE) && (playerCar.smokeScreenFramesRemaining > 0))
				{
					console.log('Ship is close to smokescreen');
					this.ang += Math.random()*SMOKESCREEN_STEERING_DRIFT*2-SMOKESCREEN_STEERING_DRIFT;
					shipSpeed *= SMOKESCREEN_SLOWDOWN_SCALE;
					smokeScreenEffect(this.pos.x,this.pos.y);
				}

				this.pos.x += Math.cos(this.ang) * shipSpeed;
				this.pos.y += Math.sin(this.ang) * shipSpeed;
			}

		} // end ship is close enough to follow target
	} // end followTarget

	this.moveToWayPoint = function() {
		if(this.followingTarget) {
			this.movingToWaypoint = false;
			return;
		}

		if(this.movingToWaypoint) {
			var distToTarget = distance(this.nextWayPoint.x,this.nextWayPoint.y, this.pos.x,this.pos.y);
			if(distToTarget > SHIP_OVERHEAD_IDLE_SPEED) {
				this.pos.x += Math.cos(this.ang) * SHIP_OVERHEAD_IDLE_SPEED;
				this.pos.y += Math.sin(this.ang) * SHIP_OVERHEAD_IDLE_SPEED;
			}
			else {
				this.movingToWaypoint = false;
			}
		} // end move towards waypoint
		else {
			chooseNewWaypoint(this);
		} // end choose new waypoint
	} // end moveToWayPoint

	this.attackTarget = function() {
		if(!this.followingTarget) {
			this.attackTimer = SHIP_OVERHEAD_ATTACK_RATE;
			return;
		}
		// Add attack code here.
		this.attackTimer--;
		if(this.attackTimer == 0) {
			this.attackTimer = SHIP_OVERHEAD_ATTACK_RATE;
			bullets.push(new dropBombClass(this));
		}
	} // end attackTarget


	this.withinDistOfCollision = function(dist, testX, testY) {

		var distToShip = distance(this.pos.x, this.pos.y, testX, testY);
		if (distToShip > shipOverheadPic.width/2) {
			return;  // nowhere near close enough to bother checking individual points
		}
		
		return true;

	}

	this.gotHurt = function(){
		this.health--;
		if(this.health <= 0){
			this.remove = true;
			mineDetonatesEffect(this.pos.x, this.pos.y,20.0,0.5);
			carHitSound.play();

		}
	}

	this.move = function() {
		this.followTarget();
		this.moveToWayPoint();
		this.attackTarget();
	}

	this.draw = function() {
		particles.add(this.pos.x,this.pos.y,particlePic,1000,32,"rgb(255,255,32)",0,this.ang-Math.PI);
		drawBitmapCenteredWithRotation(shipOverheadPic, this.pos.x,this.pos.y, this.ang);
	}
}

function chooseNewWaypoint(whichShip) {
	whichShip.movingToWaypoint = true;

	whichShip.nextWayPoint.x = Math.random() * track_cols * TRACK_W;
	whichShip.nextWayPoint.y = Math.random() * track_rows * TRACK_H;

	var dx = whichShip.nextWayPoint.x - whichShip.pos.x;
	var dy = whichShip.nextWayPoint.y - whichShip.pos.y;
	whichShip.ang = Math.atan2(dy, dx);
}

function placeShipOnTrack(whichShip, tileTypeToCheck) {
	whichShip.pos = findCenterPositionOfTileType(tileTypeToCheck);
	setTileAtPositionToType(whichShip.pos, TRACK_ROAD);
}


function removeSpaceship(){
	for(var i = 0; i < overheadSpaceshipList.length; i++){
		if(overheadSpaceshipList[i].remove){
			overheadSpaceshipList.splice(i,1);
		} // overheadSpaceship to be removed
	} // each spaceship
} // end removeSpaceship