
let bullets = [];

class Bullet{
	
	constructor(x, y, angle){
		this.x = x;
		this.y = y;
		this.speed = 5
		this.velocityY = Math.sin(angle)*(this.speed + playerCar.speed);
		this.velocityX  = Math.cos(angle)*(this.speed + playerCar.speed);
		this.height = 5;
		this.width = 5;
		this.remove = false;
	}

	move(){
	

		if(this.y < 0 && this.y > canvas.height && this.x > canvas.height && this.x < 0){
			this.remove = true;			

		
		}
			this.y += this.velocityY;
			this.x += this.velocityX
	}

	draw(){
		this.move();
		// this.brickHandling();
		colorRect(this.x, this.y, this.width, this.height, 'red');
	}

	// brickHandling(){
 //        let ballBrickCol = Math.floor(this.x / (BRICK_WIDTH )) ;
 //        let ballBrickRow = Math.floor(this.y / (BRICK_HEIGHT )) ;
        
        
 //        if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
 //            let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
 //            if(bricks[brickIndexUnderBall] != 0) {
 //                bricks[brickIndexUnderBall] = 0;
 //                bricksLeft--;
 //                bullets.pop();
 //                if(bricksLeft == 0 && numLives > 0) {
 //                    goToNextLevel();
 //                } // out of bricks
 //            }
	// 	}
	// }

}


function drawBullets(){
	//drawing
	for(var i = 0; i < bullets.length; i++){
		bullets[i].draw();
	}


	for(var i = 0; i < bullets.length; i++){
		if(bullets[i].remove){
			bullets.splice(i,1);
		}
	}

	//removing


}