//calculates distance
function distance(x1, y1, x2, y2) {
    var xd = x2 - x1;
    var yd = y2 - y1;
    return Math.sqrt(xd * xd + yd * yd);
}

// maps a value in one range to another
function map(value, start1, stop1, start2, stop2){
  return Math.abs(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)));
}
