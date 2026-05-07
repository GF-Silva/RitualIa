import { AsyncEvent } from "./async-event.js";
import { YoutubeFrameControls } from "./youtube-frame-controls.js";
import { AsyncQueue } from "./async-queue.js";
/* YOUTUBE */
let youtubePlayer;

class PlayerControls extends YoutubeFrameControls {
  constructor() {
    super();
    this.queue = new AsyncQueue();
    this.queueList = document.getElementById("queue-list");
    this.musicFinished = new AsyncEvent();
    console.log('PlayerControls initialized');
  }
  
  addMusic(params) {
    this.queue.put(params);
    const queueItem = document.createElement("div");
    queueItem.className = "queue-item";

    const itemName = document.createElement("span");
    itemName.className = "left";
    itemName.textContent = params["name"];

    const itemGenre = document.createElement("span");
    itemGenre.className = "right";
    itemGenre.textContent = params["genre"];
    
    queueItem.append(itemName, itemGenre);
    this.queueList.append(queueItem);
  }
  
  async start() {
    while (true) {
      const musicData = await this.queue.get();
      this.playMusic(musicData);
      await this.musicFinished.when(true);
      this.queue.remove(musicData);
      this.queueList.removeChild(this.queueList.firstChild);
      this.musicFinished.set(false);
    }
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.musicFinished.set(true);
      this.destroyPlayer();
    }
  }

  togglePanel() {
    document.getElementById("panel").classList.toggle("open");
    document.getElementById("playerBox").classList.toggle("shift");
  }
  toggleQueue() {
    document.getElementById("queue").classList.toggle("open");
  }
}

export { PlayerControls };