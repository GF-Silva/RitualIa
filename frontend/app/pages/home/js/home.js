import { playerControls } from "./player.js";
import { CoverFlow } from "/pages/components/cover-flow.js";

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

class HomeControls {
    #genreCylinder;
    #emotionDrum;

    constructor (genreCylinder, emotionDrum, errorDisplay) {
        this.#genreCylinder = genreCylinder;
        this.#emotionDrum   = emotionDrum;
    }

    async submitMusic() {
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

            musicData.forEach(([, musicName, musicArtist, musicId, explicationSource,]) => {
                playerControls.addMusic({
                    sourceId:          musicId,
                    author:            musicArtist,
                    name:              musicName,
                    genre:             genero,
                    emotion:           sentimento,
                    explicationSource: explicationSource
                });
            });

            openPage("player");
        } catch (e) {
            this.#showError(e.message);
        }
    }

    #showError(message) {
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


// ─── Inicialização e exports ─────────────────────────────────────────────────

function onCardClick(card, index) {
    const painel = document.getElementById("painel");
    const painelImg = document.getElementById("painelImg");

    painelImg.src = card.dataset.image ?? "";
    painel.classList.add("active");
}

const genreCylinder  = new CoverFlow([
    ["MPB", "MPB.png"],
    ["Sertanejo", "Sertanejo.png"],
    ["Rock", "Rock.png"]
], onCardClick);

const emotionDrum    = new EmotionDrum();

const homeControls   = new HomeControls(genreCylinder, emotionDrum);

window.voltar          = ()      => genreCylinder.closePanel();
window.mudarSentimento = (dir)   => emotionDrum.mudarSentimento(dir);
window.submitData      = ()      => homeControls.submitMusic();