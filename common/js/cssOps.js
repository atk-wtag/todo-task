function setDisabled(item) {
  const elem = item;
  elem.children[0].children[0].style.setProperty("display", "block");
  for (var i = 0; i < elem.children.length; i++) {
    elem.children[i].className = "disabled";
  }
}

function setEnabled(item) {
  const elem = item;

  elem.children[0].children[0].style.setProperty("display", "none");

  for (var i = 0; i < elem.children.length; i++) {
    elem.children[i].className = "";
  }
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

function showNoTodosFound() {
  main_div.style.setProperty("display", "block");
  no_todos.style.setProperty("display", "block");
  loadMoreDiv.style.setProperty("display", "none");
  incompleteBtn.setAttribute("disabled", true);
  completedBTn.setAttribute("disabled", true);
  allBtn.setAttribute("disabled", true);
  searchBtn.setAttribute("disabled", true);
}

function hideNoTodosFound() {
  main_div.style.setProperty("display", "block");
  no_todos.style.setProperty("display", "none");
  loadMoreDiv.style.setProperty("display", "block");
  incompleteBtn.removeAttribute("disabled");
  completedBTn.removeAttribute("disabled");
  allBtn.removeAttribute("disabled");
  searchBtn.removeAttribute("disabled");
}
