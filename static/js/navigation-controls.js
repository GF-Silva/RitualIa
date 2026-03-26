class NavigationControls {
    constructor () {
        this.add_musics();
    }

    async add_musics() {

        const response = await fetch('/get-music-data');

        const musicData = await response.json();

        const catalogList = document.getElementById("catalog");

        let music = null;

        for (music in musicData) {

            // Variaveis
            const musicName = musicData[music][1];
            const musicId = musicData[music][3];

            // Item de lista
            const li = document.createElement("li");
            li.className = "catalog__list";
            catalogList.appendChild(li);

            // Botão da musica
            const button = document.createElement("button");
            button.textContent = musicName;
            button.className = "catalog__list__button";
            li.appendChild(button);
            
            // Processamento do click
            button.addEventListener('click', function() {
                console.log("click")
                youtubeFrameControls.playMusicById(musicId);
            });
        }
    }
}

const navigationControls = new NavigationControls();