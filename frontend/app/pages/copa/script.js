import { playerControls } from "./player.js";

// ─── GenreCylinder ───────────────────────────────────────────────────────────

class GenreCylinder {
    #nomes = ["MPB", "Sertanejo", "Rock"];
    #locations = ["MPB.png", "Sertanejo.png", "Rock.png"];

    #cylinder;
    #slider;
    #playerText;
    #painel;
    #painelImg;
    #cards = [];
    #total;
    #angleStep;
    #radius;
    #current = 0;

    constructor() {
        this.#cylinder  = document.getElementById("cylinder");
        this.#slider    = document.getElementById("slider");
        this.#playerText = document.getElementById("playerText");
        this.#painel    = document.getElementById("painel");
        this.#painelImg = document.getElementById("painelImg");

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
            const imagePath = `pages/home/img/${file}`;
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
            this.#painelImg.src = card.dataset.image ?? "";
            this.#painel.classList.add("active");
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

    closePanel() {
        this.#painel.classList.remove("active");
    }

    get currentGenre() {
        return this.#nomes[this.#current];
    }
}

// ─── EmotionDrum ─────────────────────────────────────────────────────────────

class EmotionDrum {
    #sentimentos = ["Esperança", "Reflexão", "Saudade"];
    static #ITEM_H = 46;

    #drumCylinder;
    #drumItems = [];
    #total;
    #angleStep;
    #radius;
    #indice = 0;

    constructor() {
        this.#drumCylinder = document.getElementById("drumCylinder");
        this.#total        = this.#sentimentos.length;
        this.#angleStep    = 360 / this.#total;
        this.#radius       = Math.round(
            EmotionDrum.#ITEM_H / (2 * Math.tan(Math.PI / this.#total))
        );

        this.#buildItems();
        this.update(false);
    }

    #buildItems() {
        this.#sentimentos.forEach((nome, i) => {
            const div = document.createElement("div");
            div.className  = "drum-item";
            div.innerText  = nome;
            div.style.transform =
                `rotateX(${-this.#angleStep * i}deg) translateZ(${this.#radius}px)`;
            this.#drumCylinder.appendChild(div);
            this.#drumItems.push(div);
        });
    }

    update(animate = true) {
        this.#drumCylinder.style.transition = animate
            ? "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none";

        this.#drumCylinder.style.transform =
            `rotateX(${this.#angleStep * this.#indice}deg)`;
        this.#drumCylinder.dataset.indice = this.#indice;

        this.#drumItems.forEach((item, i) =>
            item.classList.toggle("is-front", i === this.#indice)
        );

        if (!animate) {
            requestAnimationFrame(() => {
                this.#drumCylinder.style.transition =
                    "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
            });
        }
    }

    mudarSentimento(dir) {
        this.#indice = (this.#indice - dir + this.#total) % this.#total;
        this.update();
    }

    get currentEmotion() {
        return this.#sentimentos[this.#indice];
    }
}

// ─── ErrorDisplay ────────────────────────────────────────────────────────────

class ErrorDisplay {
    show(message) {
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const box = document.createElement("div");
        box.className = "error-display";

        const title = document.createElement("h1");
        title.textContent  = "Erro inesperado";
        title.style.cssText = "text-align:center;margin:0 0 12px 0";

        const msg = document.createElement("p");
        msg.textContent = message;

        const exitBtn = document.createElement("button");
        exitBtn.className = "btn-fechar";
        exitBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 6 6 18"></polyline>
                <polyline points="6 6 18 18"></polyline>
            </svg>`;

        exitBtn.addEventListener("click", () => {
            overlay.remove();
            box.remove();
        });

        box.append(exitBtn, title, msg);
        document.body.append(overlay, box);
    }
}

// ─── MusicSubmitter ──────────────────────────────────────────────────────────

class MusicSubmitter {
    #genreCylinder;
    #emotionDrum;
    #errorDisplay;

    constructor(genreCylinder, emotionDrum, errorDisplay) {
        this.#genreCylinder = genreCylinder;
        this.#emotionDrum   = emotionDrum;
        this.#errorDisplay  = errorDisplay;
    }

    async submit() {
        try {
            const genero    = this.#genreCylinder.currentGenre;
            const sentimento = this.#emotionDrum.currentEmotion;
            const debug     = false;

            const params = new URLSearchParams({
                genre:   genero,
                emotion: sentimento,
                limit:   1
            });

            const url = debug
                ? `${API_URL}/get-songs-by-filter?limit=5`
                : `${API_URL}/get-songs-by-filter?${params}`;

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
            this.#errorDisplay.show(e.message);
        }
    }
}

// ─── Inicialização e exports ─────────────────────────────────────────────────

const genreCylinder  = new GenreCylinder();
const emotionDrum    = new EmotionDrum();
const errorDisplay   = new ErrorDisplay();
const musicSubmitter = new MusicSubmitter(genreCylinder, emotionDrum, errorDisplay);

export const voltar          = ()      => genreCylinder.closePanel();
export const mudarSentimento = (dir)   => emotionDrum.mudarSentimento(dir);
export const submitData      = ()      => musicSubmitter.submit();