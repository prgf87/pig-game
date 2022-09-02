'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Player Scores initialisers
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;

// Game Logic

// let scores, currentScore, activePlayer, playing;

const init = function () {
  const scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
  let playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  btnNew.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
// Initialise the Game by using the function we made to initialise the game
init();

// Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice Roll Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1) Generate dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2) change dice shown on screen based on roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add value of dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

// Hold Button Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1) Add current score to Active Player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2) Check if score is <= 100
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      diceEl.classList.add('hidden');
      btnNew.classList.remove('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }

  // 3) if not, switch to other player
});

// btnNew.addEventListener('click', function () {
//   //Reset Classes and scores
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   console.log(`.player--${activePlayer}`);
//   document.querySelector(`#score--0`).textContent = 0;
//   document.querySelector(`#score--1`).textContent = 0;
//   document.querySelector(`#current--0`).textContent = 0;
//   document.querySelector(`#current--1`).textContent = 0;
//   scores = [0, 0];

//   //Reset Player
//   activePlayer = 0;
//   document.querySelector(`.player--0`).classList.add('player--active');
//   playing = true;
// });

btnNew.addEventListener('click', init);
