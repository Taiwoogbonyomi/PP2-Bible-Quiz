// Define questions in JSON format
const questions = [
    {
        question: "What is the first book in the Bible?",
        options: ["Exodus", "Genesis", "Matthew", "Psalm"],
        answer: "Genesis"
    },
    {
        question: "Who built the ark?",
        options: ["Noah", "Abraham", "Moses", "David"],
        answer: "Noah"
    },
    {
        question: "Who was sold into slavery by his brothers?",
        options: ["Joseph", "Jacob", "Isaac", "Daniel"],
        answer: "Joseph"
    },
    // Add more questions here...
];

// Get DOM elements
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const optionsButtons = document.querySelectorAll(".btn");
const nextButton = document.getElementById("next-que");
const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-num-of-question");
const userScoreElement = document.querySelector(".user-score");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.querySelector(".time-left");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Initial time in seconds
let timer; // Timer variable

// Function to start the quiz
function startQuiz() {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    showQuestion();
    startTimer();
}

// Function to show current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        optionsButtons[index].textContent = option;
    });

    currentQuestionElement.textContent = currentQuestionIndex + 1;
    totalQuestionsElement.textContent = questions.length;
}

// Function to check answer
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }
}

// Function to handle next button click
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    stopTimer();
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    userScoreElement.textContent = `Score: ${score} / ${questions.length}`;
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time-left: ${timeLeft}s`;

        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000); // Update timer every second
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to restart the quiz
function restartQuiz() {
    stopTimer();
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Reset time

    // Show the start screen and hide the result screen
    startScreen.style.display = "block";
    resultScreen.style.display = "none";

    // Start the quiz again
    startQuiz();
}

// Add event listeners
optionsButtons.forEach(button => {
    button.addEventListener("click", () => {
        checkAnswer(button.textContent);
    });
});

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
startQuiz();
