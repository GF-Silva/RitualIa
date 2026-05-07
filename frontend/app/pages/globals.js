const API_URL = "http://localhost:8000";
var playerParams = null;

class OpenPage {
    set(page) {
        switch (page) {
            case "":
                document.getElementById("home").style.visibility = "visible";
                document.getElementById("player").style.visibility = "hidden";
                break;
            case "#player":
                document.getElementById("home").style.visibility = "hidden";
                document.getElementById("player").style.visibility = "visible";
                break;
            default:
                break;
        }
    }
}

const openPage = new OpenPage();
/*
openPage.set(window.location.hash)
window.addEventListener('hashchange', () => {
  console.log('Mudou para:', window.location.hash);
  openPage.set(window.location.hash);
});
*/