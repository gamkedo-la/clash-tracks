const TRACK_W = 70;
const TRACK_H = 70;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 36;
const CAM_SCROLL_SPEED = 6
var levelOne = [ 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5,
				 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 1, 1, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 7, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 6, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5,
				 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 5, 5,
				 1,	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 5,
				 1,	0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 6, 6,
				 1,	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0, 1, 6,
				 1,	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 1, 1, 
				 1,	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 
				 1,	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 
				 1,	0, 0, 4, 1, 4, 0, 0, 1, 0, 0, 4, 0, 0, 1, 1, 0, 0, 1, 1,
				 1,	0, 0, 1, 6, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 
				 1,	0, 0, 1, 6, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 
				 1,	0, 0, 1, 6, 6, 1, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1, 1, 1, 
				 1,	0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 
				 1,	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 1, 1, 1, 
				 1,	4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 
				 1,	1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1,	6, 6, 6, 6, 6, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
				 1,	6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 
				 1,	5, 5, 5, 5, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 
				 1,	5, 5, 5, 5, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 
				 1,	5, 5, 5, 5, 6, 6, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
				 1,	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
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

// var carCornerPoints = [{},{},{},{}];
var carLeftBottomPointX,carLeftBottomPointY;



var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 60;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 60;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < TRACK_COLS &&
		row >= 0 && row < TRACK_ROWS) {
		 var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return trackGrid[trackIndexUnderCoord];
	} else {
		return TRACK_WALL;
	}
}

function carTrackHandling(whichCar) {
	

	//Center Point
	 whichCar.CollisionPoints[0].x = whichCar.x;
	 whichCar.CollisionPoints[0].y = whichCar.y;

	 //top Collision
	 whichCar.CollisionPoints[1].x = whichCar.x +  Math.cos(whichCar.ang )* whichCar.width/2; 
	 whichCar.CollisionPoints[1].y = whichCar.y + Math.sin(whichCar.ang )* whichCar.width/2;;

	 //bottom collision
	 whichCar.CollisionPoints[2].x = whichCar.x - Math.cos(whichCar.ang )*whichCar.width/2;
	 whichCar.CollisionPoints[2].y = whichCar.y - Math.sin(whichCar.ang )* whichCar.width/2;;

	 //left collision 
	 whichCar.CollisionPoints[3].x = whichCar.x  + Math.sin(whichCar.ang )*whichCar.height/2; ;
	 whichCar.CollisionPoints[3].y = whichCar.y - Math.cos(whichCar.ang )*whichCar.height/2;

	 //right collision
	 whichCar.CollisionPoints[4].x = whichCar.x  - Math.sin(whichCar.ang )*whichCar.height/2;
	 whichCar.CollisionPoints[4].y = whichCar.y + Math.cos(whichCar.ang )*whichCar.height/2;



	 //right corner collision body
	 whichCar.CollisionPoints[5].x = whichCar.x +  Math.cos(whichCar.ang )* whichCar.width/3 -  Math.sin(whichCar.ang )* whichCar.width/3; 
	 whichCar.CollisionPoints[5].y = whichCar.y + Math.cos(whichCar.ang )* whichCar.width/3 +  Math.sin(whichCar.ang )* whichCar.width/3; ;

	 //left collision body
	 whichCar.CollisionPoints[6].x = whichCar.x   + Math.cos(whichCar.ang )* whichCar.width/3 +  Math.sin(whichCar.ang )* whichCar.width/3;
	 whichCar.CollisionPoints[6].y = whichCar.y - Math.cos(whichCar.ang )* whichCar.width/3 +  Math.sin(whichCar.ang )* whichCar.width/3;

	 //bottom left corner collision body
	 whichCar.CollisionPoints[7].x = whichCar.x -  Math.cos(whichCar.ang )* whichCar.width/3 +  Math.sin(whichCar.ang )* whichCar.width/3; 
	 whichCar.CollisionPoints[7].y = whichCar.y - Math.cos(whichCar.ang )* whichCar.width/3 -  Math.sin(whichCar.ang )* whichCar.width/3; ;

	 //bottom right corner collision body
	 whichCar.CollisionPoints[8].x = whichCar.x   - Math.cos(whichCar.ang )* whichCar.width/3 -  Math.sin(whichCar.ang )* whichCar.width/3;
	 whichCar.CollisionPoints[8].y = whichCar.y + Math.cos(whichCar.ang )* whichCar.width/3 -  Math.sin(whichCar.ang )* whichCar.width/3;




	 // console.log(carLeftBottomPointX);

	 for(var i = 0; i < whichCar.CollisionPoints.length; i++){

	 	// console.log("car" + whichCar.name +  whichCar.CollisionPoints[i].x);
	 
	 	var carTrackCol = Math.floor((whichCar.CollisionPoints[i].x) / TRACK_W);
		var carTrackRow = Math.floor((whichCar.CollisionPoints[i].y) / TRACK_H);
		var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

		if(carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
			carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
			var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );

			if(tileHere == TRACK_GOAL) {
				console.log(whichCar.name + " WINS!");
				loadLevel(levelOne);
			} else if(tileHere != TRACK_ROAD) {
				// next two lines added to fix a bug, mentioned in video 9.6
				// undoes the car movement which got it onto the wall

			
				whichCar.x -= Math.cos(whichCar.ang ) * whichCar.speed;
				whichCar.y -= Math.sin(whichCar.ang ) * whichCar.speed ;
			
				whichCar.speed *= -0.4;

			} // end of track found
		} // end of valid col and row

	 }

    

	
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}


function cameraFollow() {
    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;

    var playerDistFromCameraFocusX = Math.abs(playerCar.x - cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(playerCar.y -cameraFocusCenterY);

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

    camPanX += 0.13*(playerCar.x - cameraFocusCenterX);
    camPanY += 0.13*(playerCar.y - cameraFocusCenterY);


    // instantCamFollow();

    // this next code blocks the game from showing out of bounds
    // (this isn't required, if you don't mind seeing beyond edges)
    if(camPanX < 0) {
      camPanX = 0;
    }
    if(camPanY < 0) {
      camPanY = 0;
    }
    var maxPanRight = TRACK_COLS * TRACK_W - canvas.width;
    var maxPanTop = TRACK_ROWS * TRACK_H - canvas.height;
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
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {

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

