const OBSTACLE_COLLISION_POINTS = 4;
var counter = 0;
setInterval(function(){counter++}, 400)

function obstacleClass(velocityX = 5, velocityY= 0) {
	this.pos = vector.create(0, 0);
	this.velocity = vector.create(velocityX, velocityY);
	this.obstaclePic; // which picture to use
	this.width = 52;
	this.height = 51;
	this.CollisionPoints = initializeCollisionPoints(OBSTACLE_COLLISION_POINTS);
	
	this.frameNow = 0;


	this.reset = function() {
		
		// this.pic = alienBallAnimPic;
		this.pic = alienBallAnimPic;

		placeEntityOnTrackTileType(this, TRACK_BALL);

	} // end of carReset func


	this.move = function() {
		this.pos = this.pos.add(this.velocity);
		updateObstacleCollisionPoints(this);
		if(obstacleTrackHandling(this)){

			this.velocity = this.velocity.multiply(-1);
		}		
	}

	this.draw = function() {
		// drawBitmapCenteredWithRotation(this.pic, this.pos.x,this.pos.y, this.ang);
		
		// counter++;
		
		// canvasContext.drawImage(this.pic,
		// 			0,0,this.width,this.height,
		// 			this.pos.x,this.pos.y,this.width,this.height);
		
		// 1, 2, 3, 4
		this.frameNow = counter%4;
		canvasContext.drawImage(this.pic,
	                        this.frameNow * this.width + this.frameNow*2, 0,
	                        this.width, this.height,
	                        this.pos.x - this.width / 2, this.pos.y - this.height/2,
	                        this.width, this.height)
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


