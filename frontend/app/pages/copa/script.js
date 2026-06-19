import { YoutubeFrameControls } from "/pages/components/youtube-frame-controls.js";
import { AsyncEvent } from "/pages/helpers/async-event.js";

// ─── CountrySelector ───────────────────────────────────────────────────────────
class CountrySelector extends YoutubeFrameControls {
    #nomes = ["brasil", "canada", "colombia", "espanha", "franca", "inglaterra", "japao", "mexico", "portugal", "usa", "argentina", "alemanha", "holanda"];
    #locations = ["brasil.png", "canada.png", "colombia.png", "espanha.png", "franca.png", "inglaterra.png", "japao.png", "mexico.png", "portugal.png", "usa.png", "argentina.png", "alemanha.png", "holanda.png"];

    #cylinder;
    #slider;
    #playerText;
    #cards = [];
    #total;
    #angleStep;
    #radius;
    #current = 0;
    #playerDiv;
    #musicFinished;

    constructor() {
        super();
        this.#cylinder  = document.getElementById("cylinder");
        this.#slider    = document.getElementById("slider");
        this.#playerText = document.getElementById("playerText");
        this.#playerDiv = document.getElementById('player');

        this.#buildCards();

        this.#total     = this.#cards.length;
        this.#angleStep = 360 / this.#total;
        this.#radius    = Math.round(220 / (2 * Math.tan(Math.PI / this.#total)));

        this.#positionCards();
        this.#bindEvents();
        this.update(false);

        this.#musicFinished = new AsyncEvent();
    }

    #buildCards() {
        this.#locations.forEach((file) => {
            const div = document.createElement("div");
            div.className = "card";
            const imagePath = `pages/copa/img/${file}`;
            div.dataset.image = imagePath;
            div.style.backgroundImage = `url("${encodeURI(imagePath)}")`;
            this.#cylinder.appendChild(div);
            this.#cards.push(div);
        });
    }

    #positionCards() {
        this.#cards.forEach((card, i) => {
            const angle = this.#angleStep * i;
            card.style.transform = `rotateY(${angle}deg) translateZ(${this.#radius}px)`;
        });
    }

    #bindEvents() {
        this.#cards.forEach((card, index) => {
            card.addEventListener("click", (e) => this.#onCardClick(card, index));
        });

        this.#slider.addEventListener("input", (e) => {
            this.#current = parseInt(e.target.value);
            this.update();
        });
    }

    async #onCardClick(card, index) {
        if (index != this.#current) {
            let diff = index - this.#current;
            if (diff >  this.#total / 2) diff -= this.#total;
            if (diff < -this.#total / 2) diff += this.#total;
            this.#current = (this.#current + diff + this.#total) % this.#total;
            this.update();
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.append(overlay);

        // Se for o btn do brasil -> exibe a escolha entre hino e musica
        if (index === 0) {
            const anthemSelector = document.createElement("img");
            anthemSelector.src = "pages/copa/img/hino_br.png";
            
            anthemSelector.addEventListener("click", async () => {
                const videoResponse = await fetch(`${API_URL}/copa/get-team-data-by-name?name=${this.#nomes[index]}`);
                const videoData = await videoResponse.json();

                anthemSelector.remove();
                musicSelector.remove();
    
                await this.#playVideo({sourceId: videoData[0][2], time: null, explicationId: videoData[0][3]});

                overlay.remove();
            });

            const musicSelector = document.createElement("img");
            musicSelector.src = "pages/copa/img/musicas_br.png";

            musicSelector.addEventListener("click", async () => {
                const videoResponse = await fetch(`${API_URL}/copa/brazilian-music`);
                const videoData = await videoResponse.json();

                anthemSelector.remove();
                musicSelector.remove();

                await this.#playVideo({sourceId: videoData[0][2], time: null, explicationId: videoData[0][3]});

                overlay.remove();
            });

            overlay.append(anthemSelector, musicSelector);
            return;
        }
        
        const videoResponse = await fetch(`${API_URL}/copa/get-team-data-by-name?name=${this.#nomes[index]}`);
        const videoData = await videoResponse.json()

        await this.#playVideo({sourceId: videoData[0][2], time: 60, explicationId: videoData[0][3]});

        overlay.remove();
    }

    async #playVideo({sourceId, explicationId, time}) {
        this.#playerDiv.classList.add('active');
        this.createPlayer(sourceId, time);
        await this.#startExplication(`${CLOUDINARY_URL}/video/upload/${explicationId}`);
        this.player.playVideo();
        await this.#musicFinished.when(true);
        this.#playerDiv.classList.remove('active');
        this.#musicFinished.set(false);
    }

    #startExplication(src) {
        return new Promise((resolve) => {
            const audio = new Audio(src)
            audio.addEventListener("ended", resolve)
            audio.play()
        });
    }

    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            this.#musicFinished.set(true);
            this.destroyPlayer();
        }
    }

    update(animate = true) {
        this.#cylinder.style.transition = animate
            ? "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none";

        this.#cylinder.style.transform = `rotateY(${-this.#angleStep * this.#current}deg)`;

        this.#cards.forEach((card, i) =>
            card.classList.toggle("is-front", i === this.#current)
        );

        this.#slider.value       = this.#current;
        this.#playerText.innerText = this.#nomes[this.#current];

        if (!animate) {
            requestAnimationFrame(() => {
                this.#cylinder.style.transition =
                    "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)";
            });
        }
    }

    move(dir) {
        this.#current = (this.#current + dir + this.#total) % this.#total;
        this.update();
    }

    closePanel(overlay) {
        overlay.remove();
    }

}

// ─── Inicialização e exports ─────────────────────────────────────────────────

export const countrySelector  = new CountrySelector();