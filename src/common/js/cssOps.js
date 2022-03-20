function setDisabled(item) {
  const elem = item;
  const spinner = elem.children[1].children[1].children[0].children[0];

  elem.children[0].classList.add("disabled");
  elem.children[0].classList.add("blur");
  elem.children[2].classList.add("disabled");
  elem.children[2].classList.add("blur");

  spinner.style.setProperty("display", "flex");
}

function setEnabled(item) {
  const elem = item;
  const spinner = elem.children[1].children[1].children[0].children[0];

  elem.children[0].classList.remove("disabled");
  elem.children[0].classList.remove("blur");

  elem.children[2].classList.remove("disabled");
  elem.children[2].classList.remove("blur");

  spinner.style.setProperty("display", "none");
}

function disableWindow() {
  content.classList.add("disabled");
  content.classList.add("blur");
  spinner.style.setProperty("display", "block");
}

function enableWindow() {
  content.classList.remove("disabled");
  content.classList.remove("blur");
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
  if (searchBar.classList.contains("fadeIn")) hideSearchBar();
  else {
    searchBar.classList.add("fadeIn");
    searchBar.focus();
  }
}

function hideSearchBar() {
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.replace("fadeIn", "fadeOut");
}
