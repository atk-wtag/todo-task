// creates new HTML <li> element and displays it
function addNewHTMLElement(
  index,
  desc,
  createdAt,
  completed,
  completedAtNode,
  placement
) {
  let newTodoElement = createTodoElement(
    index,
    desc,
    createdAt,
    completed,
    completedAtNode
  );
  placement === "append"
    ? todoList.append(newTodoElement)
    : todoList.prepend(newTodoElement);
}

// creates new HTML list element
function createTodoElement(
  key,
  desc,
  createdAt,
  completed = null,
  completedAtNode = null
) {
  const li = document.createElement("div"); // new <div> element

  //top div
  const topDiv = document.createElement("div");

  //mid div
  const midDiv = document.createElement("div");
  midDiv.setAttribute("class", "midDiv");

  //spinner div
  const spinnerDiv = document.createElement("div");
  spinnerDiv.setAttribute("class", "cardSpinnerDiv");

  //spinner object
  const spinnerObject = document.createElement("obj");
  spinnerObject.setAttribute("class", "cardSpinnerObj");
  spinnerObject.innerHTML = getCardSpinner(); //spinner svg

  spinnerDiv.appendChild(spinnerObject); // add spinner to its div

  //bottom elemnts div
  const bottomDiv = document.createElement("div");
  bottomDiv.setAttribute("class", "bottomDiv");

  //checkbox, buttons div
  const checkboxDiv = document.createElement("div");
  checkboxDiv.setAttribute("class", "checkboxDiv");

  // checkbox btn to mark as done
  const checkBox = createButton("", markAsDone);
  checkBox.setAttribute("class", "checkBtn");
  checkBox.innerHTML = getCheckbox();

  // label to act as to-do text
  const label = document.createElement("label");
  label.innerText = desc;
  label.setAttribute("class", "md-txt");

  // created at div
  const cd = document.createElement("div");
  cd.setAttribute("class", "createdAtDiv");

  //date text
  const date = document.createElement("p");
  date.innerText = ` created on: ${createdAt}`;
  date.setAttribute("class", "sm-txt");

  //add the todo text to the card
  li.appendChild(label);

  //add items to the top div
  topDiv.appendChild(label);
  topDiv.appendChild(date);

  // add items to the mid div
  midDiv.appendChild(cd); // add date
  midDiv.appendChild(spinnerDiv); // add spinner

  // new edit button
  let editBtn = createButton("", editTodo);
  editBtn.setAttribute("class", "edtDltBtn");
  editBtn.innerHTML = getEditIcon();

  // new delete button
  let delBtn = createButton("", deleteTodo);
  delBtn.setAttribute("class", "edtDltBtn");
  delBtn.innerHTML = getDltIcon();

  // strike-through based on the status

  li.setAttribute("id", key);
  li.setAttribute("class", "todoListElem");

  // add top div to the card div
  li.appendChild(topDiv);

  // add mid div to the card div
  li.appendChild(midDiv);

  if (completed) {
    checkBox.checked = true;
    label.style.setProperty("text-decoration", "line-through");
    label.style.setProperty("color", "rgba(11, 195, 117, 1)");
  } else {
    checkboxDiv.appendChild(checkBox);
    checkboxDiv.appendChild(editBtn);
  }

  checkboxDiv.appendChild(delBtn);

  bottomDiv.appendChild(checkboxDiv);

  if (completed) {
    const completedDiv = document.createElement("div");
    completedDiv.setAttribute("class", "completed");
    completedDiv.appendChild(completedAtNode);
    bottomDiv.appendChild(completedDiv);
  }
  li.appendChild(bottomDiv);

  return li;
}

// make an editable input box
function makeEditable(list) {
  const div = list.parentNode.parentNode;

  const labelData = div.children[0].children[0].innerText; // current todo text

  const newNode = replaceNode(
    div.children[0],
    div.children[0].children[0],
    "textarea",
    labelData
  ); // replaces todo text label with textarea input
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("maxlength", "100");
  newNode.focus();

  // update todo on enter key press
  newNode.addEventListener("keypress", (event) => {
    event.which === 13 && !event.shiftKey
      ? updateTodo.call(list.children[1])
      : undefined;
  });

  const saveBtn = createButton("save", () => updateTodo.call(list.children[1])); // a new save button element
  saveBtn.setAttribute("class", "saveBtn");

  list.children[1].remove(); //remove the edit button
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
  newInput.disabled = true;
  if (!elementExists("form")) {
    var toAdd = true;

    const addNew = function (e) {
      const textArea = this.parentNode.parentNode.children[0].children[0];

      if (toAdd) {
        // let todoValue = inputBox.value.trim();
        const todoValue = sanitizeString(inputBox.value);

        if (!todoValue) return;
        // deleteElement(this.parentNode.parentNode);
        textArea.disabled = true;

        addTodo(todoValue);
        newInput.disabled = false;
        toAdd = false;
      }
    };

    const li = document.createElement("div"); // new <div> element

    const childDiv = document.createElement("div"); // new child <div> element
    childDiv.setAttribute("class", "newTaskBottomDiv");

    li.setAttribute("class", "todoListElem");

    // new form
    const form = document.createElement("form");

    // new form input box
    const inputBox = document.createElement("textarea");
    inputBox.setAttribute("name", "todoInputBox");
    inputBox.setAttribute("rows", "4");
    inputBox.setAttribute("maxlength", "100");
    inputBox.autofocus = true;

    inputBox.addEventListener("keypress", (event) => {
      event.key === "Enter" && !event.shiftKey
        ? addNew.call(submit, event)
        : undefined;
    });
    // submit button
    const submit = createButton("", addNew, "");
    submit.innerText = "Add Task";
    submit.setAttribute("class", "saveBtn");

    // delete button
    const deleteBtn = createButton(
      "",
      function (e) {
        e.preventDefault();
        deleteElement(li);
        newInput.disabled = false;
      },
      ""
    );
    deleteBtn.setAttribute("class", "edtDltBtn");
    deleteBtn.innerHTML = getDltIcon();

    form.appendChild(inputBox);

    childDiv.appendChild(submit);
    childDiv.appendChild(deleteBtn);

    li.appendChild(form);
    li.appendChild(childDiv);
    todoList.prepend(li);
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

function getCompletedNode(createdAt, completedAt) {
  const completedAtNode = document.createElement("label");
  let timeToFinish = compareDates(createdAt, completedAt);
  const d = timeToFinish > 1 ? "days" : "day";
  timeToFinish = timeToFinish === 0 ? "less than a" : timeToFinish;
  completedAtNode.innerText = ` Completed in ${timeToFinish} ${d}`;

  return completedAtNode;
}

function removeAllChild(list) {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
