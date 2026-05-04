const API_URL = "http://localhost:8000";
var page = "player";
var playerParams = null;

class openPage {
    constructor(page) {
        this.page = page;
    }

    switch (page) {
        case "home":
            document.getElementById("home").style.visibility = "visible";
            document.getElementById("player").style.visibility = "hidden";
            break;
        case "player":
            document.getElementById("home").style.visibility = "hidden";
            document.getElementById("player").style.visibility = "visible";
            break;
    
        default:
            break;
    }
}