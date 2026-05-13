const questions = [
    { en: "What was the population of Indus Valley Civilization at its peak?", hi: "सिंधु घाटी सभ्यता की जनसंख्या अपने चरम पर कितनी थी?", options: ["1 Million", "~ 8.3 Billion", "5 Million +", "5 Billion +"], correct: 3 },
    { en: "Which outdoor sport among these was being played in Indus Valley Civilization?", hi: "इनमें से कौन सा आउटडोर खेल सिंधु घाटी सभ्यता में खेला जाता था?", options: ["Soccor", "Wrestling", "GTA VI", "All of these"], correct: 2 },
    { en: "What is the amount for the one who decodes language of IVC's one inscription?", hi: "सिंधु घाटी सभ्यता के एक शिलालेख की भाषा को डिकोड करने वाले के लिए कितनी राशि (पुरस्कार) है?", options: ["$1 Million", "$8.3 Billion", "$5 Million", "$5 Billion"], correct: 1 },
    { en: "How Indus Valley Civilization Declined?", hi: "सिंधु घाटी सभ्यता का पतन कैसे हुआ?", options: ["By Floods", "By Draughts", "No one knows", "None of These"], correct: 3 },
    { en: "What was the ratio of bricks used in IVC", hi: "सिंधु घाटी सभ्यता में प्रयुक्त ईंटों का अनुपात क्या था?", options: ["1:1:1", "1:2:3", "1:4:3", "1:2:4"], correct: 4 },
    { en: "Which river was the main source of water for IVC?", hi: "सिंधु घाटी सभ्यता के लिए जल का मुख्य स्रोत कौन सी नदी थी?", options: ["Indus", "Hakra-Ghaggar", "Andaman and Nicobar Islands", "Ganga"], correct: 1 },
    { en: "Who excavated Harrapa in 1921?", hi: "1921 में हड़प्पा की खुदाई किसने की थी?", options: ["Rakhaldas Banerji", "Daya Ram Sahni", "John Marshall", "Elon Musk"], correct: 2 },
    { en: "What does Mesopotimia called Indus Valley Civilization?", hi: "मेसोपोटामिया के लोग सिंधु घाटी सभ्यता को क्या कहते थे?", options: ["Meluhha", "Indus Valley Civilization", "Ahhulem", "Mululha"], correct: 1 },
    { en: "What was the famous Man's Face made up of?", hi: "प्रसिद्ध 'पुरुष का चेहरा' (Man's Face) किस चीज़ से बना था?", options: ["Clay", "Cow dung", "Sandstone", "Terracotta"], correct: 4 },
    { en: "What were found as archaeological remains of IVC?", hi: "सिंधु घाटी सभ्यता के पुरातात्विक अवशेषों के रूप में क्या पाया गया था?", options: ["People", "Bricks", "Inscriptions", "None of These"], correct: 1 },
    { en: "When did Indus Valley Civilization's early stage began?", hi: "सिंधु घाटी सभ्यता का प्रारंभिक चरण कब शुरू हुआ था?", options: ["2600 BCE", "3000 BCE", "3300 BCE", "Yesterday"], correct: 3 },
    { en: "Which instrument among these was used in Indus Valley Civilization", hi: "इनमें से कौन सा वाद्य यंत्र सिंधु घाटी सभ्यता में उपयोग किया जाता था?", options: ["Borendo", "Boreendo", "Bordo", "Beerdo"], correct: 2 },
    { en: "Which of these structures were found in Indus Valley Civilization?", hi: "सिंधु घाटी सभ्यता में इनमें से कौन सी संरचनाएं पाई गई थीं?", options: ["Pyramid", "Burj Khalifa", "Shrines", "Citadel"], correct: 4 },
    { en: "What the Chess version of IVC was known as?", hi: "सिंधु घाटी सभ्यता के शतरंज संस्करण को किस नाम से जाना जाता था?", options: ["Chauthraj", "Chautraj", "Chatraj", "None of These"], correct: 1 },
    { en: "Which was the largest city of Indus Valley?", hi: "सिंधु घाटी का सबसे बड़ा शहर कौन सा था?", options: ["Mohenjo-daro", "Harrapa", "Lothal", "Kalibangan"], correct: 2 }
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
