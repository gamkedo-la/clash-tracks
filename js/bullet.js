
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
		this.brickHandling();
		colorRect(this.x, this.y, this.width, this.height, 'red');
	}

	brickHandling(){
      	var bulletTrackCol = Math.floor(this.x / TRACK_W);
		var bulletTrackRow = Math.floor(this.y / TRACK_H);
        
        
        if(bulletTrackCol >= 0 && bulletTrackCol < TRACK_COLS && bulletTrackRow >= 0 && bulletTrackRow < TRACK_ROWS) {
            let tileHere =returnTileTypeAtColRow(bulletTrackCol, bulletTrackRow);
            if( tileHere != TRACK_ROAD ) {
               this.remove = true;	
            }
		}
	}

// 	function carTrackHandling(whichCar) {
// 	var carTrackCol = Math.floor(whichCar.x / TRACK_W);
// 	var carTrackRow = Math.floor(whichCar.y / TRACK_H);
// 	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

// 	if(carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
// 		carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
// 		var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );

// 		if(tileHere == TRACK_GOAL) {
// 			console.log(whichCar.name + " WINS!");
// 			loadLevel(levelOne);
// 		} else if(tileHere != TRACK_ROAD) {
// 			// next two lines added to fix a bug, mentioned in video 9.6
// 			// undoes the car movement which got it onto the wall
// 			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
// 			whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

// 			whichCar.speed *= -0.5;
// 		} // end of track found
// 	} // end of valid col and row
// } // end of carTrackHandling func

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