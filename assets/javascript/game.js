var startScreen;
var inGameHTML;
var countDown = 45;
var questionArray = ["When is Parker's birthday?", "Which one of Parker's 'Truck Crew' has been friends with him since they were infants?", "Who was Parker for Halloween this year?", "Which form of telepathy does Parker prefer?", "Where does Parker go to school?", "What is Parker's favorite mode of two-wheeled transportation?"];
var answerArray = [["June 3rd, 2013", "December 4th, 2013", "November 27th, 2014", "March 13th, 2014"], ["Enzo", "River", "Ezra", "Jude"], ["Bob the Builder", "Mario", "Spider-Man", "Darth Vader"], ["ESP", "Mindmeld", "Mind Reading", "Psychic Probe"], ["Green Sprout", "Stepping Stone", "Child Craft School", "Habibi's Hutch Preschool"], ["Motorcycle","Airplane","Bike", "Boat"]];
var correctAnswersArray = ["B. December 4th, 2013", "A. Enzo", "D. Darth Vader", "B. Mindmeld", "A. Green Sprout", "C. Bike"];
var imageArray = ["<img class='winner-image' src='assets/images/born.jpg'>", "<img class='winner-image' src='assets/images/parkerenzo.jpg'>", "<img class='winner-image' src='assets/images/darthvader.jpg'>", "<img class='winner-image' src='assets/images/mindmeld.jpg'>", "<img class='winner-image' src='assets/images/gs-hard-day.jpg'>", "<img class='winner-image' src='assets/images/parker-bike.jpg'>"];
var theClock;
var unansweredTally = 0;
var correctTally = 0;
var incorrectTally = 0;
var questionCounter = 0;
var selectedAnswer;


$(document).ready(function() {
    function initialScreen() {
        startScreen = "<p><a class='btn btn-success btn-lg start-button' href='#' role='button'>Start</a></p>";
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
    inGameHTML = "<p>Time Remaining: " + countDown + "</p><p> Correct!</p><p>" + correctAnswersArray[questionCounter] + " is the right answer!</p><p>" + imageArray[questionCounter] + "</p>";
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
    if (questionCounter < 5) {
        questionCounter++;
        countDown = 45;
        generateGamePlay();
        clickClickBoom();
    }
    else {
        finalHTML();
    }
}

function finalHTML() {
    inGameHTML = "<p>Here are your results! </p><p>Correct Answers: " + correctTally + "</p><p>Incorrect Answers: " + incorrectTally + "</p><p>Unanswered: " + unansweredTally + "<p>";
    $('.main-area').html(inGameHTML);
}