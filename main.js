const state = {};
let timer;

function addJS(uri) {
  let jsFile = document.createElement("script");
  jsFile.src = uri;
  document.head.appendChild(jsFile);
}

addJS("https://cdn.jsdelivr.net/npm/@supabase/supabase-js");
addJS("/dbOps.js");
addJS("/htmlOps.js");
addJS("/todo.js");
addJS("./common/js/resource.js");
addJS("/filter.js");
addJS("/common/js/stateOps.js");
addJS("/search.js");
addJS("/common/js/cssOps.js");
addJS("/common/js/svgOps.js");

//crud buttons
let newInput = document.querySelector("[name=createBtn]"); // create button
let todoInput = document.querySelector("[name=todoInputBox]"); // input box
let form = document.querySelector("form"); // input form
let todoList = document.getElementById("todoList"); // <ul> to append todos

// filter buttons
const allBtn = document.querySelector("[name=allTodoBtn]"); // show all button
const incompleteBtn = document.querySelector("[name=incompleteBtn]"); // filter by incomplete
const completedBTn = document.querySelector("[name=completedBtn]"); // filter completed
const loadMoreBtn = document.querySelector("[name=loadMoreBtn]"); // load more

const filterBtnDiv = document.querySelector("[id=filterBtnDiv]");

//search
const searchBar = document.querySelector("[name=searchBar]");
const searchBtn = document.querySelector("[name=searchBtn]");

//preloading div
const preloader = document.querySelector("[class=preloader]");

//spinner
const spinner = document.querySelector("[class=spinner]");

//toast div
const toast = document.querySelector("[id=toast]");

//navbar
const navbar = document.querySelector("[id=navbar]");

//content divs
const container = document.querySelector("[class=container]");
const main_div = document.querySelector("[class=main-div]");
const no_todos = document.querySelector("[class=no-todos]");
const loadMoreDiv = document.querySelector("[class=loadMoreDiv]");
const content = document.querySelector("[id=content]");
const toto_ul = document.querySelector("[class=todo-ul-div]");

//no-todos text
const no_todos_txt = document.querySelector("[id=no-todos-txt]");

newInput.addEventListener("click", () => createNewFormList());

window.addEventListener("load", async () => {
  await loadTodos();
  // setTimeout(() => {
  preloader.remove();
  main_div.style.setProperty("display", "block");
  // }, 2000);
});

loadMoreBtn.addEventListener("click", () => loadMore());

completedBTn.addEventListener("click", () => showCompleted());

incompleteBtn.addEventListener("click", () => showIncomplete());

allBtn.addEventListener("click", () => showAll());

searchBtn.addEventListener("click", () => toggleSearchBarVisibility());

toto_ul.addEventListener("mousedown", () => hideSearchBar());

searchBar.addEventListener("keyup", function () {
  timer = setTimeout(() => {
    const searchText = this.value;
    searchText.length >= 3 ? search(sanitizeString(searchText)) : "";
    searchText.length === 0 ? resetSearch() : "";
  }, 1000);
});

searchBar.addEventListener("keypress", function () {
  clearTimeout(timer);
});
