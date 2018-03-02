let bullets = [];



var muzzleTicker = 0;

function bulletClass(origin,ang) {
	this.pos = vector.create();
	this.pos.x = origin.pos.x;
	this.pos.y = origin.pos.y;
	this.speed = 7
	this.velocity = vector.create();
	this.width = 5;
	this.damage = 1;
	this.remove = false;
	this.angle = ang || origin.ang;
	this.velocity.x = Math.cos(this.angle)*this.speed;
	this.velocity.y =Math.sin(this.angle)*this.speed;
	this.origin = origin;
	this.bulletPic = origin.bulletImg;

	this.move = function(){
		if(this.pos.y < 0 && this.pos.y > canvas.height && this.pos.x > canvas.height && this.pos.x < 0){
			this.remove = true;
		}
		if(this.origin != null){
			this.pos.x += this.velocity.x + Math.cos(this.angle)*Math.abs(this.origin.speed);
			this.pos.y += this.velocity.y + Math.sin(this.angle)*Math.abs(this.origin.speed);
		}
		else{
			this.pos.x += this.velocity.x;
			this.pos.y += this.velocity.y;
		}
	}

	this.draw = function(){
		drawBitmapCenteredWithRotation(this.bulletPic, this.pos.x,this.pos.y, this.angle - Math.PI/2);
	}

	this.update = function(){
		this.move();
		this.collisionHandling();
	}

	this.collisionHandling = function() {
		this.carHandling();
		this.brickHandling();
		this.overheadSpaceshipHandling();
	}

	this.carHandling = function() {
		for(var i = 0; i < carList.length; i++) {
			if (carList[i] != this.origin && carList[i].withinDistOfCollision(this.speed *0.9, this.pos.x, this.pos.y)) {
				this.remove = true;
				bulletHitWallEffect(this.pos.x,this.pos.y);
				carList[i].gotHurt(this.damage);
			}
		}
	}

	this.overheadSpaceshipHandling = function(){
		for(var i = 0; i < overheadSpaceshipList.length; i++) {
			if (this.origin == playerCar && playerCar.jumping && overheadSpaceshipList[i].withinDistOfCollision(this.speed *0.9, this.pos.x, this.pos.y)) {
				this.remove = true;
				bulletHitWallEffect(this.pos.x,this.pos.y);
				overheadSpaceshipList[i].gotHurt(this.damage);
			}
		}
	}
	this.brickHandling = function(){
		let tileHere = returnTileTypeAtPixelXY(this.pos.x, this.pos.y);
		if( trackTypeIsPassable(tileHere) == false ) {
			this.remove = true;

			//VFX and SFX only if player car is close by (Offscreen laser hits don't cause sound etc.)
			if(distance(playerCar.pos.x, playerCar.pos.y, this.pos.x, this.pos.y ) < 500){
				bulletHitWallEffect(this.pos.x,this.pos.y);
				bulletHitSound.play();
				// screenshake(5);
			}
		}
  	} // en brickHandling

}

function drawBullets(){
	for(var i = 0; i < bullets.length; i++){
		bullets[i].draw();
	}  // each bullet
} // end drawBullets

function removeBullets(){
	for(var i = 0; i < bullets.length; i++){
		if(bullets[i].remove){
			bullets.splice(i,1);
		} // bullet to be removed
	} // each bullet
} // end removeBullets

function updateBullets(){
	for(var i = 0; i < bullets.length; i++) {
		bullets[i].update();
	} // each bullet
	removeBullets();
} // end updateBullets

function spawnBulletWithoutOriginObject(fromX,fromY,withAng,startGap) {
	var tempObj = {pos:{x:fromX+Math.cos(withAng)*startGap,
						y:fromY+Math.sin(withAng)*startGap},
					ang: withAng,
					speed: 0,
					bulletImg: turretPic};
	// laserSound.play();
	bullets.push(new bulletClass(tempObj));

}