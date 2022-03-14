async function search(text) {
  disableWindow();
  removeAllChild(todoList);
  state.all = await searchByText(text);
  removeAllChild(todoList);
  reset_showing(state.all);
  showTodos("append");
  enableWindow();
}

async function resetSearch() {
  if (searchBar.value.length >= 3) return;
  disableWindow();
  removeAllChild(todoList);
  await reset();
  reset_showing(state.all);
  removeAllChild(todoList);
  showTodos("append");
  enableWindow();
}
