const supabaseUrl = "https://vpmtafvtfkzjqayxfuhp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbXRhZnZ0Zmt6anFheXhmdWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDc3MDcsImV4cCI6MTk2MjIyMzcwN30.OICt9468g5WzqL0NAiyRttRjq3RCQA2vWllKh9yv0K4";

const database = supabase.createClient(supabaseUrl, supabaseKey);

async function create(u_id, desc) {
  try {
    const { data, error } = await database
      .from("todos")
      .insert([{ u_id: u_id, description: desc }]);
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function getAll() {
  try {
    const { data, error } = await database
      .from("todos")
      .select()
      .order("id", { ascending: true });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function deleteByID(id) {
  try {
    const { data, error } = await database
      .from("todos")
      .delete()
      .match({ u_id: id });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function updateByID(id, desc) {
  try {
    const { data, error } = await database
      .from("todos")
      .update({ description: desc })
      .match({ u_id: id });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function toggleCompleted(id, done, text) {
  try {
    const completedAt = done ? getCurrDate() : null;
    const updateObject = {
      completed: done,
      completedAt: completedAt,
    };
    text ? (updateObject.description = text) : null;
    const { data, error } = await database
      .from("todos")
      .update(updateObject)
      .match({ u_id: id });

    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function getCompleted(completed) {
  try {
    const { data, error } = await database
      .from("todos")
      .select()
      .match({ completed: completed })
      .order("id", { ascending: true });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function searchByText(text) {
  const searchKey = `%${text}%`;
  try {
    const { data, error } = await database
      .from("todos")
      .select()
      .ilike("description", searchKey)
      .order("id", { ascending: true });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function getCompletedwithSearchText(text, completed) {
  const searchKey = `%${text}%`;
  try {
    const { data, error } = await database
      .from("todos")
      .select()
      .match({ completed: completed })
      .ilike("description", searchKey)
      .order("id", { ascending: true });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}

async function getAllwithText(text) {
  const searchKey = `%${text}%`;
  try {
    const { data, error } = await database
      .from("todos")
      .select()
      .ilike("description", searchKey)
      .order("id", { ascending: true });
    return { data, error };
  } catch (err) {
    console.log(err);
    showToast(true);
  }
}
