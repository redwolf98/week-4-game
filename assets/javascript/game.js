
var crystalImages = ["assets/images/crystal_1.jpg",
                     "assets/images/crystal_2.jpg",
                     "assets/images/crystal_3.jpg",
                     "assets/images/crystal_4.jpg"];

var wins = 0;
var losses = 0;
var currentGoalNumber = 0;
var currentTotalScore = 0;
var currentCrystalRandomNumbers = [0,0,0,0];
var DEBUG = false;

function log(val){
    if(DEBUG) console.log(val);
}


function generateCrystalNumbers(){
    for(i =0; i < 4; i++){
        var x =  Math.floor(Math.random() * 12) + 1;
        while(currentCrystalRandomNumbers.indexOf(x) != -1){
            x =  Math.floor(Math.random() * 12) + 1;
        }
        currentCrystalRandomNumbers[i] = x;
        log("Crystal " + i + " = " + currentCrystalRandomNumbers[i]);
    }
    
}

function generateCurrentGoalNumber(){
    currentGoalNumber = 0;
   while(currentGoalNumber < 19 || currentGoalNumber > 120){
       currentGoalNumber = 0;
       for(i=0;i < 4; i++){
        currentGoalNumber += currentCrystalRandomNumbers[i] * (Math.floor(Math.random() * 5) + 1);
        log("currentGoalNumber: " + currentGoalNumber);
       }
   }
   $("#goalNumber").text(currentGoalNumber);
   
}

function populateCrystals(){
    for(i=0; i< 4;i++){
        var crystal = $("<img>");
        crystal.addClass("crystal");
        crystal.attr('src',crystalImages[i]);
        crystal.attr('value',currentCrystalRandomNumbers[i]);

        crystal.bind("click", function(){
            log("clicked");
            currentTotalScore += parseInt($(this).attr("value"));
            log(currentTotalScore);
            displayCurrentTotalScore();
    
            if(currentTotalScore == currentGoalNumber){
                log("You win!");
                wins++;
                newGame();
            }else if(currentTotalScore > currentGoalNumber){
                log("You lose!");
                losses++;
                newGame();
            }
    
        });

        $(".crystals").append(crystal);
      }
}

function startGame(){
    generateCrystalNumbers();
    generateCurrentGoalNumber();
    displayCurrentTotalScore();
    populateCrystals();
}


function displayWinsAndLosses(){
    $("#wins").text("Wins: " + wins);
    $("#losses").text("Losses: " + losses);
}

function newGame(){
    $(".crystals").empty();
    currentTotalScore = 0;
    displayWinsAndLosses();
    generateCrystalNumbers();
    log("Generating NEW goal");
    generateCurrentGoalNumber();
    displayCurrentTotalScore();
    populateCrystals();
}

$(document).ready(function(){
    log("start");
    startGame();
});

function displayCurrentTotalScore(){
    $("#totalScore").text(currentTotalScore);
}





