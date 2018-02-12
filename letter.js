//constructor function for individual letters

function Letter( letter, guessedCorrectly ) {
	
	//stores the actual letter as a string
	this.letter = letter;
	//boolean if guessed
	this.guessedCorrectly = guessedCorrectly;

}

//method to display either l or * depending on whether player has guessed
Letter.prototype.display = function() {
	if( this.guessedCorrectly ){
			return this.letter;
		} else {
			return '*';
	} 
}

module.exports = Letter;