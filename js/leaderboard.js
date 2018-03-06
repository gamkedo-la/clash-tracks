function updateLeaderboard(userName, score) {
  firebase.database().ref('users/' + userName).set({
    score: score
  });
}