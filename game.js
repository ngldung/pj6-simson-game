var gamePatterns = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
let gameStart = false;
var level = 0;

// Start game with a key
$(document).keydown(function() {
  if (gameStart === false) {
    gameStart = true;
    newSequence();
  }});
  
// make user button chosen flash & sound
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//function check answer of user vs random list
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePatterns[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePatterns.length) {
      setTimeout(function() {newSequence()}, 1000);
    }}
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }};

// Function make random button flash, sound, increase level
function newSequence() {
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColor = buttonColors[randomNumber];
gamePatterns.push(randomChosenColor);
$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
level++;
$("h1").text("Level "+level);
userClickedPattern = [];
};

//function play sound according to color
function playSound(name) {
  var colorSound = new Audio("sounds/"+name+".mp3");
  colorSound.play();
};
// function animate when click
function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
  }, 100);
};
//function restart after choose wrong
function startOver() {
  level = 0;
  gamePatterns = [];
  gameStart = false;
};
