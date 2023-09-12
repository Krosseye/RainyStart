function handleThemeChange(event) {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const lightThemeLink = document.querySelector("#light-theme");
  const darkThemeLink = document.querySelector("#dark-theme");

  if (prefersDarkScheme.matches) {
    darkThemeLink.disabled = false;
    lightThemeLink.disabled = true;
  } else {
    darkThemeLink.disabled = true;
    lightThemeLink.disabled = false;
  }
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", handleThemeChange);

handleThemeChange();
