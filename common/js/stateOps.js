//updates/rewrites the state object
async function setState(key, value) {
  state[key] = value;
}

// copies the state object to localstorage
// function updateStorage() {
//   localStorage.setItem("todos", JSON.stringify(state));
// }

async function reset() {
  const allTodos = await getAll();
  setState("all", allTodos);
  //   updateStorage();
}

function modifyState(id, field, value) {
  for (let i = 0; i < state.all.length; i++) {
    if (state.all[i].u_id === id) {
      state.all[i][field] = value;
      break;
    }
  }
}

function filterCompleted() {
  const completed = state.all.filter((item) => {
    return item.completed === true;
  });
  state.completed = completed;
}

function filterIncomplete() {
  const incomplete = state.all.filter((item) => {
    return item.completed === false;
  });
  state.incomplete = incomplete;
}
