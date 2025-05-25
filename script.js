let score = 0;
let lives = 3;
let currentWord = '';
let timer;
const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const messageDisplay = document.getElementById('message');

function pickWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord;
  wordInput.value = '';
  resetTimer();
}

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    loseLife('Too slow!');
  }, Math.max(3000 - score * 100, 1000));
}

function loseLife(reason) {
  lives--;
  livesDisplay.textContent = `Lives: ${lives}`;
  messageDisplay.textContent = reason;
  if (lives <= 0) {
    gameOver();
  } else {
    pickWord();
  }
}

function gameOver() {
  wordDisplay.textContent = 'Game Over';
  wordInput.disabled = true;
  clearTimeout(timer);
}

wordInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      messageDisplay.textContent = 'Correct!';
      pickWord();
    } else {
      loseLife('Wrong word!');
    }
  }
});

window.onload = pickWord;
