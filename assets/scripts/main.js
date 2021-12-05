//Start game
function startGame() {
  document.querySelector('div.welcome-screen').style.display = 'none';
  document.querySelector('div.walkthrough').style.display = 'none';
  MatchThree.changeLevel(1);
}

// Instructions
const instructionsBtn = document.querySelector('.instructions-btn');
instructionsBtn.addEventListener('click', function () {
  document.querySelector('div.welcome-screen').style.display = 'none';
  document.querySelector('div.walkthrough').style.display = 'flex';
});


// Success message
const successDiv = document.querySelector('.success');
const nextLevelBtn = document.querySelector('.next-level');
nextLevelBtn.addEventListener('click', function () {
  if (successDiv.childNodes[1].innerText == "YOU WON") {
    MatchThree.changeLevel(1);
    successDiv.style.display = 'none';
    return
  }
  MatchThree.changeLevel(MatchThree.level + 1);
  successDiv.style.display = 'none';
});

// Failed message
const failedDiv = document.querySelector('.failed');
const repeatLevelBtn = document.querySelector('.repeat-level');
repeatLevelBtn.addEventListener('click', function () {
  MatchThree.changeLevel(MatchThree.level);
  failedDiv.style.display = 'none';
});

// Info button
function hideMessage() {
  document.querySelector('.info').style.display = 'none';
}