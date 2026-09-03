import { AsyncEvent } from "/app/pages/helpers/async-event.js";
import { CoverFlow } from "/app/pages/components/cover-flow.js";
import { createPlayer, formatVideoTime } from "../helpers/youtubeHelpers.js";

class CopaPlayer {
    #timeIntervalId;
    #musicFinished = new AsyncEvent();

    constructor (currentTImeLabel, durationLabel, currentTimeBar, currentTimeDot, playerDiv) {
        this.currentTimeLabel = currentTImeLabel;
        this.durationLabel = durationLabel;
        this.currentTimeBar = currentTimeBar;
        this.currentTimeDot = currentTimeDot;
        this.playerDiv = playerDiv;
        console.log("Copa iniciada");
    }

    destroyPlayer() {
        this.player.destroy();
        this.player = null;
        this.currentTime = null;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    onPlayerStateChange(event) {
        switch (event.data) {
            case (YT.PlayerState.ENDED):
                console.log("Ended")
                this.#musicFinished.set(true);
                clearInterval(this.#timeIntervalId);
                this.playerDiv.classList.remove('active');
                this.destroyPlayer();
                break;

            case (YT.PlayerState.PLAYING):
                const duration = this.player.getDuration();

                this.#timeIntervalId = setInterval(() => {
                    const currentTime = this.player.getCurrentTime();
                    this.currentTimeLabel.textContent = formatVideoTime(currentTime);

                    const percent = (currentTime / duration) * 100;

                    this.currentTimeBar.style.width = percent + "%";
                    this.currentTimeDot.style.left = percent + "%";
                }, 1000);
                break;

            default:
                clearInterval(this.#timeIntervalId);
                break;
        }
    }

    onPlayerReady() {
        this.durationLabel.textContent = formatVideoTime(this.player.getDuration());
    }

    #startExplication(src) {
        return new Promise((resolve) => {
            const audio = new Audio(src);
            audio.addEventListener("ended", resolve);
            audio.addEventListener("canplaythrough", audio.play);
        });
    }

    async playVideo({ sourceId, explicationId, time }) {
        this.playerDiv.classList.add('active');
        this.player = createPlayer({
            playerId: "ytplayer",
            sourceId: sourceId,
            events: {
                onReady: _ => this.onPlayerReady(),
                onStateChange: (event) => this.onPlayerStateChange(event)
            }
        });
        
        await this.#startExplication(`https://res.cloudinary.com/dugdjtmbk/video/upload/${explicationId}`);
        this.player.playVideo();
        await this.#musicFinished.when(true);
        this.playerDiv.classList.remove('active');
        this.#musicFinished.set(false);
    }
}

const copaPlayer = new CopaPlayer(
    document.getElementById("current"),
    document.getElementById("duration"),
    document.getElementById("bar"),
    document.getElementById("dot"),
    document.getElementById("player")
)

// ─── CountrySelector ───────────────────────────────────────────────────────────
const teams = await fetch("/api/copa/teams");
const teamsData = await teams.json();

const countrySelector = new CoverFlow(
    await teamsData, onCardClick
);

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

                await copaPlayer.playVideo({
                    sourceId: videoData[0]["anthem_source_id"],
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

                await copaPlayer.playVideo({
                    sourceId: videoData[0]["source_id"],
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

        const videoData = await videoResponse.json();

        await copaPlayer.playVideo({
            sourceId: videoData[0]["anthem_source_id"],
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