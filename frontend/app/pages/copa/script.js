import { YoutubeFrameControls } from "/pages/components/youtube-frame-controls.js";
import { AsyncEvent } from "/pages/helpers/async-event.js";
import { CoverFlow } from "/pages/components/cover-flow.js";

const youtubeFrameControls = new YoutubeFrameControls();

youtubeFrameControls.onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
        musicFinished.set(true);
        destroyPlayer();
    }
}

const images = [
    ["brasil", "pages/copa/img/brasil.png"],
    ["canada", "pages/copa/img/canada.png"],
    ["colombia", "pages/copa/img/colombia.png"],
    ["espanha", "pages/copa/img/espanha.png"],
    ["franca", "pages/copa/img/franca.png"],
    ["inglaterra", "pages/copa/img/inglaterra.png"],
    ["japao", "pages/copa/img/japao.png"],
    ["mexico", "pages/copa/img/mexico.png"],
    ["portugal", "pages/copa/img/portugal.png"],
    ["usa", "pages/copa/img/usa.png"],
    ["argentina", "pages/copa/img/argentina.png"],
    ["alemanha", "pages/copa/img/alemanha.png"],
    ["holanda", "pages/copa/img/holanda.png"]
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

    // Se for o btn do brasil -> exibe a escolha entre hino e musica
    if (index === 0) {
        const anthemSelector = document.createElement("img");
        anthemSelector.src = "pages/copa/img/hino_br.png";
        
        anthemSelector.addEventListener("click", async () => {
            const videoResponse = await fetch(`${API_URL}/copa/get-team-data-by-name?name=${images[index][0]}`);
            const videoData = await videoResponse.json();

            anthemSelector.remove();
            musicSelector.remove();

            await playVideo({sourceId: videoData[0][2], time: null, explicationId: videoData[0][3]});

            overlay.remove();
        });

        const musicSelector = document.createElement("img");
        musicSelector.src = "pages/copa/img/musicas_br.png";

        musicSelector.addEventListener("click", async () => {
            const videoResponse = await fetch(`${API_URL}/copa/brazilian-music`);
            const videoData = await videoResponse.json();

            anthemSelector.remove();
            musicSelector.remove();

            await playVideo({sourceId: videoData[0][2], time: null, explicationId: videoData[0][3]});

            overlay.remove();
        });

        overlay.append(anthemSelector, musicSelector);
        return;
    }
    
    const videoResponse = await fetch(`${API_URL}/copa/get-team-data-by-name?name=${images[index][0]}`);
    const videoData = await videoResponse.json()

    await playVideo({sourceId: videoData[0][2], time: 60, explicationId: videoData[0][3]});

    overlay.remove();
}

async function playVideo({sourceId, explicationId, time}) {
    playerDiv.classList.add('active');
    createPlayer(sourceId, time);
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