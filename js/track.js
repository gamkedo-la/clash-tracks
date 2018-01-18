const TRACK_W = 70;
const TRACK_H = 70;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 36;

var levelOne = [ 21, 21, 21, 21, 22, 23, 21, 22, 23, 21, 22, 23, 21, 22, 23, 21, 22, 23, 21, 5,
				 21, 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21,
				 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21,
				 21, 0, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 0, 21,
				 21, 0, 0, 21, 21, 6, 6, 6, 6, 6, 6, 21, 21, 21, 21, 21, 21, 0, 0, 21,
				 21, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 0, 0, 21, 0, 0, 21,
				 21, 0, 7, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 0, 0, 0, 21, 0, 0, 21,
				 21, 0, 0, 21, 0, 0, 0, 0, 0, 21, 21, 0, 0, 4, 0, 0, 21, 0, 0, 21,
				 21, 0, 0, 21, 0, 0, 0, 0, 0, 0, 21, 0, 0, 21, 0, 0, 21, 0, 0, 21,
				 21, 0, 0, 21, 0, 0, 4, 0, 0, 0, 4, 0, 0, 21, 0, 0, 21, 0, 0, 21,
				 21, 2, 0, 21, 0, 0, 21, 21, 0, 0, 0, 0, 0, 21, 0, 0, 4, 0, 0, 21,
				 21, 21, 21, 21, 0, 0, 21, 21, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 21,
				 21, 0, 0, 0, 0, 0, 21, 6, 21, 0, 0, 0, 21, 21, 0, 0, 0, 0, 0, 21,
				 21, 0, 0, 0, 0, 0, 21, 6, 6, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
				 21, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 5,
				 21, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 6, 6, 5, 5,
				 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 6, 6, 5,
				 21, 0, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 0, 21, 6, 6,
				 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 4, 0, 0, 0, 21, 6,
				 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 4, 0, 0, 21, 21,
				 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 21, 21, 0, 0, 21, 21,
				 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 21, 21, 0, 0, 21, 21,
				 21, 0, 0, 4, 21, 4, 0, 0, 21, 0, 0, 4, 0, 0, 21, 21, 0, 0, 21, 21,
				 21, 0, 0, 21, 6, 21, 0, 0, 4, 0, 0, 21, 0, 0, 21, 21, 0, 0, 21, 21,
				 21, 0, 0, 21, 6, 21, 0, 0, 0, 0, 0, 21, 0, 0, 21, 21, 0, 0, 21, 21,
				 21, 0, 0, 21, 6, 6, 21, 0, 0, 0, 0, 21, 0, 0, 4, 0, 0, 21, 21, 21,
				 21, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 0, 0, 0, 21, 21, 21,
				 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 4, 21, 21, 21,
				 21, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 21, 21, 21, 21,
				 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21,
				 21, 6, 6, 6, 6, 6, 6, 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21,
				 21, 6, 6, 6, 6, 6, 6, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 21,
				 21, 0, 0, 0, 0, 3, 6, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 21,
				 21, 0, 5, 5, 5, 6, 6, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 21,
				 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21,
				 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
				 ];

var trackGrid = [];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_DISK = 4;
const TRACK_CITIES = 5;
const TRACK_BRICKS = 6;
const TRACK_ENEMYSTART = 7;
const TRACK_2_BUILDINGS_1 = 21;
const TRACK_3_BUILDINGS_1 = 22;
const TRACK_3_BUILDINGS_2 = 23;

const CAM_SCROLL_SPEED = 6

var track_cols = 20;
var track_rows = 36;
var trackGrid = [];

var carLeftBottomPointX,carLeftBottomPointY;
var camPanX = 0.0;
var camPanY = 0.0;

const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 60;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 60;

function returnTileTypeAtColRow(col, row) {

	if(col >= 0 && col < track_cols &&
		row >= 0 && row < track_rows) {
		 var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return trackGrid[trackIndexUnderCoord];
	}
	else {
		return TRACK_WALL;
	}

}

function returnTileTypeAtPixelXY(pixelX, pixelY) {

	var trackCol = Math.floor(pixelX / TRACK_W);
	var trackRow = Math.floor(pixelY / TRACK_H);
	return returnTileTypeAtColRow(trackCol, trackRow);

}

function carTrackHandling(whichCar) {

	 updateCollisionPoints(whichCar);

	 for(var i = 0; i < whichCar.CollisionPoints.length; i++){
	 	// console.log("car" + whichCar.name +  whichCar.CollisionPoints[i].x);
	 	var carTrackCol = Math.floor((whichCar.CollisionPoints[i].x) / TRACK_W);
		var carTrackRow = Math.floor((whichCar.CollisionPoints[i].y) / TRACK_H);
		var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

		if(carTrackCol >= 0 && carTrackCol < track_cols &&
			carTrackRow >= 0 && carTrackRow < track_rows) {

			var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );

			if(tileHere == TRACK_GOAL) {
				level++;
				if(level < levels.length){
					resetLevel();
				}
				else{
					console.log('You saved Humanity')
					level = 0;
					resetLevel();
				}
			} 

			else if(tileHere != TRACK_ROAD) {

				// next two lines added to fix a bug, mentioned in video 9.6
				// undoes the car movement which got it onto the wall

				wallCollisionEffect(whichCar.CollisionPoints[i].x,whichCar.CollisionPoints[i].y)

				whichCar.pos.x -= Math.cos(whichCar.ang) * whichCar.speed;
				whichCar.pos.y -= Math.sin(whichCar.ang) * whichCar.speed ;
				whichCar.ang += 0.05;
				whichCar.speed *= -0.5;
				break;

			} // end of track found
		} // end of valid col and row
	 }//end of collision for loop
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + track_cols * row;
}

