function obstacleClass() {
	this.x = 75;
	this.y = 75;
	this.ang = 0;
	this.speed = 15;
	this.obstaclePic; // which picture to use

	this.reset = function() {
		
		this.pic = alienBallPic;
		for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(trackGrid[arrayIndex] == TRACK_BALL) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.x = eachCol * TRACK_W + TRACK_W/2;
					this.y = eachRow * TRACK_H + TRACK_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO TRACK_BALL TILE FOUND");
	} // end of carReset func

	this.move = function() {
		
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.pic, this.x,this.y, this.ang);
	}
}

