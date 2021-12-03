// alert("Hello")
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

//Know when you started the game
var started = false; 

//Manage levels of the game
var level = 0;

//Manage pressing keyboard
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Manage user's clicks
$('.btn').click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}
);

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (function() {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("wrong");
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $("#level-title").text('Game Over, Press Any Key to Restart');
        startOver();
    }
}


//Manage next level
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//Manage playing sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Manage animation
function animatePress (currentColour) {
    $('#' + currentColour).addClass('pressed');
    
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}