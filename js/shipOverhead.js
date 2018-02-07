
const SHIP_OVERHEAD_AGGRO_RANGE = 300;
const SHIP_OVERHEAD_AGGRO_BUFFER = 7;
const SHIP_OVERHEAD_AGRRO_SPEED = 8;
const SHIP_OVERHEAD_IDLE_SPEED = 3;
const SHIP_OVERHEAD_MIN_SPEED = 2;

function shipOverheadClass() {
	this.pos = vector.create();
	this.ang = -Math.PI/2;
	this.target = null;
	this.nextWayPoint = vector.create();
	this.followingTarget = false;
	this.movingToWaypoint = false;
	
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
			return;
		}
		// Add attack code here.
	} // end attackTarget
	
	this.move = function() {
		this.followTarget();
		this.moveToWayPoint();

		this.attackTarget();
	}
	
	this.draw = function() {
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
	setTileAtPositonToType(whichShip.pos, TRACK_ROAD);
}