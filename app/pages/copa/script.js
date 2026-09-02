import { YoutubeFrameControls } from "/app/pages/components/youtube-frame-controls.js";
import { AsyncEvent } from "/app/pages/helpers/async-event.js";
import { CoverFlow } from "/app/pages/components/cover-flow.js";

const youtubeFrameControls = new YoutubeFrameControls();

let timeIntervalId;
const currentTimeLabel = document.getElementById("current");
const durationLabel = document.getElementById("duration");

const currentTimeBar = document.getElementById("bar");
const currentTimeDot = document.getElementById("dot");

youtubeFrameControls.onPlayerStateChange = (event) => {

    switch (event.data) {
        case (YT.PlayerState.ENDED):
            musicFinished.set(true);
            clearInterval(timeIntervalId);
            youtubeFrameControls.destroyPlayer();
            break;

        case (YT.PlayerState.PLAYING):
            const duration = youtubeFrameControls.player.getDuration();

            timeIntervalId = setInterval(() => {
                const currentTime = youtubeFrameControls.player.getCurrentTime();
                currentTimeLabel.textContent = youtubeFrameControls.format(currentTime);

                const percent = (currentTime / duration) * 100;

                currentTimeBar.style.width = percent + "%";
                currentTimeDot.style.left = percent + "%";
            }, 1000);
            break;

        default:
            clearInterval(timeIntervalId);
            break;
    }
}

youtubeFrameControls.onPlayerReady = event => {
    console.log("Player ready");
    durationLabel.textContent = youtubeFrameControls.format(youtubeFrameControls.player.getDuration());
}


window.youtubeFrameControls = youtubeFrameControls;

const teams = await fetch("/api/copa/teams");
const teamsData = await teams.json();

const countrySelector = new CoverFlow(
    await teamsData, onCardClick
);

// ─── CountrySelector ───────────────────────────────────────────────────────────

const playerDiv = document.getElementById('player');;
const musicFinished = new AsyncEvent();

async function onCardClick(card, index) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.append(overlay);

    try {
        // Se for o btn do brasil -> exibe a escolha entre hino e musica
        if (index === 0) {
            const anthemSelector = document.createElement("img");
            anthemSelector.src = "/storage/copa_flags/hino_br.png";

            anthemSelector.addEventListener("click", async () => {
                const videoResponse = await fetch(`/api/copa/teams/${teamsData[index]["id"]}`);

                const videoData = await videoResponse.json();

                anthemSelector.remove();
                musicSelector.remove();

                await playVideo({
                    sourceId: videoData[0]["anthem_source_id"],
                    time: null,
                    explicationId: videoData[0]["explication_source"]
                });

                overlay.remove();
            });

            const musicSelector = document.createElement("img");
            musicSelector.src = "/storage/copa_flags/musicas_br.png";

            musicSelector.addEventListener("click", async () => {
                const videoResponse = await fetch('/api/copa/songs');
                const videoData = await videoResponse.json();
                anthemSelector.remove();
                musicSelector.remove();

                await playVideo({
                    sourceId: videoData[0]["source_id"],
                    time: null,
                    explicationId: videoData[0]["explication_source"]
                });

                overlay.remove();
            });

            overlay.append(anthemSelector, musicSelector);
            return;
        }

        const videoResponse = await fetch(`/api/copa/teams/${teamsData[index]["id"]}`);

        if (!videoResponse.ok) {
            const erro = await response.json();
            throw new Error(erro.detail);
        }

        const videoData = await videoResponse.json()

        await playVideo({
            sourceId: videoData[0]["anthem_source_id"],
            time: 60,
            explicationId: videoData[0]["explication_source"]
        });
        overlay.remove();
    } catch (e) {
        showError(e.message, overlay);
    }
}

function showError(message, overlay) {
    const box = document.createElement("div");
    box.className = "error-display";

    const title = document.createElement("h1");
    title.textContent = "Erro inesperado";
    title.style.cssText = "text-align:center;margin:0 0 12px 0";

    const msg = document.createElement("p");
    msg.textContent = message;

    const exitBtn = document.createElement("button");
    exitBtn.className = "btn-fechar";
    exitBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 6 6 18"></polyline>
            <polyline points="6 6 18 18"></polyline>
        </svg>`;

    exitBtn.addEventListener("click", () => {
        overlay.remove();
        box.remove();
    });

    box.append(exitBtn, title, msg);
    document.body.append(overlay, box);
}

async function playVideo({ sourceId, explicationId, time }) {
    playerDiv.classList.add('active');
    youtubeFrameControls.createPlayer(sourceId, time);
    await startExplication(`https://res.cloudinary.com/dugdjtmbk/video/upload/${explicationId}`);
    youtubeFrameControls.player.playVideo();
    await musicFinished.when(true);
    playerDiv.classList.remove('active');
    musicFinished.set(false);
}

function startExplication(src) {
    return new Promise((resolve) => {
        const audio = new Audio(src);
        audio.addEventListener("ended", resolve);
        audio.addEventListener("canplaythrough", audio.play);
    });
}

function closePanel(overlay) {
    overlay.remove();
}