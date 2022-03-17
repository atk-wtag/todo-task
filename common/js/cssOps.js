function setDisabled(item) {
  const elem = item;
  const spinner = elem.children[1].children[1].children[0].children[0];
  elem.classList.add("disabled");
  spinner.style.setProperty("display", "flex");
}

function setEnabled(item) {
  const elem = item;
  const spinner = elem.children[1].children[1].children[0].children[0];

  elem.classList.remove("disabled");
  spinner.style.setProperty("display", "none");
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

function showNoTodosFound(block = true, text = null) {
  main_div.style.setProperty("display", "block");
  no_todos.style.setProperty("display", "block");
  loadMoreDiv.style.setProperty("display", "none");
  if (block) {
    filterBtnDiv.classList.add("disabled");
    searchBtn.setAttribute("disabled", true);
  }
  no_todos_txt.innerText = text;
}

function hideNoTodosFound() {
  main_div.style.setProperty("display", "block");
  no_todos.style.setProperty("display", "none");
  loadMoreDiv.style.setProperty("display", "flex");
  filterBtnDiv.classList.remove("disabled");

  searchBtn.removeAttribute("disabled");
}

function toggleSearchBarVisibility() {
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.contains("fadeIn")
    ? hideSearchBar()
    : searchBar.classList.add("fadeIn");
}

function hideSearchBar() {
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.replace("fadeIn", "fadeOut");
}
