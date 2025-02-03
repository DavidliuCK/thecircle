const backgroundMusic = new Audio('sounds/game-music-loop-3-144252.mp3');
backgroundMusic.loop = true; // Gör att musiken spelas i en loop
backgroundMusic.volume = 0.3; // Sätt en behaglig volym
const clickSound = new Audio('sounds/90s-game-ui-6-185099.mp3');
clickSound.volume = 0.1; // Sätt volymen till 50%
const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let score = 0;
let speed = 1.5;
let timer = 60;
let gameInterval = null;
let timerInterval = null;

function moveCircle() {
  const circleSize = 50;
  const headerHeight = document.querySelector('header').offsetHeight;
  const footerHeight = document.querySelector('footer').offsetHeight;
  const maxX = window.innerWidth - circleSize;
  const maxY = window.innerHeight - circleSize - headerHeight - footerHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY + headerHeight;

  gsap.to(circle, {
    left: `${x}px`,
    top: `${y}px`,
    duration: speed,
    ease: 'power1.inOut',
  });
}

circle.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
  speed = Math.max(0.5, speed - 0.1);
  moveCircle();

  // Spela upp ljudet
  clickSound.play();
});

function startGame() {
  score = 0;
  speed = 1.5;
  timer = 60;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timer;

  startBtn.style.display = 'none';
  circle.style.display = 'block';
  moveCircle();

  // Starta bakgrundsmusiken
  backgroundMusic.play();

  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
      endGame();
    }
  }, 1000);

  gameInterval = setInterval(moveCircle, speed * 1000);
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(gameInterval);

  circle.style.display = 'none';
  startBtn.style.display = 'block';

  // Stoppa bakgrundsmusiken
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0; // Återställ musiken till början

  alert(`Tiden är slut! Du fick ${score} poäng!`);
}

startBtn.addEventListener('click', startGame);