//scroll cam
function cameraFollow() {

    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;
    var playerDistFromCameraFocusX = Math.abs(playerCar.pos.x - cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(playerCar.pos.y -cameraFocusCenterY);

    /*if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      if(cameraFocusCenterX < playerCar.x)  {
        camPanX += CAM_SCROLL_SPEED;
      } else {
        camPanX -= CAM_SCROLL_SPEED;
      }
    }
    if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      if(cameraFocusCenterY < playerCar.y)  {
        camPanY += CAM_SCROLL_SPEED;
      } else {
        camPanY -= CAM_SCROLL_SPEED;
      }
    }*/

    camPanX += 0.13*(playerCar.pos.x - cameraFocusCenterX);
    camPanY += 0.13*(playerCar.pos.y - cameraFocusCenterY);
    // instantCamFollow();
    // this next code blocks the game from showing out of bounds
    // (this isn't required, if you don't mind seeing beyond edges)
    if(camPanX < 0) {
      camPanX = 0;
    }
    if(camPanY < 0) {
      camPanY = 0;
    }
    var maxPanRight = track_cols * TRACK_W - canvas.width;
    var maxPanTop = track_rows * TRACK_H - canvas.height;
    if(camPanX > maxPanRight) {
      camPanX = maxPanRight;
    }
    if(camPanY > maxPanTop) {
      camPanY = maxPanTop;
    }
}

function drawTracks() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for(var eachRow=0;eachRow<track_rows;eachRow++) {
		for(var eachCol=0;eachCol<track_cols;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tileKindHere];

			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += TRACK_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TRACK_H;
		drawTileX = 0;
	} // end of for each row

} // end of drawTracks func

function anyWallsBetweenTwoPoints(x1, y1, x2, y2) {

	var isBlocked = false;
	var testX = x1, testY = y1;
	var stepsNeeded = (distance(x1, y1, x2, y2) / TRACK_W) * 2;
	var stepX = (x2 - x1) / stepsNeeded;
	var stepY = (y2 - y1) / stepsNeeded;

	for (var i = 0; i < stepsNeeded; i++) {
		testX += stepX;
		testY += stepY;
		if (debug) {
			colorCircle(testX, testY, 10, 'yellow');
		}
		if (returnTileTypeAtPixelXY(testX, testY) != TRACK_ROAD) {
			isBlocked = true;
			break;
		}
	}

	if (debug) {
		colorLine(x1, y1, x2, y2, isBlocked ? 'red' : 'lime');
	}
	return isBlocked;
}

function updateCollisionPoints(whichCar){
	//Center Point
	 whichCar.CollisionPoints[0].x = whichCar.pos.x;
	 whichCar.CollisionPoints[0].y = whichCar.pos.y;

	 //top Collision
	 whichCar.CollisionPoints[1].x = whichCar.pos.x +  Math.cos(whichCar.ang)* whichCar.width/2; 
	 whichCar.CollisionPoints[1].y = whichCar.pos.y + Math.sin(whichCar.ang)* whichCar.width/2;;

	 //bottom collision
	 whichCar.CollisionPoints[2].x = whichCar.pos.x - Math.cos(whichCar.ang)*whichCar.width/2;
	 whichCar.CollisionPoints[2].y = whichCar.pos.y - Math.sin(whichCar.ang)* whichCar.width/2;;

	 //left collision 
	 whichCar.CollisionPoints[3].x = whichCar.pos.x  + Math.sin(whichCar.ang)*whichCar.height/2; ;
	 whichCar.CollisionPoints[3].y = whichCar.pos.y - Math.cos(whichCar.ang)*whichCar.height/2;

	 //right collision
	 whichCar.CollisionPoints[4].x = whichCar.pos.x  - Math.sin(whichCar.ang)*whichCar.height/2;
	 whichCar.CollisionPoints[4].y = whichCar.pos.y + Math.cos(whichCar.ang)*whichCar.height/2;

	 //top right corner collision body
	 whichCar.CollisionPoints[5].x = whichCar.pos.x +  Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4; 
	 whichCar.CollisionPoints[5].y = whichCar.pos.y + Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4; ;

	 //top left corner collision body
	 whichCar.CollisionPoints[6].x = whichCar.pos.x + Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[6].y = whichCar.pos.y - Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;

	 //bottom left corner collision body
	 whichCar.CollisionPoints[7].x = whichCar.pos.x -  Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4; 
	 whichCar.CollisionPoints[7].y = whichCar.pos.y - Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4; ;

	 //bottom right corner collision body
	 whichCar.CollisionPoints[8].x = whichCar.pos.x - Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[8].y = whichCar.pos.y + Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;

	 //Collision points between middle and corner.
	 //top right corner collision body
	 whichCar.CollisionPoints[9].x = whichCar.pos.x +  Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3; 
	 whichCar.CollisionPoints[9].y = whichCar.pos.y + Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3; ;

	 // top left corner collision body
	 whichCar.CollisionPoints[10].x = whichCar.pos.x + Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;
	 whichCar.CollisionPoints[10].y = whichCar.pos.y - Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;

	 //bottom left corner collision body
	 whichCar.CollisionPoints[11].x = whichCar.pos.x -  Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 +  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3; 
	 whichCar.CollisionPoints[11].y = whichCar.pos.y - Math.cos(whichCar.ang - Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang - Math.PI/7)* whichCar.width/3; ;

	 //bottom right corner collision body
	 whichCar.CollisionPoints[12].x = whichCar.pos.x - Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;
	 whichCar.CollisionPoints[12].y = whichCar.pos.y + Math.cos(whichCar.ang + Math.PI/7)* whichCar.width/3 -  Math.sin(whichCar.ang + Math.PI/7)* whichCar.width/3;
}

