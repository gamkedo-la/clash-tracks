
let bullets = [];

class Bullet{
	constructor(x, y, angle,origin){
		this.x = x;
		this.y = y;
		this.speed = 7
		this.velocityX  = Math.cos(angle)*this.speed;
		this.velocityY = Math.sin(angle)*this.speed;
		this.height = 5;
		this.width = 5;
		this.damage = 1;
		this.remove = false;
		this.angle = angle;
		this.origin = origin;
	}

	move(){
		if(this.y < 0 && this.y > canvas.height && this.x > canvas.height && this.x < 0){
			this.remove = true;			
		}
		if(this.origin != null){
			this.x += this.velocityX + Math.cos(this.angle)*this.origin.speed;
			this.y += this.velocityY + Math.sin(this.angle)*this.origin.speed;
		}
		else{
			this.x += this.velocityX;
			this.y += this.velocityY;
		}
	}

	draw(){
		this.move();
		this.brickHandling();
		this.carHandling();
		drawBitmapCenteredWithRotation(playerBulletPic, this.x,this.y, this.angle - Math.PI/2)
		// colorRect(this.x, this.y, this.width, this.height, 'red');
	}

	carHandling() {
		for(var i = 0; i < carList.length; i++) {
			if (carList[i] != this.origin && carList[i].withinDistOfCollision(this.speed * 0.7, this.x, this.y)) {
				this.remove = true;
				bulletHitWallEffect(this.x,this.y);
				carList[i].gotHurt(this.damage);
			}
		}
	}

	brickHandling(){
      	var bulletTrackCol = Math.floor(this.x / TRACK_W);
		var bulletTrackRow = Math.floor(this.y / TRACK_H);
        if(bulletTrackCol >= 0 && bulletTrackCol < TRACK_COLS && bulletTrackRow >= 0 && bulletTrackRow < TRACK_ROWS) {
            let tileHere =returnTileTypeAtColRow(bulletTrackCol, bulletTrackRow);
            if( tileHere != TRACK_ROAD ) {
			   this.remove = true;
			   bulletHitWallEffect(this.x,this.y);	
            }
		}
	}
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
}