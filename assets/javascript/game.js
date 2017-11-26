var startScreen;
var inGameHTML;
var countDown = 45;
var questionArray = ["What is Spider-Man's secret identity?", "Throughout the 1960's, the X-Men's roster only featured one female. Who was it?"];
var answerArray = [["Toby McGuire", "Peter Parker", "Steve Rogers", "Scott Summers"], ["Anna Marie", "Ororo Munroe", "Jean Grey", "Emma Frost"]];
var correctAnswersArray = ["B. Peter Parker", "C. Jean Grey"];
var theClock;
var unansweredTally = 0;
var correctTally = 0;
var incorrectTally = 0;
var questionCounter = 0;
var selectedAnswer;


$(document).ready(function() {
    function initialScreen() {
        startScreen = "<p><a class='btn btn-primary start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".main-area").html(startScreen);
    }
initialScreen();

$("body").on("click",".start-button", function(event) {
    generateGamePlay();
    clickClickBoom();
});

$("body").on("click", ".answer", function(event) {
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswersArray[questionCounter]) {
        clearInterval(theClock);
        generateWinScreen();
    }
    else {
        clearInterval(theClock);
        generateLossScreen();
    }
});


});

function generateLossFromTimeout() {
    unansweredTally++;
    inGameHTML = "<p>Time Remaining: " + countDown + "</p>" + "<p>Bummer! You ran out of time. The corrent answer was: " + correctAnswersArray[questionCounter] + "</p>";
    $(".main-area").html(inGameHTML);
    setTimeout(waitState, 5000);
}

function generateLossScreen () {
    incorrectTally++;
    inGameHTML = "<p>Time Remaining: " + countDown + "</p><p> Incorrect!</p><p>The answer you were looking for was " + correctAnswersArray[questionCounter] + ".</p>";
    $(".main-area").html(inGameHTML);
    setTimeout(waitState, 5000);
}

function generateWinScreen () {
    correctTally++;
    inGameHTML = "<p>Time Remaining: " + countDown + "</p><p> Correct!</p><p>" + correctAnswersArray[questionCounter] + " is the right answer!</p>";
    $(".main-area").html(inGameHTML);
    setTimeout(waitState, 5000);
}

function generateGamePlay() {
    inGameHTML = "<p>Time Remaining: <span class='timer'>45</span></p><p>" + questionArray[questionCounter] + "</p><p class='answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".main-area").html(inGameHTML);
}

function clickClickBoom() {
    theClock = setInterval(fortyFiveSeconds, 1000);
    function fortyFiveSeconds() {
        if (countDown > 0) {
            countDown--;
        }
        if (countDown === 0) {
            clearInterval(theClock);
            generateLossFromTimeout();
        }
        $(".timer").html(countDown);
    }
}

function waitState() {
    if (questionCounter < 2) {
        questionCounter++;
        countDown = 45;
        generateGamePlay();
        clickClickBoom();
    }
    else {
        // finalHTML ();
    }
}