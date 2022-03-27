async function search(text) {
  prepareWindowForSearch();
  setState("pointer", "all");

  const obj = await searchByText(text);
  if (obj.error) {
    showToast(true);
  } else {
    state.all = obj.data;

    resetSearchWindow();

    showTodos("append");
    showToast(false);
  }
  enableWindow();
}

async function resetSearch() {
  if (searchBar.value.length >= 3) return;

  prepareWindowForSearch();

  setState("pointer", "all");
  await reset();

  resetSearchWindow();

  showTodos("append");
  enableWindow();
}

function prepareWindowForSearch() {
  disableWindow();
  toggleLoadMoreDivVisibility(false);
  removeAllChild(todoList);
}

function resetSearchWindow() {
  resetCurrentlyShowing(state.all);
  removeAllChild(todoList);
}
