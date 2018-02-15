// SCREENSHAKE - a simple html element wiggler for "juice"
// made for gamkedo with love from mcfunkypants

var screen_shakes = 0; // frames of screenshake used as player feedback for when we take damage
var screen_shake_pivot_x = 0;
var screen_shake_pivot_y = 0;
var screen_shake_me = document.getElementById('gameCanvas');
var screen_shake_enabled = true;

function screenshake(howmany)
{
	//console.log('screenshake ' + howmany);
	if (!screen_shake_me)
	{
		console.log('ERROR: screenshake does not know which element to shake!')
		return;
	}
	screen_shake_pivot_x = 0;
	screen_shake_pivot_y = 0;
	screen_shakes += howmany;
    if (screen_shakes > 15) screen_shakes = 15;
}

function updateScreenshake()
{
	if (!screen_shake_me) return; // sanity check
	
	if (!screen_shake_enabled) {
		screen_shakes = 0;
		screen_shake_me.style.margin = "0";
		return;
	}

	if (screen_shakes>0)
	{
		var shakesize = screen_shakes / 2;
		if (shakesize > 3) shakesize = 3;

		// shake around a pivot point using CSS margin: NOTE: may have no effect depending on other custom css
		screen_shake_me.style.margin = "" + (screen_shake_pivot_x + Math.round((Math.random() * shakesize) - shakesize / 2)) + 
					"px " + (screen_shake_pivot_y + Math.round((Math.random() * shakesize) - shakesize / 2)) + "px";

		screen_shakes--;
		//console.log('screen_shakes:'+screen_shakes);

		// about to finish? return to where we were when we started
		if (screen_shakes < 1)
		{
			//console.log('screenshakes done. going back to original position.')
			screen_shake_me.style.margin = "0";
		}
	}
}

function resetScreenShake(){
	screen_shakes = 0; 
	screen_shake_pivot_x = 0;
	screen_shake_pivot_y = 0;
	screen_shake_me = document.getElementById('gameCanvas');
}

function toggleScreenShake() {
	screen_shake_enabled = !screen_shake_enabled;
	console.log("Screen shake is now " + (screen_shake_enabled ? "enabled" : "disabled"));
}
