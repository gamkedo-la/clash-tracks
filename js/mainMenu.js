
// stub file - work in progress

var menuDiv = document.getElementById('Menu');
var helpDiv = document.getElementById('Help');
var creditsDiv = document.getElementById('Credits');
var optionsDiv = document.getElementById('Options');
var levelDiv = document.getElementById('Levels');

function mainMenu() {
    console.log('Main menu...');
    menuDiv.style.display = 'block';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';
    levelDiv.style.display = 'none';
}

function menuPlay() {
    console.log('Main menu: PLAY');
    levelDiv.style.display = 'block';
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';
}

function menuLevel(num) {
    console.log('Main menu: PLAY LEVEL ' + num);
    levelDiv.style.display = 'none';
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';

    window.level = num; // set the global
    fadeInIntroThenStartGame();

}

function menuHelp() {
    console.log('Main menu: HELP');
    levelDiv.style.display = 'none';
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'block';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';
}

function menuCredits() {
    console.log('Main menu: CREDITS');
    levelDiv.style.display = 'none';
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'block';
    optionsDiv.style.display = 'none';
}

function menuOptions() {
    console.log('Main menu: OPTIONS');
    levelDiv.style.display = 'none';
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'block';
}

