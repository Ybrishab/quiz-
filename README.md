<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Modern Quiz App</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    :root {
      --bg: #ffffff;
      --text: #222222;
      --option-bg: #f1f5f9;
      --correct-bg: #d1fae5;
      --wrong-bg: #fee2e2;
      --correct-border: #22c55e;
      --wrong-border: #ef4444;
    }

    body.dark {
      --bg: #1e1e2f;
      --text: #ffffff;
      --option-bg: #2c2c3c;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      transition: background 0.3s, color 0.3s;
    }

    .container {
      background: var(--bg);
      max-width: 600px;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      padding: 60px 40px 40px 40px;
      position: relative;
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    .hidden {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
    }

    h2 {
      margin-bottom: 15px;
    }

    p {
      margin: 6px 0 0;
      font-size: 16px;
    }

    button {
      margin-top: 25px;
      width: 100%;
      padding: 14px;
      font-size: 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s, transform 0.15s;
    }

    button:disabled {
      background: #a5b4fc;
      cursor: not-allowed;
      transform: none;
    }

    button:not(:disabled):hover {
      background: #2563eb;
      transform: scale(1.03);
    }

    .option {
      margin: 12px 0;
      background: var(--option-bg);
      border-radius: 8px;
      padding: 10px 14px;
      transition: background 0.2s, border 0.3s;
      display: flex;
      align-items: center;
      cursor: pointer;
      border: 2px solid transparent;
    }

    .option.correct {
      background: var(--correct-bg);
      border-color: var(--correct-border);
    }

    .option.incorrect {
      background: var(--wrong-bg);
      border-color: var(--wrong-border);
    }

    input[type="radio"] {
      margin-right: 12px;
      transform: scale(1.2);
      cursor: pointer;
    }

    label {
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }

    #progress {
      margin-bottom: 10px;
      font-weight: 600;
    }

    #progress-bar {
      height: 10px;
      background: #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 15px;
    }

    #progress-bar-fill {
      height: 100%;
      background: #3b82f6;
      width: 0%;
      transition: width 0.3s ease-in-out;
    }

    #timer {
      text-align: right;
      font-weight: bold;
      color: #f87171;
      margin-bottom: 10px;
    }

    #theme-toggle {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #eee;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
    }

    @media (max-width: 640px) {
      .container {
        padding: 40px 20px 30px 20px;
      }
    }
  </style>
</head>
<body>

  <div class="container" id="welcome-screen">
    <button id="theme-toggle">🌗 Toggle Theme</button>
    <h2>🎉 Welcome to the Quiz!</h2>
    <p>Test your knowledge and see how many you get right.</p>
    <button id="start-btn">Start Quiz</button>
  </div>

  <div class="container hidden" id="quiz">
    <div id="progress">Question 1 of 5</div>
    <div id="progress-bar"><div id="progress-bar-fill"></div></div>
    <div id="timer">Time left: 15s</div>
    <h2 id="question">Question text</h2>

    <div class="option" id="option-a">
      <input type="radio" name="answer" id="a" class="answer" />
      <label for="a" id="a_text">Answer A</label>
    </div>

    <div class="option" id="option-b">
      <input type="radio" name="answer" id="b" class="answer" />
      <label for="b" id="b_text">Answer B</label>
    </div>

    <div class="option" id="option-c">
      <input type="radio" name="answer" id="c" class="answer" />
      <label for="c" id="c_text">Answer C</label>
    </div>

    <div class="option" id="option-d">
      <input type="radio" name="answer" id="d" class="answer" />
      <label for="d" id="d_text">Answer D</label>
    </div>

    <button id="submit" disabled>Submit</button>
  </div>

  <div class="container hidden" id="result">
    <h2>Quiz Completed!</h2>
    <div id="result-summary"></div>
    <button id="restart-btn">Restart Quiz</button>
  </div>

<script>
  const quizData = [
    {
      question: "What is the capital of France?",
      a: "Berlin",
      b: "Madrid",
      c: "Paris",
      d: "Lisbon",
      correct: "c"
    },
    {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d"
    },
    {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b"
    },
    {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "None of the above",
      correct: "b"
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      a: "<style>",
      b: "<css>",
      c: "<script>",
      d: "<link>",
      correct: "a"
    }
  ];

  let currentQuiz = 0;
  let score = 0;
  let timer;
  const TIME_LIMIT = 15;

  const welcomeScreen = document.getElementById('welcome-screen');
  const quiz = document.getElementById('quiz');
  const result = document.getElementById('result');
  const questionEl = document.getElementById('question');
  const answersEls = document.querySelectorAll('.answer');
  const submitBtn = document.getElementById('submit');
  const startBtn = document.getElementById('start-btn');
  const resultSummary = document.getElementById('result-summary');
  const progressEl = document.getElementById('progress');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const restartBtn = document.getElementById('restart-btn');
  const timerEl = document.getElementById('timer');
  const themeToggle = document.getElementById('theme-toggle');

  const a_text = document.getElementById('a_text');
  const b_text = document.getElementById('b_text');
  const c_text = document.getElementById('c_text');
  const d_text = document.getElementById('d_text');

  const optionContainers = {
    a: document.getElementById('option-a'),
    b: document.getElementById('option-b'),
    c: document.getElementById('option-c'),
    d: document.getElementById('option-d')
  };

  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', () => location.reload());
  themeToggle.addEventListener('click', () => document.body.classList.toggle('dark'));

  answersEls.forEach(input => {
    input.addEventListener('change', () => {
      submitBtn.disabled = false;
    });
  });

  function startQuiz() {
    currentQuiz = 0;
    score = 0;
    welcomeScreen.classList.add('hidden');
    quiz.classList.remove('hidden');
    loadQuiz();
  }

  function loadQuiz() {
    clearTimeout(timer);
    submitBtn.disabled = true;
    deselectAnswers();
    resetOptionStyles();

    const q = quizData[currentQuiz];
    questionEl.textContent = q.question;
    a_text.textContent = q.a;
    b_text.textContent = q.b;
    c_text.textContent = q.c;
    d_text.textContent = q.d;

    progressEl.textContent = `Question ${currentQuiz + 1} of ${quizData.length}`;
    progressBarFill.style.width = `${((currentQuiz + 1) / quizData.length) * 100}%`;

    let timeLeft = TIME_LIMIT;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time left: ${timeLeft}s`;
      if (timeLeft === 0) {
        clearInterval(timer);
        autoSubmit();
      }
    }, 1000);
  }

  function deselectAnswers() {
    answersEls.forEach(el => el.checked = false);
  }

  function resetOptionStyles() {
    Object.values(optionContainers).forEach(opt => opt.classList.remove('correct', 'incorrect'));
  }

  function autoSubmit() {
    submitBtn.disabled = true;
    const q = quizData[currentQuiz];
    const selected = [...answersEls].find(ans => ans.checked);
    const userAnswer = selected ? selected.id : null;

    if (userAnswer === q.correct) {
      score++;
      optionContainers[q.correct].classList.add('correct');
    } else {
      if (userAnswer) optionContainers[userAnswer].classList.add('incorrect');
      optionContainers[q.correct].classList.add('correct');
    }

    setTimeout(() => {
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        showResult();
      }
    }, 1500);
  }

  submitBtn.addEventListener('click', autoSubmit);

  function showResult() {
    quiz.classList.add('hidden');
    result.classList.remove('hidden');
    resultSummary.innerHTML = `<p>You got <strong>${score}</strong> out of <strong>${quizData.length}</strong> correct!</p>`;
  }
</script>

</body>
</html>
