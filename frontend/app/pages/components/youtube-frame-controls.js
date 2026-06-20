// método chamado quando a API do YouTube estiver pronta
function onYouTubeIframeAPIReady() {
    console.log("Ready");
}

// Classe para controlar o player do YouTube
export class YoutubeFrameControls {
    // Variáveis para armazenar o ID do vídeo e a instância do player
    constructor() {
        this.player = null;
        this.currentTime = null;
        this.duration = null;
        this.intervalId = null;
        console.log('YoutubeFrameControls initialized');
    }

    // Método para criar o player do YouTube, recebe o ID do vídeo e configura os parâmetros do player
    createPlayer(videoId, stopTime) {
        if (this.player) {
            this.destroyPlayer();
            console.log('Player destroyed');
        }

        this.player = new YT.Player('ytplayer', {
            videoId: videoId,
            playerVars: {
                modestbranding: 1,  // menos logo do YouTube
                fs: 0,              // remove fullscreen button
                rel: 0,             // não mostra vídeos relacionados
                iv_load_policy: 3,  // remove anotações
                autoplay: 0,        // inicia automático
                controls: 0,        // esconde controles
                playsinline: 1,     // não força fullscreen no mobile
                disablekb: 1        // desativa teclado
            },
            events: {
                onReady: (event) => this.onPlayerReady(event, stopTime),
                onStateChange: (event) => this.onPlayerStateChange(event),
                onError: (event) => this.onPlayerError(event)
            }
        });
    }

    // Método chamado quando o player estiver pronto, inicia a reprodução do vídeo
    onPlayerReady(event, stopTime) {
        const duration = this.player.getDuration();

        // Atualiza o tempo em currentTime
        this.intervalId = setInterval(() => {
            const currentTime = this.player.getCurrentTime();

            if (currentTime >= stopTime && stopTime) {
                this.player.seekTo(duration, true);
                clearInterval(this.intervalId);
            }

            if (duration) {
                document.getElementById("duration").innerText = this.format(duration);
                document.getElementById("current").innerText = this.format(currentTime);

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
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    format(t) {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return m + ":" + (s < 10 ? "0" : "") + s;
    }
}