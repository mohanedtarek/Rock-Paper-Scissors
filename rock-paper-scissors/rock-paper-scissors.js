const score = JSON.parse( localStorage.getItem('score') ) || {
  Wins :0,
  Losses :0,
  Ties :0,
};
/*
if(!score) {
  Wins :0,
  Losses :0,
  Ties :0,
}
*/


updateScoreElement();

let isAutoPlaying = false ;
let intervalID ;

function autoPlay () {

  if (!isAutoPlaying) {

   intervalID = setInterval( function(){
      const playerMove = pickComputerMove() ;
      playGame(playerMove);
    } , 1000);
    isAutoPlaying = true ;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;

  }
  }

  document.querySelector('.js-rock-button')
    .addEventListener( 'click', () => {
    playGame('Rock');
  });

  document.querySelector('.js-paper-button')
    .addEventListener('click' , () => {
    playGame('Paper');
  });

  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
    playGame('Scissors');
  });

  document.body.addEventListener('keydown' , (event) => {
    if (event.key === 'r') {
      playGame('Rock');
    } else if (event.key === 'p') {
      playGame('Paper');
    } else if (event.key === 's') {
      playGame('Scissors');
    }
  });
  


function playGame (playerMove) {

  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
       result = 'You Lose.';
    } else if (computerMove === 'Paper') {
       result = 'You Win.';
    } else if (computerMove === 'Scissors') {
       result = 'Tie.';
    }

  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You Win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'Lose.';
    }

    } else if (playerMove === 'Rock') {
      if (computerMove === 'Rock') {
        result = 'Tie.';
      } else if (computerMove === 'Paper') {
        result = 'You Lose.';
      } else if (computerMove === 'Scissors') {
        result = 'You Win.';
      }
      }

      if ( result === 'You Win.') {
          score.Wins += 1 ;
      } else if ( result === 'You Lose.') {
        score.Losses += 1 ;
      } else if ( result === 'Tie.') {
        score.Ties += 1 ;
      }

      localStorage.setItem('score', JSON.stringify(score));

     updateScoreElement();

     document.querySelector('.js-moves').innerHTML = 
     `You
     <img src="${playerMove}-emoji.png" class="move-icon" >
     <img src="${computerMove}-emoji.png" class="move-icon">
     Computer `;

     document.querySelector('.js-result').innerHTML = result ;  

}

function updateScoreElement () {
  document.querySelector('.js-score').innerHTML = `Wins : ${score.Wins}, 
        Losses : ${score.Losses}, Ties : ${score.Ties}`;
}

function pickComputerMove () {

  const randomNumber = Math.random();
  let computerMove = '';

if ( randomNumber >= 0 && randomNumber < 1/3 ) {
  computerMove = 'Rock';
} else if ( randomNumber >= 1/3 && randomNumber < 2/3 ) {
  computerMove = 'Paper';
} else if ( randomNumber >= 2/3 && randomNumber < 1 ) {
  computerMove = 'Scissors' ;
}

return computerMove ;
}
