
const CAM_SCROLL_SPEED = 6;

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