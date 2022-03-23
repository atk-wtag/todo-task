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
    resetCurrentlyShowing(state.all);
    showTodos("append");
    showToast(false);
  }
  enableWindow();
}

async function resetSearch() {
  if (searchBar.value.length >= 3) return;
  disableWindow();
  loadMoreDiv.style.setProperty("display", "none");
  removeAllChild(todoList);
  await reset();
  resetCurrentlyShowing(state.all);
  removeAllChild(todoList);
  showTodos("append");
  enableWindow();
}
