function updateLeaderboard(level, userName, score) {
    firebase.database().ref('levels/' + level + '/' + userName).set({
        score: score
    });
}

function getAllScores(callback) {
	var endpoint = '/levels/'
	getFromDatabase(endpoint, callback);
}

function getScoresForLevel(level, callback) {
	var endpoint = '/levels/' + level
	getFromDatabase(endpoint, callback);
}

function getFromDatabase(url, callback) {
	firebase.database().ref(url).once('value').then(function(snapshot) {
        var data = snapshot.val();
        callback(data);
    });
}