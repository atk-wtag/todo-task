// creates new HTML <li> element and displays it
function addNewHTMLElement(
  index,
  desc,
  created_at,
  completed,
  completed_at_node,
  placement
) {
  let newTodoElement = createTodoElement(
    index,
    desc,
    created_at,
    completed,
    completed_at_node
  );
  placement === "append"
    ? todoList.append(newTodoElement)
    : todoList.prepend(newTodoElement);
}

// creates new HTML list element
function createTodoElement(
  key,
  desc,
  created_at,
  completed = null,
  completed_at_node = null
) {
  const li = document.createElement("div"); // new <div> element

  //spinner animation
  const sp = document.createElement("div");
  sp.setAttribute("class", "spinnerDiv");
  sp.innerHTML = getCardSpinner();

  //bottom elemnts div
  const bottomDiv = document.createElement("div");
  bottomDiv.setAttribute("class", "bottomDiv");

  //checkbox, buttons div
  const checkboxDiv = document.createElement("div");
  checkboxDiv.setAttribute("class", "checkboxDiv");

  // checkbox to mark as done
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", changeStatus);

  // label to act as to-do text
  const label = document.createElement("label");
  label.innerText = desc;
  label.setAttribute("class", "md-txt");

  const date = document.createElement("p");
  date.innerText = ` created on: ${created_at}`;
  date.setAttribute("class", "sm-txt");
  // new edit button
  let editBtn = createButton("", editTodo);
  editBtn.setAttribute("class", "edtDltBtn");
  editBtn.innerHTML = getEditIcon();

  // new delete button
  let delBtn = createButton("", deleteTodo);
  delBtn.setAttribute("class", "edtDltBtn");
  delBtn.innerHTML = getDltBtn();

  // strike-through based on the status

  li.setAttribute("id", key);
  li.setAttribute("class", "todoListElem");

  li.prepend(sp);

  //add buttons the the div
  checkboxDiv.appendChild(checkBox);

  // add element to the bottom div

  li.appendChild(label);
  li.appendChild(date);
  if (completed) {
    checkBox.checked = true;
    label.style.setProperty("text-decoration", "line-through");
    label.style.setProperty("color", "rgba(11, 195, 117, 1)");
  } else checkboxDiv.appendChild(editBtn);

  checkboxDiv.appendChild(delBtn);

  bottomDiv.appendChild(checkboxDiv);

  if (completed) {
    const completed_div = document.createElement("div");
    completed_div.setAttribute("class", "completed");
    completed_div.appendChild(completed_at_node);
    bottomDiv.appendChild(completed_div);
  }
  li.appendChild(bottomDiv);

  li.setAttribute("style", "margin: 1vh 0");

  return li;
}

// make an editable input box
function makeEditable(list) {
  const div = list.parentNode.parentNode;

  const labelData = div.children[1].innerText; // current todo text

  const newNode = replaceNode(div, div.children[1], "textarea", labelData); // replaces todo text label with textarea input

  const saveBtn = createButton(
    "save",
    () => updateTodo.call(list.children[1]),
    "margin-left: 1vw"
  ); // a new save button element

  // const newBtn = replaceNode(list, list.children[1], "button", "save", saveBtn); // replaces edit button with save button

  list.children[1].remove();
  list.insertBefore(saveBtn, list.children[0]);

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
    li.setAttribute("class", "todoListElem");

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
      deleteElement(this.parentNode);
      addTodo(todo_val);
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

function getCompletedNode(created_at, completed_at) {
  const completed_at_node = document.createElement("label");
  let time_to_finish = compareDates(created_at, completed_at);
  const d = time_to_finish > 1 ? "days" : "day";
  time_to_finish = time_to_finish === 0 ? "less than a" : time_to_finish;
  completed_at_node.innerText = ` Completed in ${time_to_finish} ${d}`;

  return completed_at_node;
}

function removeAllChild(list) {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
