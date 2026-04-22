function togglePanel() {
  document.getElementById("panel").classList.toggle("open");
  document.getElementById("playerBox").classList.toggle("shift");
}

function toggleQueue() {
  document.getElementById("queue").classList.toggle("open");
}

/* YOUTUBE */
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    videoId: 'syqJAgTQdlU',
    playerVars: { autoplay: 1, controls: 0 },
    events: {
      onReady: (e) => {
        e.target.mute();
        e.target.playVideo();

        setInterval(() => {
          const d = player.getDuration();
          const c = player.getCurrentTime();

          if (d) {
            document.getElementById("duration").innerText = format(d);
            document.getElementById("current").innerText = format(c);

            const p = (c / d) * 100;
            document.getElementById("bar").style.width = p + "%";
            document.getElementById("dot").style.left = p + "%";
          }
        }, 500);
      }
    }
  });
}

function format(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}