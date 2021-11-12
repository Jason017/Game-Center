// Game 1
function ageInDays() {
  var birthYear = prompt("What year were you born... Good Friend?");
  var ageInDays = (2021 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old.');

  h1.setAttribute('id','ageInDays');
  h1.appendChild(textAnswer);

  var div = document.getElementById('flex-box-result');
  div.appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}


// Game 2
function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}


// Game 3
function rpsGame(yourChoice) {
  var humanChoice = yourChoice.id;
  var botChoice = randomChoice();
  var result = decideWinner(humanChoice, botChoice);
  var message = finalMessage(result);

  rpsFrontEnd(humanChoice, botChoice, message);
}

function randomChoice() {
  randomNumber = Math.floor(Math.random() * 3);
  return ['rock', 'paper', 'scissors'][randomNumber];
}

function decideWinner(humanChoice, botChoice) {
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'scissors': 0, 'rock': 1, 'paper': 0.5},
    'scissors': {'scissors': 0.5, 'rock': 0, 'paper': 1}
  };

  // Return your score
  return rpsDatabase[humanChoice][botChoice];
}

function finalMessage(yourScore) {
  if (yourScore === 0) {
    return {'message': 'You lost!', 'color': 'red'};
  } else if (yourScore === 0.5) {
    return {'message': 'You tied!', 'color': 'yellow'};
  } else {
    return {'message': 'You won!', 'color': 'green'};
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  };

  // Remove all the images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
  
  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


// Game 4
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];

for (let i=0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonClicked) {
  if (buttonClicked.value == 'red') {
    buttonsRed();
  } else if (buttonClicked.value == 'green') {
    buttonsGreen();
  } else if (buttonClicked.value == 'reset') {
    buttonsColorReset();
  } else if (buttonClicked.value == 'random') {
    buttonsColorRandom();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonsColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function buttonsColorRandom() {
  let choices = ["btn-primary", "btn-danger", "btn-warning", "btn-success"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// Game 5: Blackjack
let blackjackGame = {
  'you': {'scoreSpan':'#your-blackjack-score', 'div':'#your-box', 'score': 0},
  'dealer': {'scoreSpan':'#dealer-blackjack-score', 'div':'#dealer-box', 'score':0},
  'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
              '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},
  'result': {'wins': 0, 'losses': 0, 'draws': 0},
  'isStand': false,
  'turnsOver': false
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function randomCard() {
  let randomNumber = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomNumber];
}

function showCard(activePlayer, card) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    cardImage.style.height = '140px';
    cardImage.style.width = '100px';

    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }  
}

function updateScore(activePlayer, card) {
  if (card == 'A') {
    // If adding 11 keeps me below 21, add 11, otherwise add 1.
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}


function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();

    showCard(YOU, card);
    updateScore(YOU, card);
    showScore(YOU);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bot's move
async function blackjackStand() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(DEALER, card);
    updateScore(DEALER, card);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame['turnsOver'] = true;
  showResult(computeWinner());
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-score').textContent = 0;
    document.querySelector('#dealer-blackjack-score').textContent = 0;
    document.querySelector('#your-blackjack-score').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-score').style.color = '#ffffff';
    document.querySelector('#blackjack-result').textContent = 'Let\'s play';
    document.querySelector('#blackjack-result').style.color = '#000000';
    
    blackjackGame['turnsOver'] = true;
  }
}

function computeWinner() {
  let winner;
  let userScore = YOU['score'];
  let dealerScore = DEALER['score'];

  if (userScore <= 21) {
    if (userScore > dealerScore || dealerScore > 21) {
      blackjackGame['result']['wins']++;
      winner = YOU;
    } else if (userScore < dealerScore) {
      blackjackGame['result']['losses']++;
      winner = DEALER;
    } else if (userScore == dealerScore) {
      blackjackGame['result']['draws']++;
    } 
  } else if (userScore > 21 && dealerScore <= 21){
    blackjackGame['result']['losses']++;
    winner = DEALER;
  } else if (userScore > 21 && dealerScore > 21)  {
    blackjackGame['result']['draws']++;
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {
    if (winner == YOU) {
      document.querySelector('#wins').textContent = blackjackGame['result']['wins']
      message = 'You won!';
      messageColor = 'green';
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['result']['losses']
      message = 'You lost!';
      messageColor = 'red';
      lossSound.play();
    } else {
      document.querySelector('#draws').textContent = blackjackGame['result']['draws']
      message = 'You drew';
      messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}


