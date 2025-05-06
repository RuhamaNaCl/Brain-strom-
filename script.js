let currentQuestion = {};
let score = 0;
let questionCount = 0;
const totalQuestions = 5;

const questionBox = document.getElementById('question');
const optionsBox = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreBox = document.getElementById('score');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(res => res.json())
    .then(data => {
      currentQuestion = data.results[0];
      displayQuestion();
    });
}

function displayQuestion() {
  questionBox.innerHTML = currentQuestion.question;
  let options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  options = shuffle(options);

  optionsBox.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.innerHTML = option;
    btn.onclick = () => selectAnswer(option);
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const allOptions = document.querySelectorAll('.option');
  allOptions.forEach(btn => btn.disabled = true);
  if (selected === currentQuestion.correct_answer) {
    score++;
  }
}

nextBtn.addEventListener('click', () => {
  questionCount++;
  if (questionCount < totalQuestions) {
    loadQuestion();
  } else {
    document.getElementById('quiz-box').classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreBox.innerText = `You scored ${score} out of ${totalQuestions}`;
  }
});

loadQuestion();
