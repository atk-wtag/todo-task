// loads all todos from DB
async function loadTodos(r = true) {
  removeAllChild(todoList);

  if (r) await reset();

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
  setDisabled(list);
  let id = list.id; // id of the <li> element

  const deleted = await deleteByID(id);
  setEnabled(list);
  if (deleted.error) showToast(true);
  else {
    showToast(false);
    list.remove();
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
  let value = list.children[2].value.trim(); // new textarea value
  value = sanitizeString(value);
  if (!value) return;
  setDisabled(list);

  list.children[4].remove(); // delete 'save' button
  list.removeChild(list.children[2]); // removes the textarea element from <li>

  const updtlabel = document.createElement("label"); // a new label element
  updtlabel.innerText = value; // set new label value to textarea value
  updtlabel.className = "disabled";
  list.insertBefore(updtlabel, list.children[2]); // add the new label to <li> before the 'save' button

  const update = await updateByID(list.id, value);
  if (update.error) {
    showToast(true);
    reset();
  } else showToast(false);

  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");
  list.insertBefore(editBtn, list.children[4]);
  setEnabled(list);
}

// change mark-as-done (toggle checkbox). invoked when the checkbox is clicked
async function changeStatus() {
  const list = this.parentNode;
  setDisabled(list);
  try {
    if (list.children[1].checked) {
      await markAsDone.call(list.children[1]);
    } else {
      await markAsUndone.call(list.children[1]);
    }
    if (state.pointer === "completed") showCompleted();
    else if (state.pointer === "incomplete") showIncomplete();
    showToast(false);
  } catch (e) {
    console.log(e);
    showToast(true);
  } finally {
    setEnabled(list);
  }
}

// makes todo completed
async function markAsDone() {
  const list = this.parentNode;
  const id = list.id;
  const text = list.children[2].innerText || list.children[2].value; // todo text label

  list.childNodes[4].remove();

  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");

  const checked = await toggleCompleted(id, true);
  if (!checked.error) {
    const newText = document.createElement("label");
    newText.innerText = text;

    newTextNode = replaceNode(list, list.children[2], "label", text, newText);
    newTextNode.style.setProperty("text-decoration", "line-through"); // strike-through if marked/checked
    newTextNode.className = "disabled"; // strike-through if marked/checked

    const completed_at = checked.data[0].completed_at.slice(0, 10);

    if (completed_at) {
      const created = checked.data[0].created_at.slice(0, 10);

      list.appendChild(getCompletedNode(created, completed_at));
    }
    await updateByID(id, text);
  } else {
    showToast(true);
    list.children[1].checked = false;
    // remove strike-through for error, and add the 'edit' button
    list.insertBefore(editBtn, list.children[4]);
  }
}

// makes todo incomplete
async function markAsUndone() {
  const list = this.parentNode;
  const id = list.id;
  const label = list.childNodes[2]; // todo text label

  list.removeChild(list.children[list.children.length - 1]); // remove completed at

  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");

  const checked = await toggleCompleted(id, false);
  if (!checked.error) {
    // modifyState(id, "description", label.innerText);
    label.style.setProperty("text-decoration", "none"); // remove strike-through if unmarked/unchecked
    list.insertBefore(editBtn, list.children[4]);
  } else {
    showToast(true);
    list.children[1].checked = true;
  }
}
