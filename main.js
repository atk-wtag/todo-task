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
