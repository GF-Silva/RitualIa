import { YoutubeFrameControls } from "/app/pages/components/youtube-frame-controls.js";
import { AsyncEvent } from "/app/pages/helpers/async-event.js";
import { CoverFlow } from "/app/pages/components/cover-flow.js";

const youtubeFrameControls = new YoutubeFrameControls();

youtubeFrameControls.onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
        musicFinished.set(true);
        destroyPlayer();
    }
}

const images = [
    ["brasil", "/app/pages/copa/img/brasil.png"],
    ["canada", "/app/pages/copa/img/canada.png"],
    ["colombia", "/app/pages/copa/img/colombia.png"],
    ["espanha", "/app/pages/copa/img/espanha.png"],
    ["franca", "/app/pages/copa/img/franca.png"],
    ["inglaterra", "/app/pages/copa/img/inglaterra.png"],
    ["japao", "/app/pages/copa/img/japao.png"],
    ["mexico", "/app/pages/copa/img/mexico.png"],
    ["portugal", "/app/pages/copa/img/portugal.png"],
    ["usa", "/app/pages/copa/img/usa.png"],
    ["argentina", "/app/pages/copa/img/argentina.png"],
    ["alemanha", "/app/pages/copa/img/alemanha.png"],
    ["holanda", "/app/pages/copa/img/holanda.png"]
];

const countrySelector = new CoverFlow(
    images, onCardClick
);

// ─── CountrySelector ───────────────────────────────────────────────────────────

const playerDiv = document.getElementById('player');;
const musicFinished = new AsyncEvent();;

async function onCardClick(card, index) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.append(overlay);

    try {
        // Se for o btn do brasil -> exibe a escolha entre hino e musica
        if (index === 0) {
            const anthemSelector = document.createElement("img");
            anthemSelector.src = "/app/pages/copa/img/hino_br.png";
            
            anthemSelector.addEventListener("click", async () => {
                const videoResponse = await fetch(`teams?name=${images[index][0]}`);

                const videoData = await videoResponse.json();

                anthemSelector.remove();
                musicSelector.remove();

                await playVideo({sourceId: videoData[0][2], time: null, explicationId: videoData[0][3]});

                overlay.remove();
            });

            const musicSelector = document.createElement("img");
            musicSelector.src = "/app/pages/copa/img/musicas_br.png";

            musicSelector.addEventListener("click", async () => {
                const videoResponse = await fetch('songs');

                const videoData = await videoResponse.json();

                anthemSelector.remove();
                musicSelector.remove();

                await playVideo({sourceId: videoData[0][2], time: null, explicationId: videoData[0][3]});

                overlay.remove();
            });

            overlay.append(anthemSelector, musicSelector);
            return;
        }
        
        const videoResponse = await fetch(`teams?name=${images[index][0]}`);
        
        if (!videoResponse.ok) {
            const erro = await response.json();
            throw new Error(erro.detail);
        }

        const videoData = await videoResponse.json()

        await playVideo({sourceId: videoData[0][2], time: 60, explicationId: videoData[0][3]});
        overlay.remove();
    } catch (e) {
        showError(e.message, overlay);
    }
}

function showError(message, overlay) {
    const box = document.createElement("div");
    box.className = "error-display";

    const title = document.createElement("h1");
    title.textContent  = "Erro inesperado";
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

async function playVideo({sourceId, explicationId, time}) {
    playerDiv.classList.add('active');
    youtubeFrameControls.createPlayer(sourceId, time);
    await startExplication(`${CLOUDINARY_URL}/video/upload/${explicationId}`);
    youtubeFrameControls.player.playVideo();
    await musicFinished.when(true);
    playerDiv.classList.remove('active');
    musicFinished.set(false);
}

function startExplication(src) {
    return new Promise((resolve) => {
        const audio = new Audio(src)
        audio.addEventListener("ended", resolve)
        audio.play()
    });
}

function closePanel(overlay) {
    overlay.remove();
}