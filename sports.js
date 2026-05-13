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

function update(){

    player.style.left = playerPos + "%";
    enemy.style.left = enemyPos + "%";

    playerBar.style.width = playerHealth + "%";
    aiBar.style.width = aiHealth + "%";

    scoreText.innerText = score;
}

update();

function push(){

    if(gameOver) return;

    clicks++;

    playerForce += 2.15;

    if(playerForce > 16){
        playerForce = 16;
    }

    aiHealth -= 0.45;

    if(aiHealth < 0){
        aiHealth = 0;
    }

    score += 1;
}

btn.addEventListener("mousedown", push);
btn.addEventListener("touchstart", push);

setInterval(()=>{

    cps = clicks;

    clicks = 0;

},1000);

setInterval(()=>{

    if(gameOver) return;

    let aiDifficulty = 2.5;

    if(cps > 4){
        aiDifficulty = 3.2;
    }

    if(cps > 6){
        aiDifficulty = 3.6;
    }

    if(cps > 8){
        aiDifficulty = 4;
    }

    if(enemyPos > 70){
        aiDifficulty += 0.8;
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

    if(totalForce > 0){

        aiHealth -= totalForce * 0.04;

    }else{

        playerHealth -= Math.abs(totalForce) * 0.04;
    }

    if(playerHealth < 0){
        playerHealth = 0;
    }

    if(aiHealth < 0){
        aiHealth = 0;
    }

    update();

    checkWin();

},16);

function checkWin(){

    if(enemyPos > 82 || aiHealth <= 0){

        gameOver = true;

        enemy.classList.add("fall");

        msg.innerText = "YOU WIN";

        setTimeout(()=>{

            location.reload();

        },3000);
    }

    if(playerPos < -8 || playerHealth <= 0){

        gameOver = true;

        player.classList.add("fall");

        msg.innerText = "BOT WINS";

        setTimeout(()=>{

            location.reload();

        },3000);
    }
}

update();
