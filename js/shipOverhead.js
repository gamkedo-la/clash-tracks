
const SHIP_OVERHEAD_AGGRO_RANGE = 400;
const SHIP_OVERHEAD_AGGRO_BUFFER = 7;
const SHIP_OVERHEAD_SPEED = 6;

function shipOverheadClass() {
	this.pos = vector.create();
	this.ang = -Math.PI/2;
	this.target = null;
	
	this.reset = function() {
		placeShipOnTrack(this, TRACK_SHIP_OVERHEAD_START);
		this.setTarget(playerCar);
	}
	
	this.setTarget = function(newTarget) {
		this.target = newTarget;
	}
	
	this.followTarget = function() {
		if(this.target == null) {
			console.log("no target found");
			return;
		}
		var distToTarget = distance(this.target.pos.x,this.target.pos.y, this.pos.x,this.pos.y);
		if(distToTarget <= SHIP_OVERHEAD_AGGRO_RANGE) {
			var dx = this.target.pos.x - this.pos.x;
			var dy = this.target.pos.y - this.pos.y;
			this.ang = Math.atan2(dy, dx);
			
			if(distToTarget > SHIP_OVERHEAD_AGGRO_BUFFER) {
				var distanceRatio = 1 - (distToTarget / SHIP_OVERHEAD_AGGRO_RANGE);
				this.pos.x += Math.cos(this.ang) * SHIP_OVERHEAD_SPEED * distanceRatio;
				this.pos.y += Math.sin(this.ang) * SHIP_OVERHEAD_SPEED * distanceRatio;
			}
		} // end ship is close enough to follow target
	} // end followTarget
	
	this.move = function() {
		this.followTarget();
	}
	
	this.draw = function() {
		drawBitmapCenteredWithRotation(shipOverheadPic, this.pos.x,this.pos.y, this.ang);
	}
}

function placeShipOnTrack(whichShip, tileTypeToCheck) {
	whichShip.pos = findCenterPositionOfTileType(tileTypeToCheck);
	setTileAtPositonToType(whichShip.pos, TRACK_ROAD);
}