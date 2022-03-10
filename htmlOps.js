// creates new HTML <li> element and displays it
function addNewHTMLElement(
  index,
  desc,
  created_at,
  completed,
  completed_at_node
) {
  let newTodoElement = createTodoElement(
    index,
    desc,
    created_at,
    completed,
    completed_at_node
  );
  todoList.prepend(newTodoElement);
}

// creates new HTML list element
function createTodoElement(
  key,
  desc,
  created_at,
  completed = null,
  completed_at_node = null
) {
  const li = document.createElement("li"); // new <li> element

  // checkbox to mark as done
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", changeStatus);

  // label to act as to-do text
  const label = document.createElement("label");
  label.innerText = desc;

  const date = document.createElement("label");
  date.innerText = ` created on: ${created_at}`;

  // new edit button
  let editBtn = createButton("Edit", editTodo, "margin-left : 1vw");

  // new delete button
  let delBtn = createButton("Delete", deleteTodo, "margin-left : 1vw");
  // strike-through based on the status

  li.setAttribute("id", key);

  li.appendChild(checkBox);
  li.appendChild(label);
  li.appendChild(date);
  if (completed) {
    checkBox.checked = true;
    label.setAttribute("style", "text-decoration:line-through;");
  } else li.appendChild(editBtn);
  li.appendChild(delBtn);

  completed ? li.appendChild(completed_at_node) : undefined;

  li.setAttribute("style", "margin: 1vh 0");

  return li;
}

// make an editable input box
function makeEditable(list) {
  const labelData = list.children[1].innerText; // current todo text

  const newNode = replaceNode(list, list.children[1], "textarea", labelData); // replaces todo text label with textarea input

  const saveBtn = createButton(
    "save",
    () => updateTodo.call(list.children[3], labelData),
    "margin-left: 1vw"
  ); // a new save button element

  const newBtn = replaceNode(list, list.children[3], "button", "save", saveBtn); // replaces edit button with save button

  return newNode; // returns the newly created textarea element.
}

// create a button and return it
function createButton(label, onClick, style) {
  const btn = document.createElement("button");
  btn.innerText = label;
  btn.addEventListener("click", onClick);
  btn.setAttribute("style", style);

  return btn;
}

// replaces a node in an element. takes an element, a node to replace, a node type to replace with, and the node name.
function replaceNode(list, oldNode, newNodeType, text, preMadeNode = null) {
  var newNode;
  if (!preMadeNode) {
    newNode = document.createElement(newNodeType);
    newNode.value = text;
  } else {
    newNode = preMadeNode;
  }
  list.insertBefore(newNode, oldNode);
  oldNode.remove();

  return newNode;
}

function createNewFormList() {
  if (!elementExists("form")) {
    const li = document.createElement("li"); // new <li> element

    // new form
    const form = document.createElement("form");

    // new form input box
    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("name", "todoInputBox");
    inputBox.setAttribute("placeholder", "Todo");

    // submit button
    const submit = createNewInput(
      "submit",
      "addTodoBtn",
      "Add",
      "margin-left: 1vw"
    );

    // delete button
    const deleteBtn = createNewInput(
      "button",
      "deleteBtn",
      "x",
      "margin-left: 1vw"
    );
    deleteBtn.onclick = function () {
      deleteElement(li);
    };

    form.appendChild(inputBox);
    form.appendChild(submit);
    form.appendChild(deleteBtn);

    li.appendChild(form);
    todoList.prepend(li);

    form.onsubmit = function (e) {
      e.preventDefault();
      const todo_val = inputBox.value.trim();
      if (!todo_val) return;
      addTodo(todo_val);

      deleteElement(this.parentNode);
    };
  }
}

function deleteElement(thisArg) {
  const elem = thisArg;
  elem.remove();
}

function elementExists(elem) {
  const form = document.querySelector(elem);
  return document.body.contains(form);
}

function createNewInput(type, name, value, style) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.setAttribute("value", value);
  input.setAttribute("style", style);

  return input;
}

function setDisabled(item) {
  const elem = item;
  elem.style.setProperty("pointer-events", "none");
  elem.style.setProperty("opacity", "0.6");
}
function setEnabled(item) {
  const elem = item;
  elem.style.setProperty("pointer-events", "auto");
  elem.style.setProperty("opacity", "1.0");
}

function getCompletedNode(created_at, completed_at) {
  const completed_at_node = document.createElement("label");
  let time_to_finish = compareDates(created_at, completed_at);
  const d = time_to_finish > 1 ? "days" : "day";
  time_to_finish = time_to_finish === 0 ? "less than a" : time_to_finish;
  completed_at_node.innerText = ` Completed in ${time_to_finish} ${d}`;

  return completed_at_node;
}
