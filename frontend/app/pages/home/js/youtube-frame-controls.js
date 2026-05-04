let youtubeFrameControls = null;
let currentTime = null;
let duration = null;

const params = new URLSearchParams(window.location.search)
const musicId = params.get('music-id');
const musicAuthor = params.get('music-author');
const musicName = params.get('music-name');
const musicGenre = params.get('genre');
const musicEmotion = params.get('emotion');

// método chamado quando a API do YouTube estiver pronta
function onYouTubeIframeAPIReady() {
    console.log("Ready");
    youtubeFrameControls = new YoutubeFrameControls();
    youtubeFrameControls.playMusic(musicId, musicAuthor);
}

// Classe para controlar o player do YouTube
class YoutubeFrameControls {

    // Variáveis para armazenar o ID do vídeo e a instância do player
    constructor() {
        this.videoId = null;
        this.player = null;
        console.log('YoutubeFrameControls initialized');
    }

    // Toca a música diretamente com o Id
    async playMusic(musicId, musicAuthor) {
        // Destroi o player se já houver e recria usando Id
        if (this.player) {
            this.destroyPlayer();
        }

        this.createPlayer(musicId);
        document.getElementById("author").textContent = musicAuthor;
        document.getElementById("music").textContent = musicName;

        const playerParams = new URLSearchParams({
            "genre": musicGenre,
            "emotion": musicEmotion
        });

        const response = await fetch(`${API_URL}/on-song-play?${playerParams}`);
        
        if (!response.ok) {
            console.log('erro');
        }
    }

    // Método para criar o player do YouTube, recebe o ID do vídeo e configura os parâmetros do player
    createPlayer(musicId) {
        this.player = new YT.Player('ytplayer', {
            videoId: musicId,
            playerVars: {
                modestbranding: 1,  // menos logo do YouTube
                fs: 0,              // remove fullscreen button
                rel: 0,             // não mostra vídeos relacionados
                iv_load_policy: 3,  // remove anotações
                autoplay: 1,        // inicia automático
                controls: 0,        // esconde controles
                playsinline: 1,     // não força fullscreen no mobile
                disablekb: 1        // desativa teclado
            },
            events: {
                onReady: (event) => this.onPlayerReady(event),
                onStateChange: (event) => this.onPlayerStateChange(event),
                onError: (event) => this.onPlayerError(event)
            }
        });
    }

    // Método chamado quando o player estiver pronto, inicia a reprodução do vídeo
    onPlayerReady(event) {
        event.target.playVideo();

        // Atualiza o tempo em currentTime
        setInterval(() => {
            duration = this.player.getDuration();
            currentTime = this.player.getCurrentTime();

            if (duration) {
                document.getElementById("duration").innerText = format(duration);
                document.getElementById("current").innerText = format(currentTime);

                const percent = (currentTime / duration) * 100;

                document.getElementById("bar").style.width = percent + "%";
                document.getElementById("dot").style.left = percent + "%";
            }
        }, 1000);
    }

    // Método chamado quando o estado do player muda, verifica se o vídeo terminou e loga uma mensagem
    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            console.log("acabou");
            this.destroyPlayer();
            window.location.href = "/";
        }
    }

    // Método chamado quando ocorre um erro no player, loga o código do erro
    onPlayerError(event) {
        console.log("erro:", event.data);
    }

    // Método para remover o player do YouTube, destrói a instância do player
    destroyPlayer() {
        this.player.destroy();
        this.player = null;
        this.currentTime = null;
    }

    // Método para carregar um novo vídeo no player, recebe o ID do vídeo e carrega-o no player
    loadVideoById(musicId) {
        this.player.loadVideoById(musicId);
    }

    // Método para parar o vídeo, chama a função stopVideo do player
    stopVideo() {
        this.player.stopVideo();
    }

    // Método para pausar o vídeo, chama a função pauseVideo do player
    pauseVideo() {
        this.player.pauseVideo();
    }

    // Método para tocar o vídeo, chama a função playVideo do player
    playVideo() {
        this.player.playVideo();
    }
}