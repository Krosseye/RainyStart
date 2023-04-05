const canvas = document.querySelector("#matrix-canvas");
const canvasContext = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 189;
canvas.style.display = "block";

const settings = {
  letters:
    '123456789¦!"£$%^&*()_+=[{]};:#~/?.>,<|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
      ""
    ),
  fontSize: 12,
  columns: 0,
  drops: [],
};

const adjustCanvasSize = () => {
  const width =
    Math.floor(window.innerWidth / settings.fontSize) * settings.fontSize;
  canvas.width = width;
  settings.columns = width / settings.fontSize;
  canvasContext.font = `normal 12px 'Open Sans', sans-serif`;
  settings.drops = Array.from({ length: settings.columns }, () =>
    Math.floor((Math.random() * canvas.height) / settings.fontSize)
  );
};

adjustCanvasSize();
window.addEventListener("resize", adjustCanvasSize);

const font = new FontFace("Open Sans", "url(../fonts/OpenSans.ttf)");
font.load().then(() => {
  document.fonts.add(font);
  canvasContext.font = `normal 12px 'Open Sans', sans-serif`;
});

const draw = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  canvasContext.fillStyle = prefersDarkScheme.matches
    ? "rgba(41, 46, 57, 0.5)"
    : "rgba(216, 222, 233, 0.5)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < settings.columns; i++) {
    const text =
      settings.letters[Math.floor(Math.random() * settings.letters.length)];
    const dropPosition = settings.drops[i] * settings.fontSize;

    const hue = i * 10;
    const saturation = "35%";
    const lightness = "60%";
    const color = `hsla(${hue}, ${saturation}, ${lightness})`;
    canvasContext.fillStyle = color;

    canvasContext.fillText(text, i * settings.fontSize, dropPosition);
    settings.drops[i]++;

    if (dropPosition > canvas.height && Math.random() > 0.95) {
      settings.drops[i] = 0;
    }
  }
};

setInterval(draw, 100);
