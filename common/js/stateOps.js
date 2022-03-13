//updates/rewrites the state object
async function setState(key, value) {
  state[key] = value;
}

async function reset() {
  const allTodos = await getAll();
  setState("all", allTodos);
  setState("pointer", "all");
}

// function modifyState(id, field, value) {
//   for (let i = 0; i < state.all.length; i++) {
//     if (state.all[i].u_id === id) {
//       state.all[i][field] = value;
//       break;
//     }
//   }
// }

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

function removefromState(id) {
  state.all = state.all.filter((item) => {
    return parseInt(item.u_id) != id;
  });
}

function reset_showing(obj) {
  const lastIdx = Object.keys(obj).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
}
