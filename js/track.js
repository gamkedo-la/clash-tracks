const TRACK_W = 70;
const TRACK_H = 70;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 36;
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_DISK = 4;
const TRACK_CITIES = 5;
const TRACK_BRICKS = 6;
const TRACK_ENEMYSTART = 7;
const TRACK_CHECKPOINT  =  8;
const TRACK_JUMP_TILE = 9;
const TRACK_SMOOTH = 10;
const TRACK_ROAD_BROKEN = 11;
const TURRET = 18;
const TURRET_BACKGROUND = 19;
const TRACK_2_BUILDINGS_1 = 20; //border brick 1
const TRACK_2_BUILDINGS_2 = 21; //2 building (smaller)l->r
const TRACK_2_BUILDINGS_3 = 22; //2 buildings (smaller) r-> l
const TRACK_2_BUILDINGS_4 = 23; //border brick engraved
const TRACK_3_BUILDINGS_1 = 24; // border brick 2
const TRACK_3_BUILDINGS_2 = 25; // 3 building descending
const TRACK_3_BUILDINGS_3 = 26;	// 3 building ascending
const TRACK_3_BUILDINGS_4 = 27; //complete top down //hut bright top
const TRACK_4_BUILDINGS_1 = 28; //skyscraper inclined right
const TRACK_MINE = 50;
const TRACK_LASER_TOWER = 51;

var trackGrid = [];
var trackGridCopy = []; //checkpoint

var animTileOscillatorFrame = 0;

//TODO Make Wall Code Numbers Occur in Sequence and Update Track Data
//TODO Slippery Track Road Bug

var track_cols = 20;
var track_rows = 36;
var trackGrid = [];

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

   //checking if the center point is in broken tile
	 //TODO if center point is a bit more inside the broken tile

	 	var carTrackCol = Math.floor((whichCar.pos.x) /TRACK_W);
		var carTrackRow = Math.floor((whichCar.pos.y)/TRACK_H);
		var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
		//TODO Stop showing particle effects if car is dead and stuck on wall after some
		// specific interval
		//TODO If car collision body turns out to be true simulataneously. Reset the car to the Last Position.
		//TODO Reset car to nearest point and not last checkpoint on wall stuck

		if(carTrackCol >= 0 && carTrackCol < track_cols &&
			carTrackRow >= 0 && carTrackRow < track_rows) {
			var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );
			if(tileHere != TRACK_ROAD
				&& tileHere != TRACK_JUMP_TILE
				&& tileHere != TRACK_ROAD_BROKEN
				&& tileHere != TRACK_CHECKPOINT
			  && !whichCar.stuckOnWall
			){

				setTimeout(function(){
					whichCar.myCarPic = wreckedCarPic;
					whichCar.isDead = true;}, 500);
					whichCar.stuckOnWall = true;
					if(whichCar.name == "Player"){
						playerResetCondition();

					}

			}

			if(tileHere == TRACK_MINE) {
				trackGrid[trackIndexUnderCar] = TRACK_ROAD; // remove mine
				mineDetonatesEffect(carTrackCol*TRACK_W+TRACK_W/2,
									carTrackRow*TRACK_H+TRACK_H/2);
			}

			//code for handling car and broken tile collision
			if(tileHere == TRACK_ROAD_BROKEN){
				whichCar.ang += 0.25;
				whichCar.speed = 0;
				//check if center of car is in tile broken
				if(!whichCar.inTileBroken && !whichCar.isDead){
					this.health = 0;
					whichCar.inTileBroken = true;
					setTimeout(function(){
						whichCar.myCarPic = wreckedCarPic;
						whichCar.isDead = true;}, 500);

					if(whichCar.name == 'Player'){
						  playerResetCondition();
					}
				}
			}

			if(tileHere == TRACK_JUMP_TILE){
				if(!whichCar.inJumpTile){
					whichCar.speed *= 2;
					whichCar.jumping = true;
					setTimeout(function(){whichCar.jumping = false; whichCar.inJumpTile = false;}, 500);
					whichCar.inJumpTile = true;
				}
			}
		}

		if(!whichCar.stuckOnWall){
			for(var i = 0; i < whichCar.CollisionPoints.length; i++){
			 // console.log("car" + whichCar.name +  whichCar.CollisionPoints[i].x);
			 if( trackCollisionCheck(whichCar.CollisionPoints[i].x, whichCar.CollisionPoints[i].y, whichCar.name)){

				if(!whichCar.isAI) {
					screenshake(10);
				}
				wallCollisionEffect(whichCar.CollisionPoints[i].x,whichCar.CollisionPoints[i].y)
				
				// @todo see if this way of setting cars back to a previous postion fixes the enemy cars pushing player past walls
				var test_place_car_back = true;				
				if(!test_place_car_back) {
					// old way
					whichCar.pos.x -= Math.cos(whichCar.ang) * whichCar.speed;
					whichCar.pos.y -= Math.sin(whichCar.ang) * whichCar.speed;
				}
				else
				{
					// proposed new way
					whichCar.pos.x = whichCar.prevPos.x;
					whichCar.pos.y = whichCar.prevPos.y;
				}
				// whichCar.ang += 0.05;
				whichCar.speed *= -0.5;
				break;
			 }

			}//end of collision for loop
		}
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + track_cols * row;
}

