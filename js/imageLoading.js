var playerCarPic = document.createElement("img");
var enemyCarPic = document.createElement("img");
var wreckedCarPic = document.createElement("img");
var particlePic = document.createElement("img");
var playerBulletPic = document.createElement("img");
var enemyBulletPic = document.createElement("img");
var tireTrackPic = document.createElement("img");
var shipOverheadPic = document.createElement("img");
var dropBombPic = document.createElement("img");
var turretPic = document.createElement("img");
var lightBallPic = document.createElement("img");
var alienBallPic = document.createElement("img");
var alienBallAnimPic = document.createElement("img");
var splitShootPic = document.createElement("img");

var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	// console.log(picsToLoad);
	if(picsToLoad == 0) {
		mainMenu();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: playerCarPic, theFile: "playercar.png"},
		{varName: enemyCarPic, theFile: "enemycar.png"},
		{varName: wreckedCarPic, theFile: "wreckedcar.png"},
		{varName: particlePic, theFile: "particle.png"},
		{varName: playerBulletPic, theFile: "playerBullet.png"},
		{varName: enemyBulletPic, theFile: "enemyBullet.png"},
		{varName: tireTrackPic, theFile: "lightTrail.png"},
		{varName: shipOverheadPic, theFile: "shipOverhead.png"},
		{varName: dropBombPic, theFile: "dropBomb.png"},
		{varName: turretPic, theFile: "turret.png"},
		{varName: lightBallPic, theFile: "lightBall.png"},
		{varName: alienBallPic, theFile: "alienBall.png"},
		{varName: alienBallAnimPic, theFile: "alienBallAnim.png"},
		{varName: splitShootPic, theFile: "splitBullet.png"},


    	{trackType: TRACK_ROAD, theFile: "track_road.png"},
		{trackType: TRACK_WALL, theFile: "track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal.png"},
		{trackType: TRACK_CHECKPOINT_FLAG, theFile: "track_disk.png"},
    	{trackType: TRACK_BRICKS_VIOLET, theFile: "alienBricks_violet.png"},
		{trackType: TRACK_BRICKS_BLUE, theFile: "alienBricks_blue.png"},
	    {trackType: TRACK_BUILDING_RED, theFile: "red_building.png"}, 
	    {trackType: TRACK_BUILDING_BLUE, theFile: "blue_building.png"}, 
	    {trackType: TRACK_BUILDING_VIOLET, theFile: "violet_building.png"},
	    {trackType: TRACK_JUMP_TILE, theFile: "jumpTile.png"},
	    {trackType: TRACK_SMOOTH, theFile: "sliperyRoad.png"},
	    {trackType: TRACK_ROAD_BROKEN, theFile: "track_road_broken.png"},
	    {trackType: TRACK_MINE, theFile: "track_mine_sheet.png"},
    	{trackType: TRACK_LASER_TOWER, theFile: "track_laser_tower.png"},
		{trackType: TRACK_POWERUP, theFile: "powerup.png"},

	];

	picsToLoad = imageList.length;
	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		else{
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
	}
}
