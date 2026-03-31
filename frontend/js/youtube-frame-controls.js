let youtubeFrameControls = null;
let currentTime = null;
let duration = null;

// método chamado quando a API do YouTube estiver pronta
function onYouTubeIframeAPIReady() {
    console.log('Api pronta');
    youtubeFrameControls = new YoutubeFrameControls();
}

// Classe para controlar o player do YouTube
class YoutubeFrameControls {

    // Variáveis para armazenar o ID do vídeo e a instância do player
    constructor() {
        this.videoId = null;
        this.player = null;
        console.log('YoutubeFrameControls initialized');
    }

    // Método para tocar a música, recebe o nome da música, obtém o ID do vídeo e carrega o player
    async playMusic(musicName) {

        // Obtem o Id da música chamando a api flask
        const musicId = await getVideoID(musicName);

        if (!musicId) {
            console.log(`Erro" ${musicId}`);
            return;
        }

        // Destroi o player se já houver e recria usando Name
        if (this.player) {
            this.destroyPlayer();
        }

        this.createPlayer(musicId);
    }

    // Toca a música diretamente com o Id
    async playMusicById(musicId) {
        // Destroi o player se já houver e recria usando Id
        if (this.player) {
            this.destroyPlayer();
        }

        this.createPlayer(musicId);
    }

    // Método para criar o player do YouTube, recebe o ID do vídeo e configura os parâmetros do player
    createPlayer(musicId) {
        this.player = new YT.Player('player', {
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

        // Duração total da musica
        duration = this.player.getDuration();
        console.log("Duração:", duration);

        // Atualiza o tempo em currentTime
        setInterval(() => {
            currentTime = this.player.getCurrentTime();
            console.log("Tempo atual:", currentTime);
        }, 1000);
    }

    // Método chamado quando o estado do player muda, verifica se o vídeo terminou e loga uma mensagem
    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            console.log("acabou");
            this.destroyPlayer();
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

// Adiciona um event listener ao botão de confirmação para tocar a música quando clicado
document.getElementById('confirm-music').addEventListener('click', () => {

    const musicName = document.getElementById('music-input').value;

    youtubeFrameControls.playMusic(musicName);

});