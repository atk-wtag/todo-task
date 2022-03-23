// loads all todos from DB
async function loadTodos(r = true) {
  if (r) await reset();
  removeAllChild(todoList);

  setState("pointer", "all");
  resetCurrentlyShowing(state.all);
  showTodos("append");
  return;
}

// add new todo to the state object
async function addTodo(todo) {
  let input = todo;
  if (!input) return;
  disableWindow();

  let key = Date.now(); // current time in ms, to use as db key and <li> id

  const obj = await create(key, input);
  if (!obj.error) {
    searchBar.value = "";
    // state.all.push(obj.data[0]);
    await loadTodos();
    showToast(false);
  } else showToast(true);
}

// deletes a todo
async function deleteTodo() {
  console.log(4);
  const list = this.parentNode;
  const div = list.parentNode.parentNode;

  setDisabled(div);

  let id = div.id; // id of the <div> element
  const deleted = await deleteByID(id);

  setEnabled(div);

  if (deleted.error) {
    disableWindow();
    showToast(true);
    loadTodos();
  } else {
    showToast(false);
    disableWindow();
    div.remove();
    await removeById(id);
    if (state.pointer === "all") loadTodos();
    else if (state.pointer === "incomplete") showIncomplete();
    else showCompleted();
  }
}
// edit a todo
function editTodo() {
  const list = this.parentNode; // the current <li> element
  const newInput = makeEditable(list); // Create a new input box
}

async function updateTodo() {
  const list = this.parentNode;

  const div = list.parentNode.parentNode;
  let value = div.children[0].children[0].value.trim(); // new textarea value
  value = sanitizeString(value);
  if (!value) return;

  setDisabled(div);

  list.children[0].remove(); // delete 'save' button
  div.children[0].children[0].remove(); // removes the textarea element from <div>

  const updtlabel = document.createElement("label"); // a new label element
  updtlabel.innerText = value; // set new label value to textarea value
  updtlabel.classList.add("md-txt");

  div.children[0].insertBefore(updtlabel, div.children[0].children[0]); // add the new label to <div> before the 'created at' node

  //edit btn
  const editBtn = createButton("", editTodo);
  editBtn.setAttribute("class", "edtDltBtn");
  editBtn.innerHTML = getEditIcon();
  const update = await updateByID(div.id, value);

  list.insertBefore(editBtn, list.children[1]);

  if (update.error) {
    showToast(true);
  } else {
    showToast(false);
    await modifyState(div.id, "description", value);

    if (state.pointer == "incomplete") showIncomplete();
  }

  setEnabled(div);
}

// makes todo completed

async function markAsDone() {
  const list = this.parentNode;
  const div = list.parentNode.parentNode;

  setDisabled(div);

  const id = div.id;
  const text =
    div.children[0].children[0].innerText || div.children[0].children[0].value; // todo text label
  await toggleCompleted(id, true, text);

  if (state.pointer === "incomplete") div.remove();
  else if (state.pointer === "all") {
    disableWindow();
    loadTodos();
  }

  showToast(false);
  setEnabled(div);
}
