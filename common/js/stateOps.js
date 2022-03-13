//updates/rewrites the state object
async function setState(key, value) {
  state[key] = value;
}

async function reset() {
  const allTodos = await getAll();
  setState("all", allTodos);
  setState("pointer", "all");
}

function reset_showing(obj) {
  const lastIdx = Object.keys(obj).length - 1;
  const firstIdx = lastIdx - 9;
  setState("showing", [lastIdx, firstIdx]);
}