function drawTracks() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	animTileOscillatorFrame++; // used to cycle frames for animated types

	for(var eachRow=0;eachRow<track_rows;eachRow++) {
		for(var eachCol=0;eachCol<track_cols;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = trackGrid[arrayIndex];
			var useImg;
			if(tileKindHere == TRACK_CHECKPOINT || tileKindHere == TRACK_PLAYERSTART){ //Removes checkpoint bug
				useImg = trackPics[TRACK_ROAD];
			}
			else{
				useImg = trackPics[tileKindHere];
			}
			if(tileKindHere == TURRET){
				canvasContext.drawImage(trackPics[TURRET_BACKGROUND],drawTileX,drawTileY);
			}

			if(tileKindHere == TRACK_LASER_TOWER) {
				var turretTick = Math.floor(animTileOscillatorFrame*0.1)%13;
				if(turretTick < 4) {
					spawnBulletWithoutOriginObject(drawTileX+TRACK_W/2,
													drawTileY+TRACK_H/2,
													(Math.PI*0.5)*turretTick,
													TRACK_W/2);
				}
			}

			if(tileKindHere == TRACK_MINE) {
				canvasContext.drawImage(useImg,
					(Math.floor(animTileOscillatorFrame*0.075)%4)*TRACK_W,0,TRACK_W,TRACK_H,
					drawTileX,drawTileY,TRACK_W,TRACK_H);
			} else {
				canvasContext.drawImage(useImg,drawTileX,drawTileY);
			}
			drawTileX += TRACK_W;
			arrayIndex++;
		} // end of for each col
		drawTileX = 0;
		drawTileY += TRACK_H;
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
		var trackKind = returnTileTypeAtPixelXY(testX, testY) ;
		if (!trackTypeIsPassable(trackKind)) {
			isBlocked = true;
			break;
		}
	}

	if (debug) {
		colorLine(x1, y1, x2, y2, isBlocked ? 'red' : 'lime');
	}
	return isBlocked;
}

function trackTypeIsPassable(checkTrackType)
{
	switch (checkTrackType)
	{
		case TRACK_ROAD:
		case TRACK_ROAD_BROKEN:
		case TRACK_JUMP_TILE:
		case TRACK_PLAYERSTART:
		case TRACK_CHECKPOINT:
		case TRACK_SMOOTH:
		case TRACK_MINE:
			return true;
		default:
			return false;
	}
}

function updateCollisionPoints(whichCar){
{	//Center Point
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
	 whichCar.CollisionPoints[5].y = whichCar.pos.y + Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;

	 //top left corner collision body
	 whichCar.CollisionPoints[6].x = whichCar.pos.x + Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[6].y = whichCar.pos.y - Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;

	 //bottom left corner collision body
	 whichCar.CollisionPoints[7].x = whichCar.pos.x -  Math.cos(whichCar.ang)* whichCar.width/4 +  Math.sin(whichCar.ang)* whichCar.width/4;
	 whichCar.CollisionPoints[7].y = whichCar.pos.y - Math.cos(whichCar.ang)* whichCar.width/4 -  Math.sin(whichCar.ang)* whichCar.width/4;

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
}
//goal Check is used to check goal collision is checked only for player car.
function trackCollisionCheck(x,y,goalCheck){
	var carTrackCol = Math.floor(x / TRACK_W);
	var carTrackRow = Math.floor(y / TRACK_H);
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	if(carTrackCol >= 0 && carTrackCol < track_cols &&
		carTrackRow >= 0 && carTrackRow < track_rows ) {

		var tileHere = returnTileTypeAtColRow( carTrackCol,carTrackRow );

		//check for checkpoint
		if(tileHere == TRACK_CHECKPOINT || tileHere == TRACK_PLAYERSTART){
			// tileHere = TRACK_ROAD;
			for(var i = 0; i < trackGridCopy.length; i++){
				if(trackGridCopy[i] == TRACK_PLAYERSTART){ // if playerstart is found, remove it
					trackGridCopy[i] = TRACK_ROAD;
				}
			}
			trackGridCopy[trackIndexUnderCar] = TRACK_PLAYERSTART; //add new player start
		}

		if(goalCheck){
			if(tileHere == TRACK_GOAL) {
				loadNextLevel();
			}
		}

		return !trackTypeIsPassable(tileHere);
	} // end of valid col and row
	return true; // Disallow car to drive offscreen
} // end trackCollisionCheck

function loadNextLevel() {
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