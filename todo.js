// loads all todos from DB
async function loadTodos() {
  const allTodos = await getAll();
  for (const k in allTodos) {
    const todo_details = allTodos[k];
    created_at = todo_details.created_at.slice(0, 10);
    completed_at = todo_details.completed_at;

    completed_at = completed_at ? completed_at.slice(0, 10) : completed_at;

    completed_at_node = completed_at
      ? getCompletedNode(created_at, completed_at)
      : null;
    addNewHTMLElement(
      todo_details.u_id,
      todo_details.description,
      created_at,
      todo_details.completed,
      completed_at_node
    );
  }
}

// add new todo to the state object
async function addTodo(todo) {
  const input = todo;
  if (input) {
    let key = Date.now(); // current time in ms, to use as db key and <li> id

    const obj = await create(key, input);

    const date = getCurrDate();
    obj.error
      ? alert("failed to add")
      : addNewHTMLElement(key, input, date, false);
  }
}

// deletes a todo
async function deleteTodo() {
  const list = this.parentNode;
  setDisabled(list);
  let id = list.id; // id of the <li> element

  const deleted = await deleteByID(id); // updates the localStorage with the new state
  setEnabled(list);
  deleted.error ? alert("failed to delete") : list.remove();
}

// edit a todo
function editTodo() {
  const list = this.parentNode; // the current <li> element
  const newInput = makeEditable(list); // Create a new input box
}

async function updateTodo(prev_val) {
  const list = this.parentNode;
  setDisabled(list);

  list.children[3].remove(); // delete 'save' button
  const value = list.children[1].value.trim(); // new textarea value
  list.removeChild(list.children[1]); // removes the textarea element from <li>

  const updtlabel = document.createElement("label"); // a new label element
  updtlabel.innerText = value; // set new label value to textarea value
  list.insertBefore(updtlabel, list.children[1]); // add the new label to <li> before the 'save' button

  const update = await updateByID(list.id, value);
  if (update.error) {
    alert("failed to update");
    list.children[1].innerText = prev_val;
  }
  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");
  list.insertBefore(editBtn, list.children[3]);
  setEnabled(list);
}

// change mark-as-done (toggle checkbox). invoked when the checkbox is clicked
async function changeStatus() {
  const list = this.parentNode;
  setDisabled(list);

  if (list.children[0].checked) {
    await markAsDone.call(list.children[0]);
  } else {
    await markAsUndone.call(list.children[0]);
  }
  setEnabled(list);
}

async function markAsDone() {
  const list = this.parentNode;
  const id = list.id;
  const text = list.children[1].innerText || list.children[1].value; // todo text label

  list.childNodes[3].remove();

  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");

  const checked = await toggleCompleted(id, true);
  if (!checked.error) {
    const newText = document.createElement("label");
    newText.innerText = text;

    newTextNode = replaceNode(list, list.children[1], "label", text, newText);
    newTextNode.setAttribute("style", "text-decoration:line-through;"); // strike-through if marked/checked

    const completed_at = checked.data[0].completed_at.slice(0, 10);

    if (completed_at) {
      const created = checked.data[0].created_at.slice(0, 10);

      list.appendChild(getCompletedNode(created, completed_at));
    }
  } else {
    // remove strike-through for error, and add the 'edit' button
    alert("failed");
    list.children[0].checked = false;
    list.insertBefore(editBtn, list.children[3]);
  }
}

async function markAsUndone() {
  const list = this.parentNode;
  const id = list.id;
  const label = list.childNodes[1]; // todo text label

  list.removeChild(list.children[list.children.length - 1]); // remove completed at

  const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");

  const checked = await toggleCompleted(id, false);
  if (!checked.error) {
    label.setAttribute("style", "text-decoration:none;"); // remove strike-through if unmarked/unchecked
    list.insertBefore(editBtn, list.children[3]);
  } else {
    alert("failed");
    list.children[0].checked = true;
  }
}
