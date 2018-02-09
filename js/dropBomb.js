const DROPBOMB_EXPLOSION_RADIUS = 250;
const DROPBOMB_SPEED = 7;
const DROPBOMB_LIFETIME = 1 * framesPerSecond;
const DROPBOMB_SPIN_SPEED = Math.PI/15;
const DROPBOMB_DAMAGE = 1;

function dropBombClass(origin) {
	this.pos = vector.create();
	this.pos.x = origin.pos.x;
	this.pos.y = origin.pos.y;
	this.ang = 0.0;
	this.target = vector.create();
	this.target.x = origin.target.pos.x;
	this.target.y = origin.target.pos.y;
	this.remove = false;
	this.lifetime = DROPBOMB_LIFETIME;
	this.ticking = false;
	
	this.move = function() {
		var dx = this.target.x - this.pos.x;
		var dy = this.target.y - this.pos.y;
		var moveAng = Math.atan2(dy, dx);
		
		var dist = distance(this.target.x, this.target.y, this.pos.x, this.pos.y);
		
		if(dist > DROPBOMB_SPEED) {
			this.pos.x += Math.cos(moveAng) * DROPBOMB_SPEED;
			this.pos.y += Math.sin(moveAng) * DROPBOMB_SPEED;
		}
		else {
			this.pos = this.target;
			this.ticking = true;
		}
		
		this.ang += DROPBOMB_SPIN_SPEED;
	}
	
	this.countdownTick = function() {
		this.lifetime--;
		if(this.lifetime == 0) {
			detonateDropBomb(this);
		}
	}
	
	this.carHandling = function() {
		for(var i = 0; i < carList.length; i++) {
			var distToCar = distance(this.pos.x, this.pos.y, carList[i].pos.x,carList[i].pos.y);
			if(DROPBOMB_EXPLOSION_RADIUS < distToCar) {
				continue;
			}
			if (!anyWallsBetweenTwoPoints(this.pos.x,this.pos.y, carList[i].pos.x,carList[i].pos.y)) {
				carList[i].gotHurt(1);
			}
		}
	}
	
	this.update = function() {
		if(this.ticking) {
			this.countdownTick();
		}
		else {
			this.move();
		}
	}
	this.draw = function()
	{
		drawBitmapCenteredWithRotation(dropBombPic, this.pos.x,this.pos.y, this.ang);
		
		if(debug) {
			colorCircle(this.pos.x,this.pos.y, DROPBOMB_EXPLOSION_RADIUS, 'rgba(255,255,0,0.2)');
		}
	}
}

function detonateDropBomb(whichBomb) {
	whichBomb.carHandling();
	whichBomb.remove = true;
	sparksEffect(whichBomb.pos.x,whichBomb.pos.y);
}


