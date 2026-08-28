
function warningIcon() {
  const svgNS = "http://www.w3.org/2000/svg";

  const icon = document.createElementNS(svgNS, "svg");
  icon.style.background = "#ff0";
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("class", "toast__icon");
  icon.innerHTML = `
    <title>alert_fill</title>
      <g
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="System"
          transform="translate(-48.000000, -48.000000)"
          fill-rule="nonzero"
        >
          <g id="alert_fill" transform="translate(48.000000, 48.000000)">
            <path
              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
              id="MingCute"
              fill-rule="nonzero"
            ></path>
            <path
              d="M13.299,3.1477 L21.933,18.1022 C22.5103,19.1022 21.7887,20.3522 20.634,20.3522 L3.36601,20.3522 C2.21131,20.3522 1.48962,19.1022 2.06697,18.1022 L10.7009,3.14771 C11.2783,2.14771 12.7217,2.1477 13.299,3.1477 Z M12,15 C11.4477,15 11,15.4477 11,16 C11,16.5523 11.4477,17 12,17 C12.5523,17 13,16.5523 13,16 C13,15.4477 12.5523,15 12,15 Z M12,8 C11.48715,8 11.0644908,8.38604429 11.0067275,8.88337975 L11,9 L11,13 C11,13.5523 11.4477,14 12,14 C12.51285,14 12.9355092,13.613973 12.9932725,13.1166239 L13,13 L13,9 C13,8.44772 12.5523,8 12,8 Z"
              fill="#09244B"
            ></path>
          </g>
        </g>
      </g>
    `;

  return icon;
}

function infoIcon() {
  const svgNS = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(svgNS, "svg");
  icon.setAttribute("class", "toast__icon");
  icon.setAttribute("viewBox", "0 0 416.979 416.979");

  icon.innerHTML = `
  <g>
    <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
      c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
      c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
      c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
      c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/>
  </g>
  `

  return icon;
}

const icons = Object.freeze({
  INFO: infoIcon(),
  WARNING: warningIcon()
});

function createToast({ message, time = 5, styles, icon = icons.INFO }) {
  const toast = buildToast(message, time, icon);
  Object.assign(toast.style, styles);
  document.body.append(toast);

  const countdown = document.getElementById("countdown-timer");

  toast.show();

  intervalId = setInterval(() => {
    countdown.value -= 0.01;

    if (countdown.value <= 0) {
      clearInterval(intervalId);
      toast.remove();
    }
  }, 10);
}

function buildToast(message, time, icon) {
  const toast = document.createElement("dialog");
  toast.className = "toast";

  const messageSpan = document.createElement("span");
  messageSpan.innerHTML = message;

  const countdown = document.createElement("progress");
  countdown.id = "countdown-timer";
  countdown.max = time;
  countdown.min = 0;
  countdown.value = time;

  toast.append(icon, messageSpan, countdown);

  return toast;
}