
// stub file - work in progress

var menuDiv = document.getElementById('Menu');
var helpDiv = document.getElementById('Help');
var creditsDiv = document.getElementById('Credits');
var optionsDiv = document.getElementById('Options');

function mainMenu() {
    console.log('Main menu...');
    menuDiv.style.display = 'block';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';

}

function menuPlay() {
    console.log('Main menu: PLAY');
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';
    fadeInIntroThenStartGame();
}

function menuHelp() {
    console.log('Main menu: HELP');
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'block';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'none';
}

function menuCredits() {
    console.log('Main menu: CREDITS');
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'block';
    optionsDiv.style.display = 'none';
}

function menuOptions() {
    console.log('Main menu: OPTIONS');
    menuDiv.style.display = 'none';
    helpDiv.style.display = 'none';
    creditsDiv.style.display = 'none';
    optionsDiv.style.display = 'block';
}

