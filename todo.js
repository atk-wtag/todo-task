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
    disableWindow();
    showToast(true);
    loadTodos();
  } else {
    showToast(false);
    div.remove();
    await removeById(id);
    showTodos("append");
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
  let value = div.children[0].value.trim(); // new textarea value
  value = sanitizeString(value);
  if (!value) return;

  setDisabled(div);

  list.children[0].remove(); // delete 'save' button
  div.removeChild(div.children[0]); // removes the textarea element from <div>

  const updtlabel = document.createElement("label"); // a new label element
  updtlabel.innerText = value; // set new label value to textarea value
  updtlabel.classList.add("md-txt");

  div.insertBefore(updtlabel, div.children[0]); // add the new label to <div> before the 'created at' node

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
    if (state.pointer == "completed") showCompleted();
    else if (state.pointer == "incomplete") showIncomplete();
  }

  setEnabled(div);
}

// change mark-as-done (toggle checkbox). invoked when the checkbox is clicked
// async function changeStatus() {
//   const list = this.parentNode;
//   const div = list.parentNode;
//   const parentDiv = div.parentNode;

//   const el1 = list.children[0];
//   const el2 = list.children[1];

//   let checkbox;

//   if (el1.matches("[class=checkBtn]")) {
//     checkbox = el1;
//   } else checkbox = el2;

//   // setDisabled(parentDiv);
//   try {
//     checkbox.addEventListener("click", () => console.log(checkbox));
//     // if (checkbox.checked) {
//     // await markAsDone.call(checkbox);
//     // }
//     // else {
//     //   await markAsUndone.call(checkbox);
//     // }
//     if (state.pointer === "completed") showCompleted();
//     // else if (state.pointer === "incomplete") showIncomplete();
//     else if (state.pointer === "all") {
//       disableWindow();
//       loadTodos();
//     }

//     showToast(false);
//   } catch (e) {
//     console.log(e);
//     showToast(true);
//   } finally {
//     setEnabled(parentDiv);
//   }
// }

// makes todo completed

async function markAsDone() {
  const list = this.parentNode;
  const div = list.parentNode.parentNode;

  setDisabled(div);

  const id = div.id;
  const text = div.children[0].innerText || div.children[0].value; // todo text label
  console.log(text);
  await toggleCompleted(id, true, text);

  if (state.pointer === "incomplete") div.remove();
  else if (state.pointer === "all") {
    disableWindow();
    loadTodos();
  }

  showToast(false);
  setEnabled(div);
}

// makes todo incomplete
// async function markAsUndone() {
//   const list = this.parentNode;
//   const div = list.parentNode.parentNode;

//   const id = div.id;
//   const label = div.children[1]; // todo text label
//   label.setAttribute("class", "md-txt");
//   div.children[div.children.length - 1].remove(); // remove completed at

//   // const editBtn = createButton("Edit", editTodo, "margin-left: 1vw");

//   await toggleCompleted(id, false);
// }
