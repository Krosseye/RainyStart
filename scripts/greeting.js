const timeContainer = document.querySelector("#time-container");
const currentTimeElement = document.querySelector("#current-time");
const greetingElement = document.querySelector("#greeting");

const timeOfDay = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
};

const printSlowly = (text, speed, container) => {
  container.textContent = "";

  for (let i = 0; i < text.length; i++) {
    setTimeout(
      function (char) {
        container.textContent += char;
      },
      i * speed,
      text[i]
    );
  }
};

const formatTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} ${amOrPm}`;
};

const updateGreetingColor = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    greetingElement.style.color = "#d08770"; // color for morning
    currentTimeElement.style.color = "#88c0d0";
  } else if (hours >= 12 && hours < 18) {
    greetingElement.style.color = "#ebcb8b"; // color for afternoon
    currentTimeElement.style.color = "#81a1c1";
  } else {
    greetingElement.style.color = "#b48ead"; // color for evening
    currentTimeElement.style.color = "#5e81ac";
  }
};

const fadeInTime = () => {
  setTimeout(() => {
    currentTimeElement.style.opacity = 1;
  }, 1000);
};

var nickname = getNickname();

window.addEventListener("load", () => {
  const greeting = `Good ${timeOfDay()}, ${nickname}.`;
  updateGreetingColor();
  printSlowly(greeting, 100, greetingElement);

  currentTimeElement.textContent = formatTime();

  fadeInTime();
  setInterval(updateGreetingColor, 60 * 1000);
});

setInterval(() => {
  currentTimeElement.textContent = formatTime();
}, 1000);
