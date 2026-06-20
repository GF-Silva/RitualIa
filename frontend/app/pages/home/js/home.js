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

const painel = document.getElementById("painel");
const painelImg = document.getElementById("painelImg");

function onCardClick(card, index) {
    painelImg.src = card.dataset.image ?? "";
    painel.classList.add("active");
}

const emotionDrum   = new EmotionDrum();
const genreCylinder = new CoverFlow([
    ["MPB", "pages/home/img/MPB.png"],
    ["Sertanejo", "pages/home/img/Sertanejo.png"],
    ["Rock", "pages/home/img/Rock.png"]
], onCardClick);

window.submitData = async () => {
    try {
        const genero    = genreCylinder.currentGenre;
        const sentimento = emotionDrum.currentEmotion;

        const params = new URLSearchParams({
            genre:   genero,
            emotion: sentimento,
            limit:   1
        });

        const response = await fetch(`${API_URL}/get-songs-by-filter?${params}`);

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
        showError(e.message);
    }
}

function showError(message) {
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

// ─── Inicialização e exports ─────────────────────────────────────────────────

window.closePanel = () => {
    painel.classList.remove('active');
};

window.mudarSentimento = (dir)   => emotionDrum.mudarSentimento(dir);