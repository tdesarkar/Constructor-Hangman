// ---- ---- VARIABLES AND DEPENDANCIES ---- ----

var Word = require( './word.js' );
var inquirer = require( 'inquirer' );
var fs = require( 'fs' );

// provides array to check user input for validation
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var wordArray = [];
var currentWord = null;
var guessesLeft = 9;
var guessedLetters = [];

// ---- ---- GLOBAL FUNCTIONS ---- ----

//read in txt file, use comma separation to create word list array
function createWordList(){

	// read in wordlist.txt with f
	fs.readFile("wordfile.txt", "utf8", function(error, data) {

		if (error) {
		return console.log(error);
		}

		//set wordArray to contents of file, split by commas
		wordArray = data.split(",");

		//choose a word to begin game
		newWord();
	});

}

function newWord(){

	//randomly pick word from wordArray

	var randomIndex = Math.floor(Math.random() * wordArray.length);

	var wordPick = wordArray[randomIndex];

	// initialize word object to currentWord

	currentWord = new Word (wordPick);

	currentWord.createArray();

	//reset guesses
	guessesLeft = 9;
	guessedLetters = [];

	//start new round
	gameRound();

}

function gameRound(){

	// Print Turns Remaining

	console.log('\nGuesses Remaining: ' +guessesLeft);

	// Print Current Word state

	currentWord.printWord();

	// Prompt for letter guess

	inquirer.prompt([
		{
	    	type: "input",
	    	name: "letterGuess",
	    	message: "Please guess a letter (? to review): "
	  	}

	]).then( function ( response ) {

		var currentGuess = response.letterGuess.toLowerCase();

		//if ? entered, show prior guesses

		if( currentGuess === '?' ){

			showGuessed();
			return;
			
		}

		// validate input is single letter

		if( alphabet.indexOf( currentGuess ) === -1 || currentGuess.length !== 1) {

			console.log("\nPlease guess a single letter!")

			gameRound();

			return;

		}

		// and not already guessed

		if( guessedLetters.indexOf( currentGuess ) !== -1 ){

			console.log("\nYou've already guessed that letter!")

			gameRound();

			return;

		}

		// push to guessedletters array

		guessedLetters.push( currentGuess );

		// THEN check the guess using word method

		if( currentWord.checkGuess( currentGuess ) ){

			console.log('\nCorrect!');

		}

		// if guess incorrect, decrement guesses
		else{

			console.log('\nIncorrect!')
			guessesLeft --;

		}

		// If word completed, win

		if( currentWord.isSolved() ){

			endGame(true);
			// console.log('You Win!');

		}

		// If no more guesses, lose

		else if( guessesLeft <= 0 ){

			endGame(false);
			// console.log('You Lose!');

		}

		else {

			gameRound();

		}

	});

}

//function to prompt for new game
function endGame( won ){

	// display appropriate win/loss message
	if(won){
		console.log('\n*** You have won! ***')
	}
	else{
		console.log('\nYou have lost! The correct answer was:')
	};

	// reveals the current word in full
	currentWord.revealWord();

	//prompts for new game
	inquirer.prompt([
		{
	    	type: "list",
	    	name: "newGame",
	    	message: "Would you like to play again?",
	    	choices: ["Yes", "No"]
	  	}
	]).then( function ( response ) {

		//if yes, picks new word
		if( response.newGame === 'Yes'){
			
			newWord();

		}

		//otherwise returns
		else {
			return;
		}

	});
}

function showGuessed (){

	var guessedDisplay = "";

	for( var i = 0; i < guessedLetters.length; i++ ){

		guessedDisplay = guessedDisplay + guessedLetters[i].toUpperCase() + ' ';

	}

	console.log ('\nAlready guessed: '+guessedDisplay);
	gameRound();
	return;

}

// ---- ---- MAIN LOGIC ---- ----

//initializes wordlist and begins game
createWordList();