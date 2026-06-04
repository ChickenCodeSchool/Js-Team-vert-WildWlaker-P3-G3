/*
  // Le composant ne fait jamais de fetch directement on gère toute la communication avec le backend.

const API_URL = import.meta.env.VITE_API_URL;

export type Task = {
  todo_id: number;
  todo_id_event: number;
  todo_id_user: number;
  todo_name: string;
  todo_creation_date: string | null;
  todo_deadline: string | null;
  todo_is_done: boolean;
};

// GET /api/todo/:eventId / on récupère toutes les todos d'un événement
export async function fetchTodos(eventId: number): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/todo/${eventId}`);
  return response.json();
}

// POST /api/todo / on crée une nouvelle todo qui retourne l'objet 2.0 avec insertId
export async function createTodo(
  eventId: number,
  todo_name: string,
  todo_id_user: number,
): Promise<{ insertId: number }> {
  const response = await fetch(`${API_URL}/api/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo_id_event: eventId,
      todo_id_user,
      todo_name,
      todo_deadline: null,
      todo_is_done: false,
    }),
  });
  return response.json();
}

// PUT /api/todo/:todo_id / on met à jour le nom & || l'état d'une todo
export async function updateTodo(
  todo_id: number,
  todo_name: string,
  todo_is_done: boolean,
): Promise<void> {
  await fetch(`${API_URL}/api/todo/${todo_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo_id, todo_name, todo_is_done }),
  });
}

// DELETE /api/todo/:todo_id / on supprime une todo par son id
export async function deleteTodo(todo_id: number): Promise<void> {
  await fetch(`${API_URL}/api/todo/${todo_id}`, {
    method: "DELETE",
  });
}

// À garder comme référence car le pattern est toujours le même :
// -Une fonction par action CRUD
// -fetch + méthode HTTP + headers JSON pour POST/PUT
// -Le composant importe ces fonctions et ne touche jamais à fetch directement
*/
