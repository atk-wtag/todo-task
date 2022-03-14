function setDisabled(item) {
  const elem = item;
  console.log(elem);
  elem.children[0].children[0].style.setProperty("display", "block");
  elem.style.setProperty("pointer-events", "none");
  elem.style.setProperty("opacity", ".6");
}

function setEnabled(item) {
  const elem = item;

  elem.children[0].children[0].style.setProperty("display", "none");

  elem.style.setProperty("pointer-events", "auto");
  elem.style.setProperty("opacity", "1.0");
}

function disableWindow() {
  content.style.setProperty("pointer-events", "none");
  content.style.setProperty("opacity", ".6");
  spinner.style.setProperty("display", "block");
}

function enableWindow() {
  content.style.setProperty("pointer-events", "auto");
  content.style.setProperty("opacity", "1.0");
  spinner.style.setProperty("display", "none");
}
