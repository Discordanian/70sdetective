// index.js
//
// Function to convert difficulty Setting to a question count.
var level2questions = function(level) {
// 95 -> total number of people/questions available
// In the original game the levels were lowest (3 Qs per suspect) to highest (1 Q per suspect).  
var questions = 60  - (level * 23);  // levels are 0,1,2
return questions;
}

// Function to convert difficulty Setting to an alibi limit
var level2alibis = function(level) {
// At the EASIEST setting, you can ask EVERYONE EVERY question that they have.  So that's 20 people at 5 questions.   (less 1 person who's dead).
// 95 -> total number of people/questions available
// In the original game the levels were lowest (3 Qs per suspect) to highest (1 Q per suspect).  
var alibis = 30 - (level * 9); 
return questions;
}

