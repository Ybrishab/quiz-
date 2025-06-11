const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "Home Tool Markup Language",
    c: "Hyperlinks and Text Markup Language",
    d: "Hyper Trainer Marking Language",
    correct: "a"
  },
  {
    question: "Which language is used for styling web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "c"
  },
  {
    question: "What does DOM stand for?",
    a: "Document Object Model",
    b: "Display Object Management",
    c: "Digital Ordinance Model",
    d: "Desktop Oriented Mode",
    correct: "a"
  }
];

let currentQuiz = 0;
let score = 0;
let time = 15;
let timerInterval;

// Get elements
const questionEl = document.getElementById('question');
const answersEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const timerDisplay = document.getElementById('time');
const submitBtn = document.getElementById('submit');
const quiz = document.getElementById('quiz');

// Welcome screen logic
const welcomeScreen = document.getElementById('welcome');
const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-btn');

// Start quiz on button click
startBtn.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  quizContainer.style.display = 'block';
  loadQuiz();
});

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  resetTimer();
}

function deselectAnswers() {
  answersEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  return [...answersEls].find(answer => answer.checked)?.id;
}

function resetTimer() {
  clearInterval(timerInterval);
  time = 15;
  timerDisplay.innerText = time;
  timerInterval = setInterval(() => {
    time--;
    timerDisplay.innerText = time;
    if (time === 0) {
      clearInterval(timerInterval);
      submitBtn.click();
    }
  }, 1000);
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  }
});

function showResult() {
  clearInterval(timerInterval);
  quiz.innerHTML = `
    <h2>You answered ${score} out of ${quizData.length} questions correctly.</h2>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

