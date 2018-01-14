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

                p.x += p.velX;
                p.x += p.velY;
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

    
};

// helper function (inclusive: eg 1,10 may include 1 or 10)
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// custom stuff for this game:

function carCollisionEffect(x,y)
{
    for (var i=0; i<16; i++)
        particles.add(x+randomInt(0,32)-16,y+randomInt(0,32)-16,particlePic,randomInt(800,1600),randomInt(24,48),"rgb(255,255,0)",0.1,this.ang-Math.PI,Math.random()*2-1);					
}

function wallCollisionEffect(x,y)
{
    for (var i=0; i<16; i++)
        particles.add(x+randomInt(0,32)-16,y+randomInt(0,32)-16,particlePic,randomInt(800,1600),randomInt(24,48),"rgb(0,255,255)",0.1,this.ang-Math.PI,Math.random()*2-1);					
}