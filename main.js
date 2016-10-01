/* Will contain the logic of App.
	This is the file to run in terminal/bash. */

var inquirer = require("inquirer");
var fs = require('fs');
var word = require('./word.js');

word.readyToPlay();

var playGame = function() {
	var guessesRemaining = 10;

	var wordToGuess = word.randomWord;

	var placeholders = []
	for(i=0; i < wordToGuess.length; i++) {
		placeholders.push(' _ ');
	}
	var blankWord = placeholders.join('').toString();
	console.log('');
	console.log('Word to guess: ');
	console.log(blankWord);
	console.log('Guesses Remaining: ', guessesRemaining);
	console.log('');

	var userGuess = [
	    {
	      type: 'input',
	      name: 'guess',
	      message: 'Type a letter and hit enter to make your guess!',
	      default: ''
	    }
	];

	var guess = function() {
			inquirer.prompt(userGuess, function(answers) {
			}).then(function (answers) {

			var win = 0;

			for(i = 0; i < wordToGuess.length; i++) {
				if (answers.guess === wordToGuess[i]) {
		    		wordToGuess[i] = answers.guess;
		    		placeholders[i] = wordToGuess[i];
		    	} else {
		    		blankWord[i] = ' _ ';
		    	};

		    	if (placeholders[i] == wordToGuess[i]) {
					win++;

					if (win == wordToGuess.length) {
						console.log('You Win!');

						var playAgain = [
						    {
						      type: 'input',
						      name: 'playAgain',
						      message: 'Want to play again?',
						      default: 'y/n'
						    }
						];
						inquirer.prompt(playAgain, function(answers) {
							}).then(function (answers) {
								if (answers.playAgain == 'y') {
									readyToPlay();
								} else {
									console.log('See you next time!');
									return;
								}
							});
						return;
					} 
				} else if (guessesRemaining <= 1) {
					console.log('You Lose!');
					return;
				}
			}
			console.log(placeholders.join('').toString());
			guessesRemaining--;
			console.log('Guesses Remaining: ', guessesRemaining);
			guess();
		});
	};
	guess();
}