let pos = 40; 
let active = true;

function push() {
    if(!active) return;
    pos += 2.8; 
    update();
}

function update() {
    const p = document.getElementById('playerMan');
    const a = document.getElementById('aiMan');

    p.style.left = (pos - 15) + "vw";
    a.style.left = (pos + 5) + "vw";

    if(pos > 75) end(a, "YOU PUSHED HIM OFF!");
    if(pos < 10) end(p, "YOU FELL OFF!");
}

function end(target, text) {
    active = false;
    target.classList.add('falling');
    setTimeout(() => {
        alert(text);
        location.reload();
    }, 800);
}

setInterval(() => {
    if(!active) return;
    let strength = (pos > 60) ? 0.9 : 0.5;
    pos -= strength;
    update();
}, 100);