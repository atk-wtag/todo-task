function showTodos(placement) {
  if (placement !== "append" && placement !== "prepend") throw new TypeError();
  const pointer = state.pointer;
  const allTodos = state[pointer];

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
}

function loadMore() {
  const show = state.showing;
  const from = show[0] - 9;
  const to = show[1] - 9;
  setState("showing", [from, to]);
  showTodos("append");
}

function showCompleted() {
  removeAllChild(todoList);
  filterCompleted();
  setState("pointer", "completed");
  const completed = state.completed;
  const lastIdx = Object.keys(completed).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
  showTodos("append");
}

function showIncomplete() {
  removeAllChild(todoList);
  filterIncomplete();
  setState("pointer", "incomplete");
  const incomplete = state.incomplete;
  const lastIdx = Object.keys(incomplete).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
  showTodos("append");
}

function showAllTodos() {
  removeAllChild(todoList);
  setState("pointer", "all");
  const all = state.all;
  const lastIdx = Object.keys(all).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
  showTodos("append", all);
}
