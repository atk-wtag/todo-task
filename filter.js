function showTodos(placement) {
  if (placement !== "append" && placement !== "prepend") throw new TypeError();
  const allTodos = state.all;

  const show = state.showing;
  const from = show[0];
  let to = show[1];
  to = to < 0 ? -1 : to;

  for (var i = from; i > to; i--) {
    const todo_details = allTodos[i];
    created_at = todo_details.created_at.slice(0, 10);
    completed_at = todo_details.completed_at;
    completed_at = completed_at ? completed_at.slice(0, 10) : completed_at;

    completed_at_node = completed_at
      ? getCompletedNode(created_at, completed_at)
      : null;
    addNewHTMLElement(
      todo_details.u_id,
      todo_details.description,
      created_at,
      todo_details.completed,
      completed_at_node,
      placement
    );
  }
  enableWindow();
}

function loadMore() {
  disableWindow();
  const show = state.showing;
  const from = show[0] - 9;
  const to = show[1] - 9;
  setState("showing", [from, to]);
  showTodos("append");
}

async function showCompleted() {
  disableWindow();
  const len = searchBar.value.length;
  const obj =
    len >= 3
      ? await getCompletedwithSearchText(searchBar.value, true)
      : await getCompleted(true);

  if (obj.error) showToast(true);
  else {
    state.all = obj.data;
    showToast(false);
    removeAllChild(todoList);
    reset_showing(state.all);

    setState("pointer", "completed");
    showTodos("append");
  }
}

async function showIncomplete() {
  disableWindow();
  const len = searchBar.value.length;
  const obj =
    len >= 3
      ? await getCompletedwithSearchText(searchBar.value, false)
      : await getCompleted(false);

  if (obj.error) showToast(true);
  else {
    state.all = obj.data;
    showToast(false);
    removeAllChild(todoList);
    reset_showing(state.all);

    setState("pointer", "incomplete");
    showTodos("append");
  }
}

async function showAll() {
  disableWindow();
  const len = searchBar.value.length;

  const obj = len >= 3 ? await getAllwithText(searchBar.value) : await getAll();
  if (obj.error) showToast(true);
  else {
    state.all = obj.data;
    showToast(false);
    removeAllChild(todoList);
    reset_showing(state.all);

    setState("pointer", "all");
    showTodos("append");
  }
}
