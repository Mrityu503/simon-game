/* Game Javascript File  */

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "yellow", "blue", "green"];
var level = 0;
var started = false;
$(document).keydown(function(){
	if(!started){
		$("h1").text("Level " + level);
		nextSequence();
		started = true;	
	}
});

 
$(".btn").click(function(){
 		var userChosenColor = $(this).attr("id");
 		userClickedPattern.push(userChosenColor);
 		playSound(userChosenColor);
 		animatePress(userChosenColor);
 		checkAnswer(userClickedPattern.length-1)
 	});
function nextSequence(){
	level++;
	$("h1").text("Level " + level);
	var random = Math.floor(Math.random()*4);
	userClickedPattern = [];
	var randomChosenColor = buttonColours[random];
	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
 	audio.play();
}

function animatePress(currentColor){
	$("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
	{
		if(userClickedPattern.length === gamePattern.length)
			setTimeout(nextSequence, 1000);
	}
	else
	{
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over! Press any key to return!");
		startOver();
	}
}

function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}