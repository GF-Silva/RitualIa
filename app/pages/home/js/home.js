import { playerControls } from "./player.js";
import { CoverFlow } from "/app/pages/components/cover-flow.js";

// ─── EmotionDrum ─────────────────────────────────────────────────────────────

class EmotionDrum {
  #sentimentos = [
    "Esperança",
    "Reflexão",
    "Saudade",
    "Liberdade",
    "Otimismo",
    "Melancolia",
    "Unidade",
    "Introspecção",
    "Empoderamento",
    "Paz",
    "Rebeldia",
    "Indignação",
    "Euforia",
    "Acolhimento",
    "Empolgação",
    "Tensão",
    "Revolta",
    "Raiva",
    "Ironia",
    "Devoção",
    "Alegria",
    "Nostalgia",
    "Animação",
    "Inquietude",
    "Empatia",
    "Serenidade",
    "Romantismo",
    "Compaixão",
    "Paixão",
    "Triunfo",
    "Tristeza",
    "Sensualidade",
    "Elegância",
    "Leveza",
    "Júbilo",
    "Gratidão",
    "Êxtase",
    "Orgulho",
    "Drama",
    "Frustração",
  ];
  static #ITEM_H = 46;

  #drumCylinder;
  #drumItems = [];
  #total;
  #angleStep;
  #radius;
  #indice = 0;

  constructor() {
    this.#drumCylinder = document.getElementById("drumCylinder");
    this.#total = this.#sentimentos.length;
    this.#angleStep = 360 / this.#total;
    this.#radius = Math.round(
      EmotionDrum.#ITEM_H / (2 * Math.tan(Math.PI / this.#total)),
    );

    this.#buildItems();
    this.update(false);
  }

  #buildItems() {
    this.#sentimentos.forEach((nome, i) => {
      const div = document.createElement("div");
      div.className = "drum-item";
      div.innerText = nome;
      div.style.transform = `rotateX(${-this.#angleStep * i}deg) translateZ(${this.#radius}px)`;
      this.#drumCylinder.appendChild(div);
      this.#drumItems.push(div);
    });
  }

  update(animate = true) {
    this.#drumCylinder.style.transition = animate
      ? "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)"
      : "none";

    this.#drumCylinder.style.transform = `rotateX(${this.#angleStep * this.#indice}deg)`;
    this.#drumCylinder.dataset.indice = this.#indice;

    this.#drumItems.forEach((item, i) =>
      item.classList.toggle("is-front", i === this.#indice),
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
  painelImg.src = card.src ?? "";
  painel.classList.add("active");
}

const emotionDrum = new EmotionDrum();
const genreCylinder = new CoverFlow(
  [
    ["MPB", "/app/pages/home/img/mpb.png"],
    ["Sertanejo", "/app/pages/home/img/sertanejo.png"],
    ["Rock", "/app/pages/home/img/rock.png"],
    ["Tropicalismo", "/app/pages/home/img/tropicalismo.png"],
    ["Folk", "/app/pages/home/img/folk.png"],
    ["Folk Rock", "/app/pages/home/img/folk_rock.png"],
    ["Jazz", "/app/pages/home/img/jazz.png"],
    ["Pop Rock", "/app/pages/home/img/pop_rock.png"],
    ["Rock Nacional", "/app/pages/home/img/rock_nacional.png"],
    ["Rock Progressivo", "/app/pages/home/img/rock_progressivo.png"],
    ["Grunge", "/app/pages/home/img/grunge.png"],
    ["Samba", "/app/pages/home/img/samba.png"],
    ["Morna", "/app/pages/home/img/morna.png"],
    ["Afropop", "/app/pages/home/img/afropop.png"],
    ["Son Cubano", "/app/pages/home/img/son_cubano.png"],
    ["World Music", "/app/pages/home/img/world_music.png"],
    ["Axé", "/app/pages/home/img/axe.png"],
    ["Funk Pop", "/app/pages/home/img/funk_pop.png"],
    ["Pop", "/app/pages/home/img/pop.png"],
    ["Música Clássica", "/app/pages/home/img/musica_classica.png"],
    ["Choro", "/app/pages/home/img/choro.png"],
    ["Bossa Nova", "/app/pages/home/img/bossa_nova.png"],
  ],
  onCardClick,
);

function isMusicRepeating(music) {
  if (playerControls.musicQueue.some((queueMusic) => queueMusic.id === music['id'])) {
    return true;
  }

  return false;
}

async function getNextMusic(genre) {
  // Se n passou genero, busca qualquer uma
  if (!genre) {
    const response = await fetch(`api/songs`);

    if (!response.ok) {
      throw new Error("Erro no servidor, tente mais tarde");
    }

    return response;
  }

  // Busca apenas o genero como fallback
  const response = await fetch(`api/songs?genre=${genre}`);

  if (!response.ok) {
    // se nao encontrar nada, pega uma musica aleatoria
    getNextMusic();
  }

  return response
}

async function getMusics(genre, emotion, limit = 1) {
  const params = new URLSearchParams({
    genre: genre,
    emotion: emotion,
    limit: limit,
  });

  const response = await fetch(`api/songs?${params}`);

  if (!response.ok) {
    return await getNextMusic(genre);
  }

  return response;
}

async function addMusics(genre, emotion, musics) {
  musics.forEach(async (music) => {
    if (isMusicRepeating(music)) {
      return;
    }

    playerControls.addMusic({
      id: music['id'],
      sourceId: music['source_id'],
      author: music['artist'],
      name: music['title'],
      genre: genre,
      emotion: emotion,
      explicationSource: music['explication_source'],
    });
  });
}

window.submitData = async () => {
  try {
    const genre = genreCylinder.currentGenre;
    const emotion = emotionDrum.currentEmotion;

    const response = await getMusics(genre, emotion);
    const musics = await response.json();

    addMusics(genre, emotion, musics);

    painel.classList.remove("active");
    openPage("player");
  } catch (e) {
    showError(e.message);
  }
};

function showError(message) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const box = document.createElement("div");
  box.className = "error-display";

  const title = document.createElement("h1");
  title.textContent = "Erro inesperado";
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
  painel.classList.remove("active");
};

window.mudarSentimento = (dir) => emotionDrum.mudarSentimento(dir);
