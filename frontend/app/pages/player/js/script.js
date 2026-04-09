function togglePanel() {
    const panel = document.getElementById("panel");
    const playerBox = document.getElementById("playerBox");

    panel.classList.toggle("open");
    playerBox.classList.toggle("shift");
}

function format(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
}