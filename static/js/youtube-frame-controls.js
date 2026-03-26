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

class YoutubeFrameControls {
    constructor() {
        this.videoId = null;
        this.player = '';
        console.log('YoutubeFrameControls initialized');
    }

    async playMusic(musicName) {

        const musicId = await getVideoID(musicName);

        if (!musicId) {
            console.log(`Erro" ${musicId}`);
            return
        }

        if (this.player) {
            this.loadVideoById(musicId);
        } else {
            this.createPlayer(musicId);
        }
    }

    onYouTubeIframeAPIReady() {
        console.log('Api pronta');
    }

    createPlayer(musicId) {
        this.player = new YT.Player('player', {
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
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange,
                onError: this.onPlayerError
            }
        });
    }

    onPlayerReady(event) {
        event.target.playVideo();
    }

    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            console.log("acabou");
        }
    }

    onPlayerError(event) {
        console.log("erro:", event.data);
    }

    removePlayer() {
        this.player.destroy();
    }

    loadVideoById(musicId) {
        this.player.loadVideoById(musicId)
    }

    stopVideo() {
        this.player.stopVideo();
    }

    playVideo() {
        this.player.playVideo();
    }
}

const youtubeFrameControls = new YoutubeFrameControls();