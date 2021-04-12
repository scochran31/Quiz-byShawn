var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#Start-Quiz");
var quizEl = document.querySelector("#quiz");
var quizAns = document.querySelector("#quiz-body");
var resultEl = document.querySelector("#result");

var quizQuestion = [
    {question: "DOM is an abbreviation for what?",
    options: ["Don't over manipulate", "Document Object Model", "Decrease Obeject Material"],
    answer: "2"},
    {question: "document.querySelector will return:",
    options: ["The last element that matches the selector", "Every element that matches the selector", "The firs element that matches the selector"],
    answer: "3"},
];

var indexNum = 0;
var timeLeft = 59;
var correct = 0;
var wrong = 0;
var play = true;

var countdown = function() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds";
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + " second";
            timeLeft--;
        } else {
            timerEl.textContent = "Time Expired";
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000)
};

var startQuiz = function() {
    countdown();
    quizEl.setAttribute("style", "text-align: center; color: purple; font-weight: bold;");
    quizAns.setAttribute("style", "text-align: center; width: fit-content;");

    runQuiz();
};

var runQuiz = function() {
    if(indexNum === quizQuestion.length) {
        play = false;
    } else {
        var question = quizQuestion[indexNum].question;
        var options = quizQuestion[indexNum].options;
        answer = quizQuestion[indexNum].answer;

        quizEl.textContent = question;
        quizAns.textContent = "";

        for (var i = 0; i < options.length; i++) {
            var btnEl = document.createElement("button");
            btnEl.className = "btn guess";
            btnEl.setAttribute("btn-id", [i+1]);
            btnEl.textContent = `${[i+1]}. ${options[i]}`;
            quizEl.appendChild(btnEl);
       }
        indexNum++;
    }
};

var answer = function(event) {
    var targetEl = event.target;
    if(targetEl.matches(".guess")) {
        var guessId = targetEl.getAttribute("btn-id");
        answerCompare(guessId);
    }
};

var answerCompare = function(guessId) {
    if(guessId === answer) {
        timeLeft += 3;
        correct++;
        resultEl.innerText = "Correct!";
        runQuiz();
    } else {
        timeLeft -= 10;
        wrong++;
        resultEl.innerText = "Wrong!";
        runQuiz();
    }
};

startBtn.addEventListener("click", startQuiz);
quizEl.addEventListener("click", answer);
