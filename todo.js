// loads all todos from DB
async function loadTodos(r = true) {
  if (r) await reset();
  removeAllChild(todoList);

  setState("pointer", "all");
  reset_showing(state.all);
  showTodos("append");
  return;
}

// add new todo to the state object
async function addTodo(todo) {
  disableWindow();
  let input = todo;
  if (input) {
    input = sanitizeString(input);
    let key = Date.now(); // current time in ms, to use as db key and <li> id

    const obj = await create(key, input);

    if (!obj.error) {
      searchBar.value = "";
      // await state.all.push(obj.data[0]);
      await loadTodos();
      showToast(false);
    } else showToast(true);
  }
}

// deletes a todo
async function deleteTodo() {
  const list = this.parentNode;
  const div = list.parentNode.parentNode;

  setDisabled(div);
  let id = div.id; // id of the <div> element

  const deleted = await deleteByID(id);
  setEnabled(div);
  if (deleted.error) {
    showToast(true);
    loadTodos();
  } else {
    showToast(false);
    div.remove();
    if (state.pointer == "completed") showCompleted();
    else if (state.pointer == "incomplete") showIncomplete();
    else {
      disableWindow();
      loadTodos();
    }
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

  let value = div.children[1].value.trim(); // new textarea value
  value = sanitizeString(value);
  if (!value) return;
  setDisabled(div);

  list.children[0].remove(); // delete 'save' button
  div.removeChild(div.children[1]); // removes the textarea element from <div>

  const updtlabel = document.createElement("label"); // a new label element
  updtlabel.innerText = value; // set new label value to textarea value
  updtlabel.className = "disabled";
  div.insertBefore(updtlabel, div.children[1]); // add the new label to <div> before the 'created at' node

  const update = await updateByID(div.id, value);
  if (update.error) {
    showToast(true);
    reset();
  } else {
    showToast(false);
    disableWindow();
    loadTodos();
  }

  setEnabled(div);
}

// change mark-as-done (toggle checkbox). invoked when the checkbox is clicked
async function changeStatus() {
  const list = this.parentNode;
  const div = list.parentNode;
  const parentDiv = div.parentNode;

  setDisabled(parentDiv);
  try {
    if (list.children[0].checked) {
      await markAsDone.call(list.children[0]);
    } else {
      await markAsUndone.call(list.children[0]);
    }
    if (state.pointer === "completed") showCompleted();
    else if (state.pointer === "incomplete") showIncomplete();
    else if (state.pointer === "all") {
      disableWindow();
      loadTodos();
    }

    showToast(false);
  } catch (e) {
    console.log(e);
    showToast(true);
  } finally {
    setEnabled(parentDiv);
  }
}

// makes todo completed
async function markAsDone() {
  const list = this.parentNode;
  const div = list.parentNode.parentNode;

  const id = div.id;
  const text = div.children[1].innerText || div.children[1].value; // todo text label
  // list.children[1].remove();
  await toggleCompleted(id, true, text);
}

// makes todo incomplete
async function markAsUndone() {
  const list = this.parentNode;
  const div = list.parentNode.parentNode;

  const id = div.id;
  const label = div.children[1]; // todo text label
  label.setAttribute("class", "md-txt");
  div.children[div.children.length - 1].remove(); // remove completed at

  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");

  await toggleCompleted(id, false);
}
