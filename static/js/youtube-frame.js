async function getVideoID(musicName) {
    if (musicName == null) {
        return 'Get Video id: Empty music name'
    }

    const params = new URLSearchParams({
        music_name: musicName
    });

    const response = await fetch('/get-music-id?' + params.toString());

    const data = await response.json();

    if (response.ok) {
        const musicId = data['music_id'];
        return musicId;

    } else {
        console.log(data['error']);
        return data['error']
    }
}

async function playMusic(musicName) {

    const musicId = await getVideoID(musicName);

    if (!musicId) {
        console.log(`Erro" ${musicId}`);
        return
    }

    if (player) {
        loadVideoById(music_id);
    } else {
        createPlayer(musicId);
    }
}

var player;
function onYouTubeIframeAPIReady() {
    console.log('Api pronta');
}

function createPlayer(musicId) {
    player = new YT.Player('player', {
        videoId: musicId,
        playerVars: {
            modestbranding: 1, // menos logo do YouTube
            fs: 0,             // remove fullscreen button
            rel: 0,            // não mostra vídeos relacionados
            iv_load_policy: 3,  // remove anotações
            autoplay: 1,     // inicia automático
            controls: 0,     // esconde controles
            playsinline: 1, // não força fullscreen no mobile
            disablekb: 1    // desativa teclado
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    console.log("acabou");
  }
}

function onPlayerError(event) {
  console.log("erro:", event.data);
}

function removePlayer() {
    player.destroy();
}

function loadVideoById(musicId) {
    player.loadVideoById(musicId)
}

function stopVideo() {
    player.stopVideo();
}

function playVideo() {
    player.playVideo();
}