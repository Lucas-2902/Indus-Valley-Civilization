const questions = [
    { en: "Who discovered Harappa?", hi: "हड़प्पा की खोज किसने की?", options: ["D. Sahni", "R. Banerji", "J. Marshall", "Wheeler"], correct: 0 },
    { en: "Which was the port city?", hi: "बंदरगाह शहर कौन सा था?", options: ["Kalibangan", "Lothal", "Ropar", "Banawali"], correct: 1 },
    // Adding more questions, bruh
];

let currentIdx = 0;
let isHindi = false;
let timer;
let timeLeft = 30;
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '1', width: '1',
        videoId: '3vK1E-cW39A',
        playerVars: { 'autoplay': 0, 'controls': 0 }
    });
}

function loadQuestion() {
    const q = questions[currentIdx];
    document.getElementById('question-text').innerText = isHindi ? q.hi : q.en;
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, i) => {
        btn.innerText = q.options[i];
        btn.classList.remove('correct-ans');
        btn.disabled = false;
    });
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = questions[currentIdx].correct;
    document.querySelectorAll('.option-btn')[correct].classList.add('correct-ans');
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    
    if (currentIdx < questions.length - 1) {
        document.getElementById('next-btn').style.display = 'inline-block';
    } else {
        document.getElementById('finish-btn').style.display = 'inline-block';
    }
}

function nextQuestion() {
    currentIdx++;
    if (player && player.playVideo) {
        player.seekTo(0);
        player.playVideo();
    }
    document.getElementById('next-btn').style.display = 'none';
    loadQuestion();
    resetTimer();
}

document.getElementById('lang-toggle').onclick = () => { isHindi = !isHindi; loadQuestion(); };
document.getElementById('start-timer').onclick = () => {
    resetTimer();
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        if(timeLeft <= 0) { clearInterval(timer); checkAnswer(-1); }
    }, 1000);
};

function resetTimer() { clearInterval(timer); timeLeft = 30; document.getElementById('time-left').innerText = timeLeft; }
function finishQuiz() { window.location.href = "ending.html"; }

loadQuestion();
