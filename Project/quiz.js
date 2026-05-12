const questions = [
    { en: "Which was the largest city of Indus Valley?", hi: "सिंधु घाटी का सबसे बड़ा शहर कौन सा था?", options: ["Harappa", "Mohenjo-daro", "Lothal", "Kalibangan"], correct: 1 },
    { en: "Which metal was unknown to Indus people?", hi: "सिंधु वासियों को किस धातु का ज्ञान नहीं था?", options: ["Gold", "Copper", "Silver", "Iron"], correct: 3 },
    // Will add more, bruh
];

let currentIdx = 0;
let isHindi = false;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById('question-text');
const optionTexts = document.querySelectorAll('.opt-text');
const langBtn = document.getElementById('lang-toggle');
const timeDisplay = document.getElementById('time-left');
const startBtn = document.getElementById('start-timer');

function loadQuestion() {
    const q = questions[currentIdx];
    questionEl.innerText = isHindi ? q.hi : q.en;
    optionTexts.forEach((el, i) => {
        el.innerText = q.options[i];
        el.parentElement.classList.remove('correct-text');
        el.parentElement.disabled = false;
    });
    document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correctIdx = questions[currentIdx].correct;
    optionTexts[correctIdx].parentElement.classList.add('correct-text');
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    if (currentIdx < questions.length - 1) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        document.getElementById('finish-btn').style.display = 'inline-block';
    }
}

function nextQuestion() {
    currentIdx++;
    resetTimer();
    loadQuestion();
}

langBtn.addEventListener('click', () => {
    isHindi = !isHindi;
    langBtn.innerText = isHindi ? "EN" : "हि";
    questionEl.innerText = isHindi ? questions[currentIdx].hi : questions[currentIdx].en;
});

startBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 30;
    timeDisplay.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
});

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timeDisplay.innerText = timeLeft;
}

function finishQuiz() {
    window.location.href = "ending.html";
}

loadQuestion();