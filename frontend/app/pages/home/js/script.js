import { PlayerControls } from "./player.js";
import { submitData } from "./home.js";

export const playerControls = new PlayerControls();
let youtubeFrameControls = null;

playerControls.start()