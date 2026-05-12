function toggleMusic() {
    const music = document.getElementById('bg-music');
    if (music.paused) {
        music.play();
    } else {
        window.location.href = "index.html";
    }
}

window.onload = () => {
    const music = document.getElementById('bg-music');
    music.volume = 0.5;
    music.play().catch(() => {
        console.log("Music waiting for user interaction...");
    });
};