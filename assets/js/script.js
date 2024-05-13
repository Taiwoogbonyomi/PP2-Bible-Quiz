// Get DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-que");
const restartButton = document.getElementById("restart-btn");
const questionElement = document.getElementById("question");
const option1 = document.getElementById("opt1");
const option2 = document.getElementById("opt2");
const option3 = document.getElementById("opt3");
const option4 = document.getElementById("opt4");
const currentQuestionNum = document.getElementById("current-question");
const totalQuestionsNum = document.getElementById("total-num-of-question");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

// Global Variables
let questions = []; // Array to store questions
let score = 0; // Variable to store score
let currentQuestionIndex = 0; // Variable to store current question index
let timerInterval; // Variable to store timer interval

// Function to restart the quiz
function restartQuiz() {
    score = 0; // Reset score to 0
    currentQuestionIndex = 0; // Reset current question index
    clearInterval(timerInterval); // Clear timer interval
    initializeQuiz(); // Reinitialize the quiz
}

// Function to start the timer
function startTimer(timeLimit) {
    let timeLeft = timeLimit;

    // Update timer every second
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${timeLeft} seconds left`;

        // End quiz if time runs out
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Fetch questions from JSON file
try {
  console.log("Fetching questions...");
  const response = await fetch("questions.json");
  if (!response.ok) {
      throw new Error("Failed to fetch questions");
  }
  const data = await response.json();
  console.log("Questions fetched:", data);
  return data;
} catch (error) {
  console.error("Error fetching questions:", error.message);
}


// Display question and options
function displayQuestion(questionIndex) {
    const currentQuestion = questions[questionIndex];
    questionElement.textContent = currentQuestion.question;

    const options = currentQuestion.options;
    option1.textContent = options[0];
    option2.textContent = options[1];
    option3.textContent = options[2];
    option4.textContent = options[3];
}

// Check the selected answer
function checkAnswer(selectedOptionIndex, questionIndex) {
    const currentQuestion = questions[questionIndex];
    const correctOptionIndex = currentQuestion.options.indexOf(currentQuestion.correct);

    if (selectedOptionIndex === correctOptionIndex) {
        score++;
    }

    if (questionIndex + 1 < questions.length) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
  console.log("Quiz ended");
  clearInterval(timerInterval);
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  scoreElement.textContent = score;
}

// Initialize the quiz
async function initializeQuiz() {
  console.log("Initializing quiz...");
  questions = await fetchQuestions();
  console.log("Fetched questions:", questions);
  if (questions.length > 0) {
      displayQuestion(0); // Start with the first question
      startTimer(15); // Start the timer with a time limit of 15 seconds
  }
}

// Call initializeQuiz() to start the quiz
initializeQuiz();

// Event listener for the restart button
restartButton.addEventListener("click", restartQuiz);
