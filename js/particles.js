// a very simple particle system that rotates scales and fades sprites

var particles = new particleSystem();

function particleSystem() {

    var particle = [];
        
    this.add = function(x, y, sprite, life, size, color, rotationSpeed, forcedAngle, velX, velY) {

        var p, pnum, pcount;
        if (velX==undefined) velX = 0;
        if (velY==undefined) velY = 0;
        
        if (rotationSpeed==undefined) rotationSpeed = Math.random()*3-2;
        if (forcedAngle==undefined) forcedAngle = 0;

        for (pnum = 0, pcount = particle.length; pnum < pcount; pnum++)
        {
            p = particle[pnum];
            if (p && p.inactive) { break; } // found one we can reuse
        }

        // we need a new explosion!
        if (!p || !p.inactive)
        {
            //console.log('No inactive explosions. Adding explosion #' + pcount);
            var newParticle = { inactive : true };
            // remember this new explosion in our system and reuse
            particle.push(newParticle);
            p = newParticle;
        }

        if (p && p.inactive) {
            p.x = x;
            p.y = y;
            p.inactive = false;
            p.sprite = sprite;
            p.size = size;
            p.life = life;
            p.birth = (new Date()).getTime();
            p.death = p.birth + life;
            p.color = color;
            p.angle = forcedAngle;
            p.alpha = 1;
            p.rotSpd = rotationSpeed;
            p.velX = velX;
            p.velY = velY;
        }

    }

    this.update = function()
    {
        // get the current time
        var timestamp = (new Date()).getTime();

        particle.forEach(
            function (p) {
            if (!p.inactive) {

                p.age = timestamp-p.birth;
                //console.log('particle age: ' + p.age);
                var lifePercent = (p.age/p.life);
                //console.log('particle lifepercent: ' + lifePercent);
                if (lifePercent>1) lifePercent = 1;
                if (lifePercent<0) lifePercent = 0;

                // FIXME: framerate dependent
                p.x += p.velX;
                p.y += p.velY;
                p.velX*=0.94;
                p.velY*=0.94;
                
                //console.log('p.death: ' + p.death);
                //console.log('timestamp: ' + timestamp);

                p.scale = p.size * lifePercent; // grow
                p.alpha = (1-lifePercent); // fade
                p.angle = Math.PI*2*lifePercent*p.rotSpd;

                if (timestamp >= p.death) // die
                {
                    //console.log('particle died of old age');
                    p.inactive = true;
                }

            }
        });

    }

    this.draw = function()
    {
        var drew = 0;
        particle.forEach(
            function (p) {
                if (!p.inactive) // and visible in screen bbox
                {
                    drew++;
                    //drawImageRotatedAlpha(
                    drawImageTinted(
                        canvasContext,
                        p.sprite,
                        p.x, 
                        p.y,
                        p.angle,
                        p.color,
                        p.alpha);
                }
            }
        );
        //console.log('drew'+drew);
    }

    this.clear = function(){
        particle = [];
    }    
};

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// custom stuff for this game:

function sparksEffect(x,y) {
    var num = randomInt(2,9);
    for (var i=0; i<num; i++) { // sparks
        particles.add(x,y,particlePic,randomInt(200,500),randomInt(1,8),"red",0.3,0,Math.random()*16-8,Math.random()*16-8);					
    }
}

function muzzleEffect(x,y) {
    var num = randomInt(2,9);
    for (var i=0; i<num; i++) { // sparks
        particles.add(x,y,particlePic,randomInt(200,500),randomInt(1,4),"rgb(255,230,255)",0.1,0,1,1);                    
    }
    //x, y, sprite, life, size, color, rotationSpeed, forcedAngle, velX, velY
}

function carCollisionEffect(x,y) {
    for (var i=0; i<16; i++) {
        particles.add(x+randomInt(0,32)-16,y+randomInt(0,32)-16,particlePic,randomInt(800,1600),randomInt(24,48),"rgb(255,255,0)",0.1,0,Math.random()*2-1,Math.random()*2-1);
    }
    sparksEffect(x,y);
}

function wallCollisionEffect(x,y) {
    for (var i=0; i<16; i++) {
        particles.add(x+randomInt(0,32)-16,y+randomInt(0,32)-16,particlePic,randomInt(800,1600),randomInt(24,48),"rgb(0,255,255)",0.1,0,Math.random()*2-1,Math.random()*2-1);					
    }
    sparksEffect(x,y);
}

function bulletHitWallEffect(x,y)
{
    for (var i=0; i<8; i++) { // fire
        particles.add(x+randomInt(0,20)-10,y+randomInt(0,20)-10,particlePic,randomInt(800,1600),randomInt(24,48),"rgb("+ randomInt(0,130) + "," + randomInt(0,50) + "," + randomInt(170,255)+ ")",0.1,0,Math.random()*1-0.5,Math.random()*1-0.5);
    }
    for (var i=0; i<8; i++) { // smoke
        particles.add(x+randomInt(0,32)-16,y+randomInt(0,32)-16,particlePic,randomInt(800,1600),randomInt(24,48),"rgb("+randomInt(0,60)+","+randomInt(0,10)+","+randomInt(0,180)+")",0.1,0,Math.random()*4-2,Math.random()*4-2);
    }
    sparksEffect(x,y);
}

function mineDetonatesEffect(x,y, dist = 60.0, ang = 2.0)
{
    for (var i=0; i<15; i++) { // scattered bullet hit walls
        var randAng = Math.random() * Math.PI * ang;
        var randDist = Math.random() * dist;
        carCollisionEffect(x + Math.cos(randAng)*randDist,
                            y + Math.sin(randAng)*randDist);
    }
}

// smokeScreen Powerup Particles
const SMOKE_LIFESPAN = 3000; // ms
const SMOKE_SIZE = 100; // px - unimplemented
const SMOKE_RGBA = 'rgba(40,40,40,1)';
const SMOKE_ROT_RANGE = 3; // +- random range of radians per frame
const SMOKE_VEL_RANGE = 2; // +- random range of px per frame draft

function smokeScreenEffect(x,y)
{
    //x, y, sprite, life, size, color, rotationSpeed, forcedAngle, velX, velY
    particles.add(x,y,particlePic,
        SMOKE_LIFESPAN,SMOKE_SIZE,SMOKE_RGBA,
        Math.random()*SMOKE_ROT_RANGE*2-SMOKE_ROT_RANGE,
        null,
        Math.random()*SMOKE_VEL_RANGE*2-SMOKE_VEL_RANGE,
        Math.random()*SMOKE_VEL_RANGE*2-SMOKE_VEL_RANGE);
    
}