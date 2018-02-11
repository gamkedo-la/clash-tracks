var playerCarPic = document.createElement("img");
var enemyCarPic = document.createElement("img");
var wreckedCarPic = document.createElement("img");
var particlePic = document.createElement("img");
var playerBulletPic = document.createElement("img");
var enemyBulletPic = document.createElement("img");
var tireTrackPic = document.createElement("img");
var shipOverheadPic = document.createElement("img");
var dropBombPic = document.createElement("img");
var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	// console.log(picsToLoad);
	if(picsToLoad == 0) {
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
    // {trackType: TRACK_ROAD, theFile: "track_road.png"},
		{trackType: TRACK_ROAD, theFile: "violet_track_road.png"},

		{trackType: TRACK_WALL, theFile: "track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal.png"},
		{trackType: TRACK_DISK, theFile: "track_disk.png"},
		// {trackType: TRACK_CITIES, theFile: "aliencities.png"},
		{trackType: TURRET_BACKGROUND, theFile: "turretBackground.png"},
		{trackType: TURRET, theFile: "turret.png"},
    {trackType: TRACK_BRICKS_VIOLET, theFile: "alienBricks_violet.png"},
		{trackType: TRACK_BRICKS_BLUE, theFile: "alienBricks.png"},

    {trackType: TRACK_2_BUILDINGS_1, theFile: "violet_perspective_building_1.png"}, //level 3
    {trackType: TRACK_2_BUILDINGS_2, theFile: "violet_two_buildings_1.png"},
    {trackType: TRACK_2_BUILDINGS_3, theFile: "violet_two_buildings_2.png"},
    {trackType: TRACK_2_BUILDINGS_4, theFile: "violet_perspective_building_1_1.png"}, //level 2
    {trackType: TRACK_3_BUILDINGS_2, theFile: "violet_three_buildings_1.png"},
    {trackType: TRACK_3_BUILDINGS_1, theFile: "violet_perspective_building_2.png"},
    {trackType: TRACK_3_BUILDINGS_3, theFile: "violet_three_buildings_2.png"},
    {trackType: TRACK_3_BUILDINGS_4, theFile: "violet_perspective_building_3.png"},
    {trackType: TRACK_4_BUILDINGS_1, theFile: "bad_skyscrapper_violet.png"},
    {trackType: TRACK_JUMP_TILE, theFile: "jumpTile.png"},
    {trackType: TRACK_SMOOTH, theFile: "sliperyRoad.png"},
    {trackType: TRACK_ROAD_BROKEN, theFile: "track_road_broken.png"},
    {trackType: TRACK_MINE, theFile: "track_mine_sheet.png"},
    {trackType: TRACK_TIMER_POWERUP, theFile: "timer_increase_powerup.png"},
    {trackType: TRACK_LASER_TOWER, theFile: "track_laser_tower.png"},

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
