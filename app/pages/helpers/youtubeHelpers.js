
export function createPlayer({ playerId, sourceId, playerVars, events }) {
    return new YT.Player(playerId, {
        videoId: sourceId,
        playerVars: playerVars ? playerVars : {
            modestbranding: 1,  // menos logo do YouTube
            fs: 0,              // remove fullscreen button
            rel: 0,             // não mostra vídeos relacionados
            iv_load_policy: 3,  // remove anotações
            autoplay: 0,        // inicia automático
            controls: 0,        // esconde controles
            playsinline: 1,     // não força fullscreen no mobile
            disablekb: 1        // desativa teclado
        },
        events: events
    });
}

