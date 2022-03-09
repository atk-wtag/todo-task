function addJS(uri) {
  let jsFile = document.createElement("script");
  jsFile.src = uri;
  document.head.appendChild(jsFile);
}

addJS("https://cdn.jsdelivr.net/npm/@supabase/supabase-js");
addJS("/dbOps.js");
addJS("/htmlOps.js");
addJS("/todo.js");

let newInput = document.querySelector("[name=createBtn]");
let todoInput = document.querySelector("[name=todoInputBox]");
let form = document.querySelector("form");
let todoList = document.getElementById("todoList");

newInput.addEventListener("click", function () {
  createNewFormList();
});

window.addEventListener("load", function () {
  loadTodos();
});

function compareDates(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  return parseInt((date2 - date1) / 86400000);
}

function getCurrDate() {
  return new Date().toISOString().slice(0, 10);
}
