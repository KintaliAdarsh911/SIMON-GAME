var btnCol = ["red", "blue", "green", "yellow"];
var gamePat = [];
var clickedPat = [];

var start = false;
var level = 0;

$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function() {

  var chosenCol = $(this).attr("id");
  clickedPat.push(chosenCol);

  playSound(chosenCol);
  animatePress(chosenCol);

  checkAnswer(clickedPat.length-1);
});

function checkAnswer(currLevel) {

    if (gamePat[currLevel] === clickedPat[currLevel]) {
      if (clickedPat.length === gamePat.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game-Over, Press any key to restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  clickedPat = [];
  level++;
  $("#level-title").text("Level - " + level);
  var rndNum = Math.floor(Math.random() * 4);
  var rndChosenCol = btnCol[rndNum];
  gamePat.push(rndChosenCol);

  $("#" + rndChosenCol).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(rndChosenCol);
}

function animatePress(currCol) {
  $("#" + currCol).addClass("pressed");
  setTimeout(function () {
    $("#" + currCol).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePat = [];
  start = false;
}