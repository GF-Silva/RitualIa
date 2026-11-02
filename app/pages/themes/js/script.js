import { playerControls } from "./player.js";
import { CoverFlow } from "/app/pages/components/cover-flow.js";

async function onCardClick(card) {
  try {
    // Desativa o elemento que chamou temporariamente
    card.disabled = true;
    const themes = themesCylinder.currentCard;

    const response = await getMusic(themes["id"]);
    const music = await response.json();

    addMusic(music[0]);
    openPage("player");

  } catch (e) {
    showError(e.message);

  } finally {
    setTimeout(() => card.disabled = false, 1000);
  }
}

const themes = await fetch('/api/songs/themes');
const jss = await themes.json();
const themesCylinder = new CoverFlow(jss, onCardClick);

function isMusicRepeating(music) {
  if (playerControls.musics.some((queueMusic) => queueMusic.id === music['id'])) {
    return true;
  }

  return false;
}

// Alteracao temporaria, dps corrijir para function
async function getMusic(theme) {
  const response = await fetch(`/api/songs/themes/${theme}`);

  if (!response.ok) {
    // Se falhou usando somente o themes como param, busca sem param (pega qualquer um)
    return await getMusic();
  }

  return response;
}

async function addMusic(music) {
  if (isMusicRepeating(music)) {
    console.warn("Erro ao adicionar a musica, a musica ja esta na queue");
    return;
  }

  playerControls.addMusic(music);
}

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