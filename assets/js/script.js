//array of quiz questions with choices and answers
let questions = [
    {
        question: "Who is the Main Character in One Piece?",
        choices: ["Naruto", "Goku", "Luffy", "Eren Jaeger"],
        answer: "Luffy"
    },
    {
        question: "How many Dragon Balls do you need to summon Shenron?",
        choices: ["1", "24", "13", "7"],
        answer: "7"
    },
    {
        question: "What type of Sharingan does Itachi wield?",
        choices: ["Mangekyou", "Tomoe", "Nine-Tails", "Pineapple on Pizza"],
        answer: "Mangekyou"
    }
]

let startButton = document.getElementById("start");
let quizContainer = document.getElementById("quiz-container");
let quizQuestions = document.getElementById("question");
let quizChoices = document.getElementById("choices");
let initials = document.getElementById("initials");
let saveScoreButton = document.getElementById("save-score");
let timerEl = document.getElementById("timer");
let form = document.getElementById("result-container");

//initialize variables for the quiz
let timeLeft = 60
let currentQuestion = 0
let score = 0
let timer;

//mouse click event listeners
startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);

//starts quiz
function startQuiz(e) {
    startButton.classList.add("hide");
    startTimer();
    displayQuestion();
}

//starts timer
function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000)
}

//displays current question
function displayQuestion() {
    quizQuestions.textContent = questions[currentQuestion].question;
    quizChoices.innerHTML = "";
    for (i = 0; i < questions[currentQuestion].choices.length; i++) {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.textContent = questions[currentQuestion].choices[i];
        button.onclick = checkAnswer;
        li.append(button);
        quizChoices.append(li);
    }
}

//checks if answer is correct or incorrect
function checkAnswer() {
    console.log(this.textContent);
    if (this.textContent === questions[currentQuestion].answer) {
        console.log("Correct!");
        alert("Correct!");
        score++;
    } else {
        console.log("Incorrect!");
        alert("Incorrect");
        timeLeft -= 10
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        endQuiz();
    } else {
        displayQuestion()
    }
}

//when the quiz is ended, display scores
function endQuiz() {
    console.log("Game Over");
    clearInterval(timer);
    quizContainer.classList.add("hide");
    quizQuestions.textContent = "Game Over!";
    quizChoices.innerHTML = "";
    timerEl.textContent = "";
    saveScoreButton.disabled = false;
    form.removeAttribute("class", "hide")
    
    let resultContainer = document.getElementById("result-container");
    let scoreElement = document.createElement("p");
    scoreElement.textContent = "Your score: " + score + " out of " + questions.length;
    resultContainer.appendChild(scoreElement);

    saveScoreButton.disabled = false;
    form.removeAttribute("class", "hide");
}

//saves score to local storage
function saveScore(e) {
    e.preventDefault()
    let initialsValue = initials.value.trim();

    if (initialsValue !== "") {
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        let newScore = {
            initials: initialsValue,
            score: score
        };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
        saveScoreButton.disabled = true;
    }
}

//displays scores from highest to lowest
function displayHighScores() {
    console.log("High Score");
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let highScoresContainer = document.getElementById("high-scores");
    highScoresContainer.innerHTML = "";
    console.log(highScores); // Clear previous scores

    //sort high scores
    highScores.sort((a, b) => b.score - a.score);

    for (let i = 0; i < highScores.length; i++) {
        let scoreEntry = document.createElement("p");
        scoreEntry.textContent = highScores[i].initials + ": " + highScores[i].score;
        highScoresContainer.appendChild(scoreEntry);
    }
}
