function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function colorLine(x1, y1, x2, y2, color) {
	canvasContext.strokeStyle = color;
	canvasContext.beginPath();
	canvasContext.moveTo(x1, y1);
	canvasContext.lineTo(x2, y2);
	canvasContext.stroke();
}

// takes an image and colors and fades it as required
// returns a new canvas we can use as a sprite
// reuses the same temp buffer over and over for performance reasons
var _tintImageCanvas = document.createElement('canvas');
var _tintImageCTX = _tintImageCanvas.getContext('2d');
function tintImage (image, color) {
	_tintImageCanvas.width = image.width;
	_tintImageCanvas.height = image.height;
	_tintImageCTX.fillStyle = color;
	_tintImageCTX.fillRect(0, 0, _tintImageCanvas.width, _tintImageCanvas.height);
	_tintImageCTX.globalCompositeOperation = 'destination-atop';
	_tintImageCTX.globalAlpha = 1;
	_tintImageCTX.drawImage(image, 0, 0);
	return _tintImageCanvas;
}
  
// creates a brand new sprite in a new color
function createTintedSprite (image, color) {
var newCanvas = document.createElement('canvas');
var newContext = newCanvas.getContext('2d');
newCanvas.width = image.width;
newCanvas.height = image.height;
newContext.fillStyle = color;
newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
newContext.globalCompositeOperation = 'destination-atop';
newContext.globalAlpha = 1;
newContext.drawImage(image, 0, 0);
return newCanvas;
}

// draw a rotated colored alpha faded sprite! (warning: costly, use sparingly)
function drawImageTinted(canvasContext, image, x, y, angle, color, opacity) {
canvasContext.save();
canvasContext.translate(x, y);
if (angle !== undefined) {
  canvasContext.rotate(angle);
}
if (opacity != null) canvasContext.globalAlpha = opacity;
canvasContext.drawImage(tintImage(image,color), -image.width / 2, -image.height / 2);
canvasContext.restore();
}

function drawImageRotatedAlpha(canvasContext, image, x, y, angle, opacity) {
canvasContext.save();
canvasContext.translate(x, y);
if (angle !== undefined) {
  canvasContext.rotate(angle);
}
if (opacity != null) canvasContext.globalAlpha = opacity;
canvasContext.drawImage(image, -image.width / 2, -image.height / 2);
canvasContext.restore();
}