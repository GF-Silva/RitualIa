
// Controla a navegação de musicas
class NavigationControls {

    // Adiciona as musicas no inicio
    constructor () {
        this.add_musics();
    }

    // Adiciona o botão das musicas no catálogo
    async add_musics() {

        // Obtém as músicas disponiveis
        const response = await fetch(`${API_URL}/get-music-data`);
        const musicData = await response.json();

        // Coleta o espaço da lista
        const catalogList = document.getElementById("catalog");

        // Declara a música
        let music = null;
        for (music in musicData) {

            // Variaveis
            const musicName = musicData[music][1];
            const musicId = musicData[music][3];

            // Item de lista da música
            const li = document.createElement("li");
            li.className = "catalog__list";
            catalogList.appendChild(li);

            // Botão do item de lista para processar click
            const button = document.createElement("button");
            button.textContent = musicName;
            button.className = "catalog__list__button";
            li.appendChild(button);
            
            // Processamento do click de cada botão
            button.addEventListener('click', function() {

                // Toca a música usando o Id coletado
                youtubeFrameControls.playMusicById(musicId);
            });
        }
    }
}

// Variavel global de controle de navegação
const navigationControls = new NavigationControls();