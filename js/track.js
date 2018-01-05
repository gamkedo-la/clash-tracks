const TRACK_W = 60;
const TRACK_H = 60;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const CAM_SCROLL_SPEED = 6
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
				 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

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
	var carTrackCol = Math.floor(whichCar.x / TRACK_W);
	var carTrackRow = Math.floor(whichCar.y / TRACK_H);
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
			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
			whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

			whichCar.speed *= -0.5;
		} // end of track found
	} // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}


function cameraFollow() {
    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;

    var playerDistFromCameraFocusX = Math.abs(blueCar.x - cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(blueCar.y -cameraFocusCenterY);

    /*if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      if(cameraFocusCenterX < blueCar.x)  {
        camPanX += CAM_SCROLL_SPEED;
      } else {
        camPanX -= CAM_SCROLL_SPEED;
      }
    }
    if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      if(cameraFocusCenterY < blueCar.y)  {
        camPanY += CAM_SCROLL_SPEED;
      } else {
        camPanY -= CAM_SCROLL_SPEED;
      }
    }*/

    camPanX += 0.15*(blueCar.x - cameraFocusCenterX);
    camPanY += 0.15*(blueCar.y - cameraFocusCenterY);


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

function drawOnlyTracksOnScreen() {
	 //what are the top-left most col and row visible on canvas?
  var cameraLeftMostCol = Math.floor(camPanX / TRACK_W);
  var cameraTopMostRow = Math.floor(camPanY / TRACK_H);

  // how many columns and rows of tiles fit on one screenful of area?
  var colsThatFitOnScreen = Math.floor(canvas.width / TRACK_W);
  var rowsThatFitOnScreen = Math.floor(canvas.height / TRACK_H);

  // finding the rightmost and bottommost tiles to draw.
  // the +1 and + 2 on each pushes the new tile popping in off visible area
  // +2 for columns since TRACK_W doesn't divide evenly into canvas.width
  var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
  var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {
 	 for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
 		 var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
 		 var tileKindHere = trackGrid[arrayIndex];
 		 var useImg = trackPics[tileKindHere];

 		 canvasContext.drawImage(useImg,drawTileX,drawTileY);
 		 drawTileX += TRACK_W;
 		 arrayIndex++;

 	 } // end of for eachRow
 	 drawTileY += TRACK_H;
 	 drawTileX = 0;
  } // end of for eachCol
 // } // end of drawBricks()
}
