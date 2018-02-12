var Letter = require( './letter.js' );

function Word ( wordInput ){

	this.currentWord = wordInput;

	this.letterArray = [];

}

//creates the letterArray of Letter objects from the currentWord string
Word.prototype.createArray = function(){

	for( var i = 0; i < this.currentWord.length; i++ ){

		var currentLetter = new Letter( this.currentWord[i], false );

		if ( currentLetter.letter === ' '){
			currentLetter.guessedCorrectly = true;
		}

		this.letterArray.push(currentLetter);

	}

}

//method to check if word is solved
Word.prototype.isSolved = function(){

	// assumes true
	var solvedCheck = true;

	// but if any letter not guessed, becomes false
	for( var i = 0; i < this.letterArray.length; i++ ){

		if( !this.letterArray[i].guessedCorrectly ){
			solvedCheck = false;
		}

	}

	return solvedCheck;

}

//checks if a given letter is in the word
Word.prototype.checkGuess = function( guessLetter ){

	var correctGuess = false;

	for( var i = 0; i < this.letterArray.length; i++ ){

		//if guessed letter is in word, set letter object to guessed
		if( this.letterArray[i].letter === guessLetter ){
			correctGuess = true;
			this.letterArray[i].guessedCorrectly = true;

		}

	}

	//returns boolean whether letter was in word
	return correctGuess;
}

//method to console log the contents of the letterArray
Word.prototype.printWord = function(){

	var wordToPrint = '';

	for(var i = 0; i < this.letterArray.length; i++ ){
		wordToPrint += this.letterArray[i].display().toUpperCase();
		wordToPrint += ' ';
	}

	console.log('\n    ' +wordToPrint +'\n' );

}

//method to console log the current word itself
Word.prototype.revealWord = function(){

	var wordToPrint = '';

	for(var i = 0; i < this.letterArray.length; i++ ){
		wordToPrint += this.letterArray[i].letter.toUpperCase();
		wordToPrint += ' ';
	}

	console.log('\n    ' +wordToPrint +'\n' );

}

module.exports = Word;