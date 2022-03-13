const state = {};

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

//search
const searchBar = document.querySelector("[name=searchBar]");
const searchBtn = document.querySelector("[name=searchBtn]");

newInput.addEventListener("click", () => createNewFormList());

window.addEventListener("load", () => loadTodos());

loadMoreBtn.addEventListener("click", () => loadMore());

completedBTn.addEventListener("click", () => showCompleted());

incompleteBtn.addEventListener("click", () => showIncomplete());

allBtn.addEventListener("click", () => showAll());

searchBar.addEventListener("keyup", function () {
  const searchText = sanitizeString(this.value);
  searchText.length >= 3 ? search(searchText) : "";
  searchText.length === 0 ? resetSearch() : "";
});
