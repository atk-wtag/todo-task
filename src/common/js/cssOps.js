function setDisabled(item) {
  const element = item;
  const spinner = element.children[1].children[1].children[0].children[0];

  element.children[0].classList.add("disabled");
  element.children[0].classList.add("blur");
  element.children[2].classList.add("disabled");
  element.children[2].classList.add("blur");

  spinner.style.setProperty("display", "flex");
}

function setEnabled(item) {
  const element = item;
  const spinner = element.children[1].children[1].children[0].children[0];

  element.children[0].classList.remove("disabled");
  element.children[0].classList.remove("blur");

  element.children[2].classList.remove("disabled");
  element.children[2].classList.remove("blur");

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
  console.log(noTodos);
  noTodos.style.setProperty("display", "block");
  loadMoreDiv.style.setProperty("display", "none");
  if (block) {
    filterBtnDiv.classList.add("disabled");
    searchBtn.setAttribute("disabled", true);
  }
  noTodosText.innerText = text;
}

function hideNoTodosFound() {
  mainDiv.style.setProperty("display", "block");
  noTodos.style.setProperty("display", "none");
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
