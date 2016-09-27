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

inquirer.prompt(ready, function(answers) {
	}).then(function (answers) {
	    	if (answers.ready === 'y') {
	    		playGame();
	    	} else {
	    		console.log('Umm... OK... Well when you are ready, run the file again!');
	    	};
	});
//===============================================

//-- game play -- 
//===============
var playGame = function() {
	//-- Generate a random word
	var wordToGuess = word.randomWord;
	var placeholders = []
	// console.log(wordToGuess);
	for(i=0; i < wordToGuess.length; i++) {
		placeholders.push(' _ ');
	}
	console.log('');
	console.log('Word to guess: ');
	console.log(placeholders.join('').toString());
	console.log('');
	//--------------------------------------------
}