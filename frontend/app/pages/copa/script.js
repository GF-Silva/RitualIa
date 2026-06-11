import { playerControls } from "../home/js/player.js";
import { YoutubeFrameControls } from "./youtube-frame-controls.js";

// ─── CountrySelector ───────────────────────────────────────────────────────────

class CountrySelector {
    #nomes = ["brasil", "canada", "colombia", "espanha", "franca", "inglaterra", "japao", "mexico", "portugal", "usa"];
    #locations = ["brasil.png", "canada.png", "colombia.png", "espanha.png", "franca.png", "inglaterra.png", "japao.png", "mexico.png", "portugal.png", "usa.png"];

    #cylinder;
    #slider;
    #playerText;
    #cards = [];
    #total;
    #angleStep;
    #radius;
    #current = 0;

    constructor() {
        this.#cylinder  = document.getElementById("cylinder");
        this.#slider    = document.getElementById("slider");
        this.#playerText = document.getElementById("playerText");

        this.#buildCards();

        this.#total     = this.#cards.length;
        this.#angleStep = 360 / this.#total;
        this.#radius    = Math.round(220 / (2 * Math.tan(Math.PI / this.#total)));

        this.#positionCards();
        this.#bindEvents();
        this.update(false);
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
            card.addEventListener("click", () => this.#onCardClick(card, index));
        });

        this.#slider.addEventListener("input", (e) => {
            this.#current = parseInt(e.target.value);
            this.update();
        });
    }

    #onCardClick(card, index) {
        if (index === this.#current) {
            const overlay = document.createElement('div');
            overlay.className = 'overlay';

            if (index == 0) {
                const img = document.createElement('img');
                img.src = card.getAttribute('data-image')
                
                overlay.append(img);
            }

            document.body.append(overlay);

        } else {
            let diff = index - this.#current;
            if (diff >  this.#total / 2) diff -= this.#total;
            if (diff < -this.#total / 2) diff += this.#total;
            this.#current = (this.#current + diff + this.#total) % this.#total;
            this.update();
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

    get currentCountry() {
        return this.#nomes[this.#current];
    }
}

class CountrySubmitter {
    #countryCylinder;

    constructor(countryCylinder) {
        this.#countryCylinder = countryCylinder;
    }

    async submit() {
        try {
            const country    = this.#countryCylinder.currentCountry;

            const params = new URLSearchParams({
                country:   country
            });

            const url = `${API_URL}/copa/get-songs-by-filter?${params}`;

            const response = await fetch(url);

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.detail);
            }

            const musicData = await response.json();

            musicData.forEach(([, musicName, musicArtist, musicId,, explicationSource]) => {
                playerControls.addMusic({
                    sourceId:          musicId,
                    author:            musicArtist,
                    name:              musicName,
                    genre:             genero,
                    emotion:           sentimento,
                    explicationSource
                });
            });

            openPage("player");
        } catch (e) {
            console.log(e.message);
        }
    }
}

// ─── Inicialização e exports ─────────────────────────────────────────────────

export const countrySelector  = new CountrySelector();
const countrySubmitter = new CountrySubmitter();

window.frameControls = new YoutubeFrameControls();