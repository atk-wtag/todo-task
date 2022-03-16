async function search(text) {
  loadMoreDiv.style.setProperty("display", "none");
  disableWindow();
  removeAllChild(todoList);
  const obj = await searchByText(text);
  if (obj.error) {
    showToast(true);
  } else {
    state.all = obj.data;

    removeAllChild(todoList);
    reset_showing(state.all);
    showTodos("append");
    showToast(false);
  }
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
