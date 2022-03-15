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
      showNoTodosFound();
    }, 1000);
  } else {
    hideNoTodosFound();
  }
}

function reset_showing(obj) {
  const lastIdx = Object.keys(obj).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
}
