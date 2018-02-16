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

var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	// console.log(picsToLoad);
	if(picsToLoad == 0) {
		//fadeInIntroThenStartGame(); //Uncomment this line and comment imageLoadingDoneSoStartGame to see intro before game loads
		imageLoadingDoneSoStartGame();
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

    {trackType: TRACK_ROAD, theFile: "track_road.png"},
		{trackType: TRACK_WALL, theFile: "track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal.png"},
		{trackType: TRACK_CHECKPOINT_FLAG, theFile: "track_disk.png"},
    {trackType: TRACK_BRICKS_VIOLET, theFile: "alienBricks_violet.png"},
		{trackType: TRACK_BRICKS_BLUE, theFile: "alienBricks_blue.png"},
    {trackType: TRACK_BUILDING_RED, theFile: "red_building.png"}, //level 3
    {trackType: TRACK_BUILDING_BLUE, theFile: "blue_building.png"}, //level 2
    {trackType: TRACK_BUILDING_VIOLET, theFile: "violet_building.png"},
    {trackType: SKYSCRAPER_VIOLET, theFile: "skyscrapper_violet.png"},
    {trackType: TRACK_JUMP_TILE, theFile: "jumpTile.png"},
    {trackType: TRACK_SMOOTH, theFile: "sliperyRoad.png"},
    {trackType: TRACK_ROAD_BROKEN, theFile: "track_road_broken.png"},
    {trackType: TRACK_MINE, theFile: "track_mine_sheet.png"},
    {trackType: TRACK_TIMER_POWERUP, theFile: "timer_increase_powerup.png"},
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
