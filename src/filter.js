function showTodos(placement) {
  console.log(state.showing);
  if (placement !== "append" && placement !== "prepend") throw new TypeError();
  const allTodos = state.all;
  const itemCount = state.all.length;
  if (itemCount === 0) {
    enableWindow();
    if (state.pointer != "all") showNoTodosFound(false);
    else showNoTodosFound();
    return;
  } else hideNoTodosFound();

  const show = state.showing;
  const from = show[0];
  let to = show[1];
  to = to < 0 ? -1 : to;

  to < 0 ? toggleLoadMoreDivVisibility(false) : toggleLoadMoreDivVisibility();

  try {
    for (var i = from; i > to; i--) {
      const todoDetails = allTodos[i];
      createdAt = todoDetails.createdAt.slice(0, 10);
      completedAt = todoDetails.completedAt;
      completedAt = completedAt ? completedAt.slice(0, 10) : completedAt;

      completedAtNode = completedAt
        ? getCompletedNode(createdAt, completedAt)
        : null;
      addNewHTMLElement(
        todoDetails.u_id,
        todoDetails.description,
        createdAt,
        todoDetails.completed,
        completedAtNode,
        placement
      );
    }
  } catch (e) {}
  enableWindow();
}

function loadMore() {
  if (state.showing[1] < 0) return;

  disableWindow();

  setTimeout(() => {
    const show = state.showing;
    const from = show[0] - 9;
    const to = show[1] - 9;
    setState("showing", [from, to]);
    showTodos("append");
  }, 950);
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
    resetCurrentlyShowing(state.all);

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
    resetCurrentlyShowing(state.all);

    setState("pointer", "incomplete");
    showTodos("append");
  }
}

async function showAll() {
  disableWindow();
  const len = searchBar.value.length;

  if (len >= 3) {
    await search(sanitizeString(searchBar.value));
  } else {
    loadTodos();
  }
}
