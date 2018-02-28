var audioFormat;

var boomSound = new SoundOverlapsClass("./audio/boom");
var carHitSound = new SoundOverlapsClass("./audio/carHit");
var bulletHitSound = new SoundOverlapsClass("./audio/bulletHit");
var laserSound = new SoundOverlapsClass("./audio/laser");
var enemyShootSound = new SoundOverlapsClass("./audio/shootEnemy");
var shootSound = new SoundOverlapsClass("./audio/shoot");
var powerupSound = new SoundOverlapsClass("./audio/powerup");
var carJumpSound = new SoundOverlapsClass("./audio/carJump");
var carSuckedSound = new SoundOverlapsClass("./audio/carSucked");
var carCollisionSound = new SoundOverlapsClass("./audio/carCollision");

var trancyMusic = new backgroundMusicClass("./audio/Trancy");
var menuMusic = new backgroundMusicClass("./audio/Funky Menu");
var draftMonkMusic = new backgroundMusicClass("./audio/draft monk - ambience");
var varyzeMusic = new backgroundMusicClass("./audio/Varyze");
var misfortuneMusic = new backgroundMusicClass("./audio/misfortune");


var currentBackgroundMusic;

var soundVolume = document.getElementById('soundVolume').defaultValue;
var musicVolume = document.getElementById('musicVolume').defaultValue;


function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function backgroundMusicClass(filenameWithPath) {

    let musicSound = null;

    this.loopSong = function() {
        setFormat(); // calling this to ensure that audioFormat is set before needed

        if (musicSound != null) {
            musicSound.pause();
            musicSound = null;
        }
        musicSound = new Audio(filenameWithPath + audioFormat);
        musicSound.volume = musicVolume;
        musicSound.loop = true;
        musicSound.play();
    }

    this.pauseSound = function() {
        if (musicSound != null) {
          musicSound.pause();
        }
    }

    this.startOrStopMusic = function() {
        if (musicSound.paused) {
            musicSound.play();
        } else {
            musicSound.pause();
        }
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();

    var altSoundTurn = false;
    var mainSound = new Audio(filenameWithPath + audioFormat);
    var altSound = new Audio(filenameWithPath + audioFormat);

    this.play = function() {
        if (altSoundTurn) {
            altSound.currentTime = 0;
            altSound.volume = soundVolume;
            altSound.play();
        } else {
            mainSound.currentTime = 0;
            mainSound.volume = soundVolume;
            mainSound.play();
        }

        this.altSoundTurn = !this.altSoundTurn; //toggling between true and false
    }
}

function getRandomVolume(){
	var min = 0.3;
	var max = 0.6;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}

function updateSoundMusicLevel(){
  soundVolume = document.getElementById('soundVolume').value;
  musicVolume = document.getElementById('musicVolume').value;
  menuMusic.pauseSound();
  menuMusic.loopSong();
}
