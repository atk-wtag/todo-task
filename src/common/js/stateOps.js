//updates/rewrites the state object
async function setState(key, value) {
  state[key] = value;
}

async function reset() {
  const allTodos = await getAll();
  const data = allTodos.data;
  const error = allTodos.error;

  setState("all", data);

  if (data.length === 0) {
    setTimeout(() => {
      preloader.remove();
      enableWindow();
      showNoTodosFound(true, `You haven't added any task. Please, add one`);
    }, 1000);
  } else {
    hideNoTodosFound();
  }
}

function resetCurrentlyShowing(obj) {
  const lastIdx = Object.keys(obj).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
}

async function removeById(id) {
  state.all = await state.all.filter((item) => {
    return parseInt(item.u_id) != id;
  });
}

async function modifyState(id, field, value) {
  for (let i = 0; i < state.all.length; i++) {
    if (parseInt(state.all[i].u_id) == id) {
      state.all[i][field] = value;
      break;
    }
  }
}
