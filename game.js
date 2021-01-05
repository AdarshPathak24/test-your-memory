//creating array of color as they are same as id in the buttons name
var buttonColours = ["red", "blue", "green", "yellow"];

// creating a random empty arrray to store the pattern of the array
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// checking which button the user clicked
$(".btn").click(function() {
  // to store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");

  // adding the color pf button choosen into the arrray
  userClickedPattern.push(userChosenColour);

  // playing sound when user clicks the button
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(started)
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  // To check on every click ehrther the user ha clicked the correct button as in the game pattern array
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // after checking the button pressed every time we check the final button was pressed or not ie sale length
    if(userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else {
    console.log("wrong");
    // play wrong sound when wrong
    playSound("wrong");
    // apply wrong class from css
    $("body").addClass("game-over");
    // Remove game-over class afr]ter 200 miliseconds
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    // change h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// to generate randon number from 0 to 3
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // When the level is started the level increases by 1
  level++;
  // update the level in heading
  $("#level-title").text("Level " + level);
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  // choosing a random color form array
  var randomChosenColour = buttonColours[randomNumber];

  // pushing the randomly choosen color into the array
  gamePattern.push(randomChosenColour);

  // animating the button whose color has been choosen
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // adding audio to the button whose color has been choosen
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate the button which is been pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // remove the animation of button after the 100 milisecond of pressed
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
