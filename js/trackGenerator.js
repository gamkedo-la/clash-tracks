

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

    console.log('Finished generating random level of length: '+data.length);

    return data;
}