// simple tap game: each tap increases score
let score = 0;

const button = document.getElementById("tapButton");
const scoreText = document.getElementById("scoreText");

// when the button is clicked, increase score and update the text
button.addEventListener("click", () => {
  score++;
  scoreText.textContent = `Score: ${score}`;
});
