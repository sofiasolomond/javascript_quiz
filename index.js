
function question(questionText, choices, answer) {
    this.questionText = questionText;
    this.choices = choices;
    this.answer = answer;
};
var questions = [
    new question("JavaScript is the programming language of ___", ["Desktop", "Mobile", "Web", "Server"], "Web"),
    new question("In which HTML element, we put the JavaScript code", ["javascript", "js", "script", "css"], "script"),
    new question("Which variables takes precedence over the others if the names are the same?", ["Global variable", "The local element", "The two of the above", "None of the above"], "The local element"),
    new question("Which function returns the character in the string starting at the specified position", ["slice()", "split()", "substr()", "search()"], "substr()"),
    new question("In JavaScript the x===y statement implies that:", ["Both are equal in value, type and reference address",
        "Both are x and y are equal in value only",
        "Both are equal in the value and data type",
        "Both are not same at all."],
        "Both are equal in the value and data type")
]
function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};
var jsQuiz = new quiz(questions);

quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex]
}

quiz.prototype.checkOptionWithAnwer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++
}


question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer;
};

function loadQuestions() {
    if (jsQuiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById('question')
        element.innerHTML = jsQuiz.getQuestionByIndex().questionText;
        var choices = jsQuiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            document.getElementById('choice' + i).innerHTML = choices[i];
            handleOptionButton('btn' + i, choices[i])
        }
    }
    showProgress()
};

function showProgress() {
    var currentQuestionNumber = jsQuiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Question " + currentQuestionNumber + " of " + jsQuiz.questions.length;
};

function showScores() {

    var quizOver = "<h1>Results </h1>";
    quizOver += "<h2 id='score'> Your score is " + jsQuiz.score + " - " + ((jsQuiz.score / questions.length) * 100) + " % ";
    var element = document.getElementById('quiz')
    element.innerHTML = quizOver;
};

function handleOptionButton(id, choice) {
    document.getElementById(id).onclick = function () {
        jsQuiz.checkOptionWithAnwer(choice);
        loadQuestions();
    };

};
loadQuestions();