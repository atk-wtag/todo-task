function setDisabled(item) {
  toggleCreateButton(true);
  const element = item;

  const spinnerId = `${item.id}spinner`;
  const spinner = document.getElementById(spinnerId);

  element.children[0].classList.add("disabled");
  element.children[0].classList.add("blur");
  element.children[2].classList.add("disabled");
  element.children[2].classList.add("blur");

  spinner.style.setProperty("display", "flex");
}

function setEnabled(item) {
  toggleCreateButton(false);

  const element = item;

  const spinnerId = `${item.id}spinner`;
  const spinner = document.getElementById(spinnerId);

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
  noTodos.style.setProperty("display", "none");
}

function enableWindow() {
  content.classList.remove("disabled");
  content.classList.remove("blur");
  spinner.style.setProperty("display", "none");
}

function showNoTodosFound(block = true, text = null) {
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

function toggleLoadMoreDivVisibility(visible = true) {
  visible
    ? loadMoreDiv.style.setProperty("visibility", "visible")
    : loadMoreDiv.style.setProperty("visibility", "hidden");
}

function toggleCreateButton(disable = false) {
  newInput.disabled = disable;
}

function setActive(element) {
  element.classList.add("activeButton");
}

function resetActiveButton() {
  incompleteBtn.classList.remove("activeButton");
  completedBtn.classList.remove("activeButton");
  allBtn.classList.remove("activeButton");
}
