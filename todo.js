let state = {}; // object to hold the todo items.

let todoInput = document.querySelector("[name=todo]");
let form = document.querySelector("form");
let todoList = document.getElementById("todoList");
var edit = true;

// when the 'Add' button is clicked
form.onsubmit = (e) => {
  e.preventDefault();
  addTodo(todoInput.value);
  form.reset();
};

// reset the <ul> element on load
reset();

// resets the entire todo list
function reset() {
  // clear the <ul> element
  var obj = document.querySelector("ul");
  obj.innerHTML = "";

  state = {}; // clear the state object

  state = JSON.parse(localStorage.getItem("todos")); // reassign the storage values to the state

  //iterate over the state object to create html elements
  for (const k in state) {
    addNewElement(k);
  }
}

// creates new HTML list element
function createTodoElement(key) {
  var todo = state[key];

  // new <li> element
  const li = document.createElement("li");

  // checkbox to mark as done
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", changeStatus);

  // label to act as to-do text
  const label = document.createElement("label");
  label.innerHTML = todo[0];

  // strike-through based on the status
  if (state[key][1]) {
    checkBox.checked = true;
    label.setAttribute("style", "text-decoration:line-through;");
  }

  // new edit button
  const editBtn = createButton("Edit", editTodo, "margin-left : 1vw");

  // new delete button
  const delBtn = createButton("Delete", deleteTodo, "margin-left : 1vw");

  li.setAttribute("id", key);

  li.appendChild(checkBox);
  li.appendChild(label);

  li.appendChild(editBtn);
  li.appendChild(delBtn);

  li.setAttribute("style", "margin: 1vh 0");

  return li;
}

// add new todo to the state object
function addTodo(todo) {
  var input = todo.trim();

  if (input) {
    var inputArr = [input, false]; // 1st index -> todo task, 2nd index -> a boolean, to indicate whether the task is done or not. false -> not done, true -> done
    let key = Date.now(); // current time in ms, to use as key
    state[key] = inputArr;

    addNewElement(key); // create a new li with the current time in ms as key

    localStorage.setItem("todos", JSON.stringify(state)); // push the state to localStorage
  }
}

// creates new HTML <li> element and displays it
function addNewElement(index) {
  let newTodoElement = createTodoElement(index);
  todoList.appendChild(newTodoElement);
}

// deletes a todo
function deleteTodo() {
  let id = this.parentNode.id; // id of the <li> element

  delete state[id]; // deletes the element by id
  this.parentNode.remove(); // stops showing on DOM

  updateStorage(); // updates the localStorage with the new state
}

// edit a todo
function editTodo() {
  const list = this.parentNode; // the current <li> element
  const newInput = makeEditable(list); // Create a new input box

  // onClick the save button
  list.children[2].addEventListener("click", () => {
    const value = newInput.value; // the value on the textarea
    state[list.id][0] = value; // replace the old value with the new one on the state object. state[key] -> current todo array. array[0] -> todo text. array[1] -> done or not

    list.removeChild(list.children[1]); // removes the textarea element from <li>

    const updtlabel = document.createElement("label"); // a new label element
    updtlabel.innerHTML = value; // set new label value to textarea value

    list.insertBefore(updtlabel, list.children[1]); // add the new label to <li> before the 'save' button
    list.children[2].innerHTML = "Edit"; // change 'save' button text to 'edit'

    updateStorage(); // update the local storage
    reset();
    /* resets the entire <ul> element. done to solve an issue 
    where the todo text value was disappearing on
     consecutive clicks on the edit button after saving
     */
  });
}

// make an editable input box
function makeEditable(list) {
  const label = list.childNodes[1]; // the current todo node in the <li> element
  const labelData = label.innerHTML; // current todo text
  list.removeChild(label); // removes the todo from the <ul>

  // creates a new textarea with the current todo text as default value
  const newInput = document.createElement("textarea");
  newInput.value = labelData;

  list.insertBefore(newInput, list.children[1]); // textarea appended to the <ul> in place of the previous todo text label

  list.childNodes[2].innerHTML = "Save"; // change 'edit; button text to 'save'
  return newInput; // returns the newly created textarea element.
}

// change mark-as-done (toggle checkbox). invoked when the checkbox is clicked
function changeStatus() {
  let id = this.parentNode.id; // <li> id
  const label = this.parentNode.childNodes[1]; // todo text label

  // if the checkbox has been checked set the 1st index of its array to true. otherwise set false. true -> mark as done
  if (this.parentNode.children[0].checked) {
    state[id][1] = true;
    label.setAttribute("style", "text-decoration:line-through;"); // strike-through if marked-as-done
  } else {
    state[id][1] = false;
    label.setAttribute("style", "text-decoration:none;"); // remove strike-through if unmarked/chekbox unchecked
  }
  updateStorage(); // update localStorage
}

// update the state object in the local storage
function updateStorage() {
  localStorage.removeItem("todos"); // delete the previous state object
  localStorage.setItem("todos", JSON.stringify(state)); // push the new state object
}

// create a button and return it
function createButton(label, onClick, style) {
  const btn = document.createElement("button");
  btn.innerHTML = label;
  btn.addEventListener("click", onClick);
  btn.setAttribute("style", style);

  return btn;
}
