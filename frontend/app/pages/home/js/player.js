/* YOUTUBE */
let youtubePlayer;

class PlayerControls extends YoutubeFrameControls {
  constructor() {
    this.queue = new AsyncQueue();
  }

  
  addMusic(params) {
    this.queue.put(params);
  }
  
  async start() {
    while (true) {
      const music = await this.queue.get();
      const sourceId = music[0];
      const musicAuthor = music[1];
      
      await this.playMusic(sourceId, musicAuthor);
    }
  }
  
  onPlayerReady() {
    console.log(1);
  }

  togglePanel() {
    document.getElementById("panel").classList.toggle("open");
    document.getElementById("playerBox").classList.toggle("shift");
  }
  toggleQueue() {
    document.getElementById("queue").classList.toggle("open");
  }
  format(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
}