const nomes = [
"Baião","Folk Rock","Hip-Hop","MPB","Música de Protesto",
"R&B","Rap","Rock Nacional","Samba","Sertanejo Raiz",
"Soul","Tropicalismo"
];

const locations = [
    "baiao.png",
    "Folk Rock.png",
    "Hip-Hop.png",
    "MPB.png",
    "Música de Protesto.png",
    "R&B.png",
    "Rap.png",
    "Rock Nacional.png",
    "Samba.png",
    "Sertanejo.png",
    "Soul.png",
    "Tropicalismo.png"
];

const cylinder = document.getElementById("cylinder");

function addGenres() {

    locations.forEach((genres) => {
        const div = document.createElement("div");
        div.className = "card";
        const imagePath = `pages/home/img/${genres}`;
        div.dataset.image = imagePath;
        div.style.backgroundImage = `url("${encodeURI(imagePath)}")`;

        cylinder.appendChild(div);
    });
}

addGenres();

const cards = document.querySelectorAll(".card");
 
const slider = document.getElementById("slider");
const playerText = document.getElementById("playerText");
const painel = document.getElementById("painel");
const painelImg = document.getElementById("painelImg");
const logo = document.getElementById("logo");
 
const total = cards.length;
const angleStep = 360 / total;
/* raio do cilindro: quanto maior, mais espaçado */
const radius = Math.round(220 / (2 * Math.tan(Math.PI / total)));

/* posiciona cada card no cilindro */
cards.forEach((card, i) => {
    const angle = angleStep * i;
    card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});
 
let current = 0;
let rotation = 0;
 
function update(animate = true) {
    if (!animate) cylinder.style.transition = 'none';
    else cylinder.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)';
 
    rotation = -angleStep * current;
    cylinder.style.transform = `rotateY(${rotation}deg)`;
 
    cards.forEach((card, i) => {
        card.classList.toggle('is-front', i === current);
    });
 
    slider.value = current;
    playerText.innerText = nomes[current];
 
    if (!animate) requestAnimationFrame(() => {
        cylinder.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
}

function move(dir) {
    current = (current + dir + total) % total;
    update();
}
 
/* clique em qualquer card gira até ele */
cards.forEach((card, index) => {
    card.onclick = () => {
        if (index === current) {
            /* se já é o frente, abre o painel */
            painelImg.src = card.dataset.image || "";
            painel.classList.add("active");
            logo.style.display = "none";
        } else {
            /* gira até o card clicado pelo caminho mais curto */
            let diff = index - current;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            current = (current + diff + total) % total;
            update();
        }
    };
});
 
function voltar() {
    painel.classList.remove("active");
    logo.style.display = "block";
}
 
slider.addEventListener("input", e => {
    current = parseInt(e.target.value);
    update();
});
 
/* ===== TAMBOR DE EMOÇÕES ===== */
const drumCylinder = document.getElementById("drumCylinder");
 
const sentimentos = [
    "Angústia","Empoderamento","Esperança","Indignação","Ironia",
    "Melancolia","Nostalgia","Paz","Pertencimento","Reflexão",
    "Resistência","Revolta","Saudade","Tristeza","Urgência"
];
 
const ITEM_H = 46;
const totalSent = sentimentos.length;
const sentAngleStep = 360 / totalSent;
const sentRadius = Math.round(ITEM_H / (2 * Math.tan(Math.PI / totalSent)));
 
/* monta os itens do cilindro */
sentimentos.forEach((nome, i) => {
    const div = document.createElement("div");
    div.className = "drum-item";
    div.innerText = nome;
    const angle = sentAngleStep * i;
    div.style.transform = `rotateX(${-angle}deg) translateZ(${sentRadius}px)`;
    drumCylinder.appendChild(div);
});
 
const drumItems = drumCylinder.querySelectorAll(".drum-item");
let indice = 3;
let sentRotation = 0;
 
function updateDrum(animate = true) {
    if (!animate) drumCylinder.style.transition = 'none';
    else drumCylinder.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
 
    sentRotation = sentAngleStep * indice;
    drumCylinder.style.transform = `rotateX(${sentRotation}deg)`;
    drumCylinder.dataset.indice = indice;

    drumItems.forEach((item, i) => {
        item.classList.toggle('is-front', i === indice);
    });
 
    if (!animate) requestAnimationFrame(() => {
        drumCylinder.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
}
 
function mudarSentimento(dir) {
    indice = (indice - dir + totalSent) % totalSent;
    updateDrum();
}
 
updateDrum(false);
update(false);

let error = null;

function showError(error) {
    if (error == true) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    const errorDisplay = document.createElement("div");
    errorDisplay.className = "error-display";

    const title = document.createElement("h1");
    title.textContent = "Erro inesperado";
    title.style.textAlign = "center";
    title.style.margin = "0 0 12px 0";

    const message = document.createElement("p");
    message.textContent = error;

    const exitBtn = document.createElement("btn");
    exitBtn.className = "btn-fechar";
    exitBtn.innerHTML = `
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
    >
        <polyline points="18 6 6 18" />
        <polyline points="6 6 18 18" />
    </svg>
    `;
    exitBtn.addEventListener("click", function() {
        overlay.remove();
        errorDisplay.remove();
        error = null;
    });

    error = true

    errorDisplay.appendChild(exitBtn);
    errorDisplay.appendChild(title);
    errorDisplay.appendChild(message);
    document.body.appendChild(errorDisplay);
}

async function submitData() {
    try {
        const genero = nomes[current];
        const sentimento = sentimentos[indice];

        console.log({
            genero,
            sentimento
        });

        const params = new URLSearchParams({
            genre: genero,
            emotion: sentimento
        });
        response = await fetch(`${API_URL}/get-songs-by-filter-name?${params}`);

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro.detail);
        }

        musicData = await response.json();
        musicArtist = await musicData[0][2];
        musicId = musicData[0][3];
        window.location.href = `/player?music-id=${musicId}&&music-author=${musicArtist}`;
    } catch (e) {
        console.log(e.message);
        showError(e);
    }
}  
