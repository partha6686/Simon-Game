var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;

$(document).keypress(function(){
    if(started===false){
        $("#level-title").html("Level "+level);
        nextSequence();
    }
    started=true;
});


$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").html("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut("fast").fadeIn("fast");

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if(currentLevel===level-1)
            setTimeout(nextSequence,1000);
        //nextSequence()
    }
    else{
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    started=false;
}
    
    


