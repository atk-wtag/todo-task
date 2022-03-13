async function search(text) {
  removeAllChild(todoList);
  state.all = await searchByText(text);
  removeAllChild(todoList);
  reset_showing(state.all);
  showTodos("append");
}

async function resetSearch() {
  if (searchBar.value.length >= 3) return;
  removeAllChild(todoList);
  await reset();
  reset_showing(state.all);
  removeAllChild(todoList);
  showTodos("append");
}
