import { YoutubeFrameControls } from "/app/pages/components/youtube-frame-controls.js";
import { AsyncEvent } from "/app/pages/helpers/async-event.js";
import { createToast, toastIcons } from "/app/pages/components/toast/script.js";

class PlayerControls extends YoutubeFrameControls {
  #queueList;
  #nameLabel;
  #authorLabel;
  #durationLabel;
  #currentTimeLabel;
  #currentTimeInterval;
  #musicDescriptionLabel;

  #musics = [];
  #isPlaying = false;
  #isPlayerReady = new AsyncEvent();
  #explicationAudio;

  constructor(queueList, authorLabel, nameLabel, durationLabel, currentTimeLabel, musicDescriptionLabel) {
    super();
    this.#queueList = queueList
    this.#authorLabel = authorLabel
    this.#nameLabel =  nameLabel
    this.#durationLabel = durationLabel;
    this.#currentTimeLabel = currentTimeLabel;
    this.#musicDescriptionLabel = musicDescriptionLabel;
    this.createPlayer();
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
    itemName.textContent = params["title"];

    const itemGenre = document.createElement("span");
    itemGenre.className = "right";
    itemGenre.textContent = params["genre_name"];
    
    queueItem.append(itemName, itemGenre);
    this.#queueList.append(queueItem);

    if (!this.#isPlaying) {
      this.playMusic();
    }
  }

  #showMusicInfos(name, author, description) {
    this.#authorLabel.textContent = author;
    this.#nameLabel.textContent = name;
    this.#musicDescriptionLabel.textContent = description;
  }

  async #startExplication(src) {
    return new Promise((resolve) => {
      this.#explicationAudio = new Audio(src)
      this.#explicationAudio.addEventListener("ended", resolve)
      this.#explicationAudio.play()
    });
  }

  async playMusic() {
    this.#isPlaying ||= true;
    
    // Checa se o player esta pronto antes de continuar
    if (!this.#isPlayerReady.peek()) {
      console.log("Player: Esperando o player ficar pronto");
      await this.#isPlayerReady.whenActive();
    }
    
    // Checa se tem algum video na queue, se n marca q n ta reproduzindo mais
    if (this.#musics.length <= 0) {
      this.#isPlaying = false
      return;
    }

    // Remove da queue original
    const music = this.#musics.shift();
    this.#queueList.removeChild(this.#queueList.children[0]);
    console.log("Video played: ", music);

    // Prepara o video
    this.player.cueVideoById(music["source_id"]);

    // Exibe as infos
    this.#showMusicInfos(music["title"], music["artist"], music["description"]);
    
    // Comeca a explicacao
    await this.#startExplication(`/storage/${music['explication_source']}`);

    // Comeca o video
    this.player.playVideo();
  }

  cleanStates() {
    console.log("Limpando estados...")
    clearInterval(this.#currentTimeInterval);
    this.#explicationAudio.currentTime = this.#explicationAudio.duration;
  }

  onPlayerError(event) {
    console.log("Error: ", event.data);

    // Se der erro limpa os estados, marca erro e playNext
    this.cleanStates();

    createToast({
      message: "Erro na reprodução da música, reproduzindo a proxima",
      styles: {
        bottom: "6%",
        right: "2%"
      }
    });
    this.playMusic();
  }

  onPlayerReady () {
    console.log("Player ready");
    this.#isPlayerReady.activate();
  }

  onPlayerStateChange(event) {

    switch (event.data) {
      case YT.PlayerState.ENDED:
        // Limpa o intervalo que marca o tempo
        clearInterval(this.#currentTimeInterval);

        //  Reseta o tempo
        this.#durationLabel.innerHTML = "0:00"
        this.#currentTimeLabel.innerHTML = "0:00"
        this.playMusic();
        break;

      case YT.PlayerState.PLAYING:
        const duration = this.player.getDuration();

        this.#currentTimeInterval = setInterval(() => {
          const currentTime = this.player.getCurrentTime();
          this.#currentTimeLabel.innerHTML = this.format(currentTime);
          
          const percent = (currentTime / duration) * 100;

          document.getElementById("bar").style.width = percent + "%";
          document.getElementById("dot").style.left = percent + "%";
          
        }, 1000)
        break;
      
      case YT.PlayerState.CUED:
        // Prepara as infos do video
        this.#durationLabel.innerHTML = this.format(this.player.getDuration());
        document.getElementById("bar").style.width = 0;
        document.getElementById("dot").style.left = 0;
        break;
      
      default:
        clearInterval(this.#currentTimeInterval);
        break;
    }
  }
}

export const playerControls = new PlayerControls(
  document.getElementById("queue-list"),
  document.getElementById("author"),
  document.getElementById("music"),
  document.getElementById("musicDuration"),
  document.getElementById("currentMusicTime"),
  document.getElementById("music-description-label")
);

window.plr = playerControls;

window.togglePanel = () => {
  document.getElementById("panel").classList.toggle("open");
  document.getElementById("playerBox").classList.toggle("shift");
};