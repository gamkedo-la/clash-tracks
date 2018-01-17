let bullets = [];

function bulletClass(x, y, angle,origin) {
	this.pos = vector.create();
	this.pos.x = x;
	this.pos.y = y;
	this.speed = 7
	this.velocity = vector.create();
	this.velocity.x = Math.cos(angle)*this.speed;
	this.velocity.y =Math.sin(angle)*this.speed;	
	this.width = 5;
	this.damage = 1;
	this.remove = false;
	this.angle = angle;
	this.origin = origin;

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
		this.move();
		this.brickHandling();
		this.carHandling();
		drawBitmapCenteredWithRotation(playerBulletPic, this.pos.x,this.pos.y, this.angle - Math.PI/2)
	}

	this.carHandling = function() {
		for(var i = 0; i < carList.length; i++) {
			if (carList[i] != this.origin && carList[i].withinDistOfCollision(this.speed * 0.7, this.pos.x, this.pos.y)) {
				this.remove = true;
				bulletHitWallEffect(this.pos.x,this.pos.y);
				carList[i].gotHurt(this.damage);
			}
		}
	}

	this.brickHandling = function(){
		let tileHere = returnTileTypeAtPixelXY(this.pos.x, this.pos.y);
		if( tileHere != TRACK_ROAD ) {
			this.remove = true;
			bulletHitWallEffect(this.pos.x,this.pos.y);	
		}
	} // en brickHandling

}

function drawBullets(){
	//drawing
	for(var i = 0; i < bullets.length; i++){
		bullets[i].draw();
	}
	//removing
	for(var i = 0; i < bullets.length; i++){
		if(bullets[i].remove){
			bullets.splice(i,1);
		}
	}
} // end drawBullets