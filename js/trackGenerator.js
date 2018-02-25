

// just a fun little track generator
// coded by mcfunkypants for clash tracks at gamkedo

function generateRandomTrack(w,h) {

    console.log("Generating random track...");

    var data = [];
    var row, col, loop, spriteNum;

    // sprite numbers of things we want randomly sprinkled on the map
    var coolthings = [
        TRACK_JUMP_TILE,
        TRACK_SMOOTH,
        TRACK_ROAD_BROKEN,
        TRACK_TIMER_POWERUP,
//        TURRET_BACKGROUND,
        TRACK_BUILDING_RED,
        TRACK_BUILDING_BLUE,
        TRACK_BUILDING_VIOLET,
        SKYSCRAPER_VIOLET,
        TRACK_POWERUP,
        TRACK_POWERUP_SMOKESCREEN
    ];

    var numCoolThings = Math.round(w*h/10); // 10% coverage

    // fill
    for (row=0; row<h; row++) {
        for (col=0; col<w; col++) {
            data[col+row*w] = TRACK_ROAD;
        }
    }

    // maze generation lol
    // mazeGeneration(data,w); // work in progress

    // horiz borders
    for (col=0; col<w; col++) {
            data[col+0*w] = TRACK_WALL;
            data[col+(h-1)*w] = TRACK_WALL;
    }
    
    // vert borders
    for (row=0; row<h; row++) {
            data[0+row*w] = TRACK_WALL;
            data[w-1+row*w] = TRACK_WALL;
    }

    // random things anywhere except the borders
    for (loop=0; loop<numCoolThings; loop++)
    {
        row = Math.floor(Math.random()*(h-2))+1;
        col = Math.floor(Math.random()*(w-2))+1;
        spriteNum = coolthings[Math.floor(Math.random()*coolthings.length)];
        data[col+row*w] = spriteNum;
    }

    // mandatory objects
    data[Math.floor(Math.random()*w)+Math.floor(Math.random()*h)*w] = TRACK_GOAL;
    data[Math.floor(Math.random()*w)+Math.floor(Math.random()*h)*w] = TRACK_CHECKPOINT_FLAG;
    data[Math.floor(Math.random()*w)+Math.floor(Math.random()*h)*w] = TRACK_ENEMYSTART;
    data[Math.floor(Math.random()*w)+Math.floor(Math.random()*h)*w] = TRACK_CHECKPOINT;
    data[Math.floor(Math.random()*w)+Math.floor(Math.random()*h)*w] = TRACK_SHIP_OVERHEAD_START
    data[Math.floor(Math.random()*w)+Math.floor(Math.random()*h)*w] = TRACK_PLAYERSTART;

    // FIXME: create a "look for an empty tile" array random index function:
    // so that none of these random tiles can overlap (to avoid rare edge case bugs)

    //console.log('Finished generating random level of length: '+data.length);

    return data;
}


// Maze Generator, used in an old game of mine called Gates of Rath
// Algorithm credit: http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze
function mazeGeneration(world, size) {
    console.log('maze gen...');
    // Coordinates of N(x,y) S(x,y) E(x,y) W(x,y)
    // it's necessary to have one of each so that if one direction
    // doesn't work properly, we can try each direction until one
    // works, or that we know there isn't a location possible. 
    var cN = [[0, 0], [0, 0], [0, 0], [0, 0]];
    var x, y, cx, cy;
    var randomDir, intDone = 0;
    var map = new Array(size);
    var failed = false; // avoid infinite loop
    for (var i = 0; i <= size * size; ++i) {
        map[i] = new Array(size);
    }
    // Initialize the Map Array to Zeros 
    for (x = 1; x <= size; ++x) {
        for (y = 1; y <= size; ++y) {
            map[x][y] = 0;
        } //end for
    } //end for
    var recursecount = 0;
    do {
        recursecount++;
        if (recursecount % 25 == 0) console.log('Maze gen recursing ' + recursecount);
        if (recursecount > 2000) {
            console.log('MAZE GEN FAILED - took too long...');
            failed = true; // no infinite loops, invalid is fine!
            //return;
        }
        // Roll random x's and y's and make sure the value is odd
        x = 2 + Math.floor(Math.random() * (size - 1)); if (x % 2 != 0)--x;
        y = 2 + Math.floor(Math.random() * (size - 1)); if (y % 2 != 0)--y;
        // Ensure that the first random map location starts the process
        if (intDone == 0) map[x][y] = 1;
        if (map[x][y] == 1) {
            //Randomize Directions
            randomDir = Math.floor(Math.random() * 4);
            if (randomDir == 0) {
                cN = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            } else if (randomDir == 1) {
                cN = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            } else if (randomDir == 2) {
                cN = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            } else if (randomDir == 3) {
                cN = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            } //end if
            blnBlocked = 1;
            do {
                blnBlocked++;
                for (var intDir = 0; intDir <= 3; ++intDir) {
                    // Determine which direction the tile is
                    cx = x + cN[intDir][0] * 2;
                    cy = y + cN[intDir][1] * 2;
                    //Check to see if the tile can be used
                    if (cx < size && cy < size && cx > 1 && cy > 1) {
                        if (map[cx][cy] != 1) {
                            //create destination location
                            map[cx][cy] = 1;
                            //create current location
                            map[x][y] = 1;
                            //create inbetween location
                            map[x + cN[intDir][0]][y + cN[intDir][1]] = 1;
                            //set destination location to current
                            x = cx; y = cy;
                            blnBlocked = 0;
                            intDone++;
                            intDir = 4;
                        } //end if
                    } //end if
                } //end for
                //recursive, no directions found, loop back a node
            } while (blnBlocked == 1) //end do
        } //end if
    } while (!failed && (intDone + 1 < ((size - 1) * (size - 1)) / 4)); //end do

    // copy the data over in the format we need for the game
    for (x = 1; x <= size; ++x) {
        for (y = 1; y <= size; ++y) {
            world[(x-1)+(y-1)*size] = map[x][y];
        }
    }

    console.log('Maze Generation Complete!');

}