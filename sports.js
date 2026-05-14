let playerPos = 25;
let enemyPos = 55;

let playerHealth = 100;
let aiHealth = 100;

let gameOver = false;

let score = 0;

let playerForce = 0;
let aiForce = 0;

let clicks = 0;
let cps = 0;

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const playerBar = document.getElementById("playerHealth");
const aiBar = document.getElementById("aiHealth");

const scoreText = document.getElementById("score");
const msg = document.getElementById("message");

const btn = document.getElementById("pushBtn");

const arena = document.querySelector(".arena");

function update(){

    player.style.left = playerPos + "%";
    enemy.style.left = enemyPos + "%";

    playerBar.style.width = playerHealth + "%";
    aiBar.style.width = aiHealth + "%";

    scoreText.innerText = score;
}

update();

/* ================= PUSH ================= */

function push(){

    if(gameOver) return;

    clicks++;

    playerForce += 2.3;

    if(playerForce > 18){
        playerForce = 18;
    }

    aiHealth -= 0.5;

    if(aiHealth < 0){
        aiHealth = 0;
    }

    score += 1;

    /* SHAKE EFFECT */

    arena.classList.add("shake");

    setTimeout(()=>{
        arena.classList.remove("shake");
    },100);

    /* PLAYER ANIMATION */

    player.style.transform = "translateY(-8px)";

    setTimeout(()=>{
        player.style.transform = "translateY(0px)";
    },100);
}

btn.addEventListener("mousedown", push);
btn.addEventListener("touchstart", push);

/* ================= CLICK SPEED ================= */

setInterval(()=>{

    cps = clicks;

    clicks = 0;

},1000);

/* ================= GAME LOOP ================= */

setInterval(()=>{

    if(gameOver) return;

    let aiDifficulty = 2.5;

    if(cps > 4){
        aiDifficulty = 3.2;
    }

    if(cps > 6){
        aiDifficulty = 3.8;
    }

    if(cps > 8){
        aiDifficulty = 4.5;
    }

    if(enemyPos > 70){
        aiDifficulty += 1;
    }

    aiForce += aiDifficulty * 0.12;

    if(aiForce > 18){
        aiForce = 18;
    }

    playerForce *= 0.95;
    aiForce *= 0.93;

    let totalForce = playerForce - aiForce;

    playerPos += totalForce * 0.05;
    enemyPos += totalForce * 0.05;

    /* DAMAGE */

    if(totalForce > 0){

        aiHealth -= totalForce * 0.04;

        enemy.style.transform = "translateX(4px)";

        setTimeout(()=>{
            enemy.style.transform = "translateX(0)";
        },50);

    }else{

        playerHealth -= Math.abs(totalForce) * 0.04;

        player.style.transform = "translateX(-4px)";

        setTimeout(()=>{
            player.style.transform = "translateX(0)";
        },50);
    }

    /* LIMITS */

    if(playerHealth < 0){
        playerHealth = 0;
    }

    if(aiHealth < 0){
        aiHealth = 0;
    }

    update();

    checkWin();

},16);

/* ================= WIN CHECK ================= */

function checkWin(){

    if(enemyPos > 82 || aiHealth <= 0){

        gameOver = true;

        enemy.classList.add("fall");

        msg.innerText = "YOU WIN";

        createVictoryFlash();

        setTimeout(()=>{
            location.reload();
        },3500);
    }

    if(playerPos < -8 || playerHealth <= 0){

        gameOver = true;

        player.classList.add("fall");

        msg.innerText = "BOT WINS";

        createLoseFlash();

        setTimeout(()=>{
            location.reload();
        },3500);
    }
}

/* ================= EFFECTS ================= */

function createVictoryFlash(){

    document.body.style.background = "white";

    setTimeout(()=>{
        document.body.style.background = "black";
    },120);
}

function createLoseFlash(){

    document.body.style.background = "#400";

    setTimeout(()=>{
        document.body.style.background = "black";
    },120);
}

update();
