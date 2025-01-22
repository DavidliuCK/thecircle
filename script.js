const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const info = document.getElementById('info');

let score = 0;
let speed = 1.5;
let timer = 60; // Timer på 1 minut
let gameInterval = null;
let timerInterval = null;

// Ljud
const scoreSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387'); // Ljud för poäng

// Flytta cirkeln
function moveCircle() {
  // Storlek på cirkeln
  const circleSize = 50;

  // Maxvärden för x och y, så att cirkeln håller sig inom fönstret
  const maxX = window.innerWidth - circleSize;
  const maxY = window.innerHeight - circleSize;

  // Slumpa fram nya positioner för x och y inom gränserna
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // Placera cirkeln med GSAP
  gsap.to(circle, {
    left: `${x}px`,
    top: `${y}px`,
    duration: speed,
    ease: 'power1.inOut',
  });
}

// Starta spelet
function startGame() {
  score = 0;
  speed = 1.5;
  timer = 60;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timer;

  startBtn.style.display = 'none'; // Dölj startknappen
  info.style.visibility = 'visible'; // Visa timer och poäng
  circle.style.display = 'block'; // Visa cirkeln
  moveCircle();

  // Starta timer
  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
      endGame();
    }
  }, 1000);

  // Flytta cirkeln kontinuerligt
  gameInterval = setInterval(moveCircle, speed * 1000);
}

// Sluta spelet
function endGame() {
  clearInterval(timerInterval);
  clearInterval(gameInterval);

  circle.style.display = 'none';
  startBtn.style.display = 'block'; // Visa startknappen
  alert(`Tiden är slut! Du fick ${score} poäng!`);
}

// Hantera klick på cirkeln
circle.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;

  // Spela ljud
  scoreSound.currentTime = 0; // Starta om ljudet om det redan spelas
  scoreSound.play();

  // Gratulationsanimation
  const burst = document.createElement('div');
  burst.className = 'burst';
  burst.style.left = `${circle.getBoundingClientRect().left}px`;
  burst.style.top = `${circle.getBoundingClientRect().top}px`;
  document.body.appendChild(burst);

  gsap.to(burst, {
    scale: 3,
    opacity: 0,
    duration: 1,
    onComplete: () => burst.remove(),
  });

  // Öka hastigheten och flytta cirkeln
  speed = Math.max(0.5, speed - 0.1);
  moveCircle();
});

// Klick på "START"-knappen
startBtn.addEventListener('click', startGame);

// Justera cirkeln vid fönsterstorleksändring
window.addEventListener('resize', moveCircle);
