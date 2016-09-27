/* Will contain the logic of App.
	This is the file to run in terminal/bash. */

var inquirer = require("inquirer");
var fs = require('fs');
var word = require('./game.js');

//-- Prompt User if they are ready to Play
//-- Selecting Yes will run playGame() function
//===============================================
var ready = [
    {
      type: 'input',
      name: 'ready',
      message: 'Ready to play Hangman?',
      default: 'y/n'
    }
];

var readyToPlay = function() {
	inquirer.prompt(ready, function(answers) {
	}).then(function (answers) {
	    	if (answers.ready === 'y') {
	    		playGame();
	    	} else {
	    		console.log('Umm... OK... Well when you are ready, run the file again!');
	    	};
	});
}
readyToPlay();
//===============================================

//-- Game Play -- 
//================
var playGame = function() {
	var guessesRemaining = 10;

	//-- Generate a random word from game.js
	var wordToGuess = word.randomWord;
	//--------------------------------

	//-- Generate Placeholders
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
	//--------------------------------------------

	//-- Prompt user for their guess
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
	//----------------------------------------------------

			var win = 0;

			//-- Checking to see if user's guess is a letter from the word
			for(i = 0; i < wordToGuess.length; i++) {
				if (answers.guess === wordToGuess[i]) {
		    		wordToGuess[i] = answers.guess;
		    		placeholders[i] = wordToGuess[i];
		    	} else {
		    		blankWord[i] = ' _ ';
		    	};
		    //--------------------------------------------

		    	//-- Checking to see if they correctly got the word
		    	if (placeholders[i] == wordToGuess[i]) {
					win++;

					//-- Telling the user they won and prompting if they want to play again
					if (win == wordToGuess.length) {
						console.log('You Win!');

						//-- Prompt to play again
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
						//-------------------------
								if (answers.playAgain == 'y') {
									readyToPlay();
								} else {
									console.log('See you next time!');
									return;
								}
							});
						return; //-- Exits out of guess function
					} 
				} else if (guessesRemaining <= 1) {
					console.log('You Lose!');
					return;
				}
			}
			console.log(placeholders.join('').toString()); //-- Showing the word without looking like an array
			guessesRemaining--;
			console.log('Guesses Remaining: ', guessesRemaining);
			guess(); //-- Recursively running guess function	
		});
	};
	
	guess(); //-- Initial run of guess function in playGame function
}