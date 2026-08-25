import { YoutubeFrameControls } from "/app/pages/components/youtube-frame-controls.js";

/* YOUTUBE */
let youtubePlayer;

class PlayerControls extends YoutubeFrameControls {
  #queueList;
  #authorLabel;
  #nameLabel;

  #musics = [];
  #isPlaying = false;

  constructor() {
    super();
    this.#queueList = document.getElementById("queue-list"); // TODO: Colocar isso no constructor
    this.#authorLabel = document.getElementById("author"); // TODO: Mesmo
    this.#nameLabel = document.getElementById("music"); // TODO: Mesmo
    console.log('PlayerControls initialized');
  }

  get musics() {
    return this.#musics;
  }
  
  addMusic(params) {
    this.#musics.push(params);

    const queueItem = document.createElement("div");
    queueItem.className = "queue-item";

    const itemName = document.createElement("span");
    itemName.className = "left";
    itemName.textContent = params["name"];

    const itemGenre = document.createElement("span");
    itemGenre.className = "right";
    itemGenre.textContent = params["genre"];
    
    queueItem.append(itemName, itemGenre);
    this.#queueList.append(queueItem);

    if (!this.#isPlaying) {
      this.playMusic();
    }
  }

  #showMusicInfos(name, author) {
    this.#authorLabel.textContent = author;
    this.#nameLabel.textContent = name;
  }

  async #startExplication(src) {
    return new Promise((resolve) => {
      const audio = new Audio(src)
      audio.addEventListener("ended", resolve)
      audio.play()
    });
  }

  async playMusic() {
    // TODO: Ele tem q tratar se tudo deu certo, se n ele pula pro proximo e manda o popup

    console.log("Play");
    if (!this.#isPlaying) this.#isPlaying = true;
    
    // Trata se tem algum video na queue, se n marca q n ta reproduzindo mais
    if (this.#musics.length <= 0) {
      this.#isPlaying = false
      return;
    }

    // Remove da queue original
    const music = this.#musics.shift();
    this.#queueList.removeChild(this.#queueList.children[0]);
    console.log("Video played: ", music);

    // Prepara o video
    this.player.cueVideoById(music["sourceId"]);

    // Exibe as infos
    this.#showMusicInfos(music["name"], music["author"]);
    
    // Comeca a explicacao
    await this.#startExplication(`/storage/${music['explicationSource']}`);

    // Comeca o video
    this.player.playVideo();
  }

  async onPlayerStateChange(event) {
    console.log("E:", event);
    if (event.data === YT.PlayerState.ENDED) {
      await this.playMusic();
    }
  }
}

export const playerControls = new PlayerControls();

playerControls.createPlayer("");

window.plr = playerControls;

window.togglePanel = () => {
  document.getElementById("panel").classList.toggle("open");
  document.getElementById("playerBox").classList.toggle("shift");
};

window.toggleQueue = () => {
  document.getElementById("queue").classList.toggle("open");
};