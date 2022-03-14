//updates/rewrites the state object
async function setState(key, value) {
  state[key] = value;
}

async function reset() {
  const allTodos = await getAll();
  const data = allTodos.data;
  const error = allTodos.error;

  if (data.length === 0) {
    setTimeout(() => {
      preloader.remove();
      main_div.style.setProperty("display", "block");
      no_todos.style.setProperty("display", "block");
      loadMoreDiv.style.setProperty("display", "none");
      incompleteBtn.setAttribute("disabled", true);
      completedBTn.setAttribute("disabled", true);
      allBtn.setAttribute("disabled", true);
      searchBtn.setAttribute("disabled", true);
    }, 1000);
    return;
  }
  setState("all", allTodos.data);
}

function reset_showing(obj) {
  const lastIdx = Object.keys(obj).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
}
