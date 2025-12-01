// simple tap game: each tap increases score
let score = 0;
let timeLeft = 10;

const button = document.getElementById("tapButton");
const scoreText = document.getElementById("scoreText");

// when the button is clicked, increase score and update the text
button.addEventListener("click", () => {
  if (timeLeft > 0) {
    score++;
    scoreText.textContent = `Score: ${score}`;
  }
});

function startCountdown() {
  const timer = setInterval(() => {
    timeLeft--;
    console.log("Time left:", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      button.disabled = true;
      scoreText.textContent = `Time's up! Final score: ${score}`;
    }
  }, 1000);
}

// Start the countdown as soon as the game loads
startCountdown();