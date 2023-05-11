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
let timeLeft = 90
let currentQuestion = 0
let score = 0
let timer;
let saveScore;

startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);

function startQuiz(e) {
    startButton.classList.add("hide");
    startTimer();
    displayQuestion();
}

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000)
}

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

function checkAnswer() {
    console.log(this.textContent);
    if (this.textContent === questions[currentQuestion].answer) {
        console.log("Correct!");
        score++;
    } else {
        console.log("Incorrect!");
        timeLeft -= 5
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        endQuiz();
    } else {
        displayQuestion()
    }
}

function endQuiz() {
    console.log("Game Over");
    clearInterval(timer);
    quizContainer.classList.add("hide");
    quizQuestions.textContent = "Game Over!";
    quizChoices.innerHTML = "";
    timerEl.textContent = "";
    saveScoreButton.disabled = false;
    displayHighScores();
}


function displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let highScoresContainer = document.getElementById("high-scores");
    highScoresContainer.innerHTML = ""; // Clear previous scores

    for (let i = 0; i < highScores.length; i++) {
        let scoreEntry = document.createElement("p");
        scoreEntry.textContent = highScores[i].initials + ": " + highScores[i].score;
        highScoresContainer.appendChild(scoreEntry);
    }
}


