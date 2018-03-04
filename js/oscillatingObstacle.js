const OBSTACLE_COLLISION_POINTS = 4;

function obstacleClass(velocityX = 5, velocityY= 0) {
	this.pos = vector.create(0, 0);
	this.velocity = vector.create(velocityX, velocityY);
	this.obstaclePic; // which picture to use
	this.width = 52;
	this.height = 51;
	this.CollisionPoints = initializeCollisionPoints(OBSTACLE_COLLISION_POINTS);
	var counter = 0;


	this.reset = function() {
		
		// this.pic = alienBallAnimPic;
		this.pic = alienBallPic;

		for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(trackGrid[arrayIndex] == TRACK_BALL) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.pos.x = eachCol * TRACK_W + TRACK_W/2;
					this.pos.y = eachRow * TRACK_H + TRACK_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO OBSTACLE START FOUND!");
	} // end of obstacleReset func

	this.move = function() {
		// console.log(this.pos.x);
		// c
		// this.pos.x += this.velocity.x;
		// this.pos.y += this.velocity.y;
		this.pos = this.pos.add(this.velocity);
		updateObstacleCollisionPoints(this);
		if(obstacleTrackHandling(this)){

			this.velocity = this.velocity.multiply(-1);
		}
				
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.pic, this.pos.x,this.pos.y, this.ang);
		
		counter++;
		
		// canvasContext.drawImage(this.pic,
		// 			0,0,this.width,this.height,
		// 			this.pos.x,this.pos.y,this.width,this.height);

		// canvasContext.drawImage(this.pic,
	 //                        this.frameNow * this.width, 0,
	 //                        this.width, this.height,
	 //                        this.pos.x - this.width / 2, this.pos.y - this.height,
	 //                        this.animPicWidth, this.animPicHeight
	}
}


function updateObstacleCollisionPoints(whichObstacle){
	//left
	 whichObstacle.CollisionPoints[0].x = whichObstacle.pos.x - whichObstacle.width/2;
	 whichObstacle.CollisionPoints[0].y = whichObstacle.pos.y;

	 //right
	 whichObstacle.CollisionPoints[1].x = whichObstacle.pos.x +  whichObstacle.width/2;
	 whichObstacle.CollisionPoints[1].y = whichObstacle.pos.y;

	 //bottom 
	 whichObstacle.CollisionPoints[2].x = whichObstacle.pos.x;
	 whichObstacle.CollisionPoints[2].y = whichObstacle.pos.y + whichObstacle.height/2;

	 //top
	 whichObstacle.CollisionPoints[3].x = whichObstacle.pos.x;
	 whichObstacle.CollisionPoints[3].y = whichObstacle.pos.y - whichObstacle.height/2;
}


