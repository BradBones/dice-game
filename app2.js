/*
ALL CHALLENGES EXECUTED - MAKES GAME TOO HARD - SEE APP3.JS

*/

// Global variables declared here to avoid writting var over and over.
var scores, roundScore, activePlayer, gamePlaying;

// Run the game's initializing function (written at the end of the program).
init();

//  Placed outside of the function below to allow global scope.
var lastThrow1;
var lastThrow2;

// Event handler with an anonymous function for the dice roll button.
document.querySelector('.btn-roll').addEventListener('click', function() {
    // Testing the state of the game, to see if the roll dive button will be active of not.
    if (gamePlaying) {
        // Generate a random number between 0-5 and add 1 to make it 1-6 and assign it to the dice variable.
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // Display the result.
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';
        
        // Compare to see if the current throw and the previous throw were both 6.
        if (dice1 === 6 || dice2 === 6 && lastThrow1 === 6 || lastThrow2 === 6) {
            // Player looses score.
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        // Update the round score IF the rolled number was not a 1.    
        } else if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player's turn.
            nextPlayer();
        }
        // Previous dice throw saved here at the end of the function.
        // We define the 'lastThrow' variable outside (above) the fuction in the global scope.
        // ...so that the program remember the number after the function has run.
        lastThrow1 = dice1;
        lastThrow2 = dice2;
    }   
});


// Set up for the hold button.
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current sore to global score.
        scores[activePlayer] += roundScore;
        // Update the UI.
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Working with the MAX SCORE input.
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Undefined, 0, nul, or '' are COERCED to false.
        // Anything else is COERCED to true.
        // ...in other words, if the input string is not empty (false) use the string, if not defalt to 100.
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game.
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice1').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // Set game state to false to end the roll & hold buttons functionality.
            gamePlaying = false;
        } else {
            // Next player's turn.
            nextPlayer();
        }
    }    
});


// Inter-round reset function - Resets the UI each time players switch turns within a game.
function nextPlayer() {
    // Next player - using the ternary operator instead of an IF statement.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Set the roundScore back to 0 (so player looses thier accumulated points).
    roundScore = 0;
    // Reset unheld (banked) scores to 0.
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Switch UI to the other player.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// Button handler for the NEW GAME button.
// ...note that 'init' is passed as the 2nd argument without '()' because we want it
// to be accessed but only run if the button is clicked but not as the passer reads this line.
document.querySelector('.btn-new').addEventListener('click', init);

// Initialize game function - Resets the game before first play and after each game.
function init() {
    // ...note that 'scores' holds both player's scores as an array as it's DRYer.
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Hide the dice in the begining using CSS display set to 'none'.
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    // Setting all scores to 0 by default in the DOM.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // Here we have to add back the active class to 'player 0' after removing it. All set for a new game.
    document.querySelector('.player-0-panel').classList.add('active');
}


/**************
 * 3 CHALLENGES
 
 1. A player looses his ENTIRE score when he rolls two 6 in a row.
 After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable).

 2. Add an input field to the HTML where players can set the winnig score, 
 so that they can change the predefined score of 100. (Hint: You can read that value with the 
    .value property in JavaScript. Google?)

 3. Add another dice to the game, so that there are two dice now. The player looses his current
 score when one of them is a 1. (Hint: You will need CSS to position the 2nd dice, so 
    take a look at the CSS code for the first one.)
 */


















/*************
 * IDEAS TO MAKE IT BETTER
 */
// Have the dice rotate 90 degrees per click, so that when the same number is rolled twice in a row, it still seems like something happened.
// When you roll a 1, there should be a message.
// Animation to show the trun being changed from player to player. (Page of a book turning?)
// Grey out and stop animation on roll dice and hold buttons on win. annimate new game button coming down to the top of the roll dice button. It will also animate up on play start.
// Add a link under the main play area for instructions and have them open in a lightbox style pop-up.


// // Printing the dice roll result to the DOM (two methods): (Note that in both cases the #ID can be manipulated in JS!)
// // ...method one '.textContent' - Use case: When plain text is required (less code).
// document.querySelector('#current-' + activePlayer).textContent = dice;
// // ...method two '.innerHTML' - Use case: When HTML tags need to be written to the DOM.
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


// // Adding or removing classes:
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');









