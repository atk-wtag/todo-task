const supabaseUrl = "https://vpmtafvtfkzjqayxfuhp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbXRhZnZ0Zmt6anFheXhmdWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDc3MDcsImV4cCI6MTk2MjIyMzcwN30.OICt9468g5WzqL0NAiyRttRjq3RCQA2vWllKh9yv0K4";

const spConn = supabase.createClient(supabaseUrl, supabaseKey);

async function create(u_id, desc) {
  try {
    const { data, error } = await spConn
      .from("todos")
      .insert([{ u_id: u_id, description: desc }]);
    return { data, error };
  } catch (err) {
    console.log(err);
  }
}

async function getAll() {
  try {
    const { data, error } = await spConn
      .from("todos")
      .select()
      .order("id", { ascending: true });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteByID(id) {
  try {
    const { data, error } = await spConn
      .from("todos")
      .delete()
      .match({ u_id: id });
    return { data, error };
  } catch (err) {
    console.log(err);
  }
}

async function updateByID(id, desc) {
  try {
    const { data, error } = await spConn
      .from("todos")
      .update({ description: desc })
      .match({ u_id: id });
    return { data, error };
  } catch (err) {
    console.log(err);
  }
}

async function toggleCompleted(id, done) {
  try {
    const completed_at = done ? getCurrDate() : null;
    const { data, error } = await spConn
      .from("todos")
      .update({ completed: done, completed_at: completed_at })
      .match({ u_id: id });
    return { data, error };
  } catch (err) {
    console.log(err);
  }
}
