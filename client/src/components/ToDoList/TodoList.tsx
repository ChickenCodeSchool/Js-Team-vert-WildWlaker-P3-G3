import { ListCheck, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./TodoList.css";

type Task = {
  todo_id: number;
  todo_name: string;
  todo_is_done: boolean;
};

const API_URL = import.meta.env.VITE_API_URL;

function TodoList(props: { eventUuid: string; todo_id_user: number }) {
  const eventUuid = props.eventUuid;
  const todo_id_user = props.todo_id_user;
  //deux states task qui contient les taches, setTask qui les met a jour. Pour la seconde state addTask c'est le string qui contient ce que l'utilisateur tape, setAddTask la met a jour.
  // editId garde l'id de la tache en cours d'édition, est null si aucune tache n'est éditée & editTask stock le texte modifié par l'utilisateur
  const [task, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  useEffect(() => {
    fetch(`${API_URL}/api/todo/${eventUuid}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data: Task[]) => {
        setTask(data);
      });
  }, [eventUuid]);

  async function handleAddTask() {
    //quand on clique sur '+' setTask crée un nouveau tableau avec toutes les taches qui existent et ajoute un nouvel objet Task qui a un id, un texte et un état false / setAddTask("") remet l'input à vide
    if (!addTask.trim()) return;
    // si l'input ne contient rien, on ne fait rien. C'est pour éviter d'envoyer une todo vide dans le backend.
    const response = await fetch(`${API_URL}/api/todo`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_uuid: eventUuid,
        todo_id_user: todo_id_user,
        todo_name: addTask,
        todo_deadline: null,
        todo_is_done: false,
      }),
    });

    const { insertId } = await response.json();
    setTask([
      ...task,
      { todo_id: insertId, todo_name: addTask, todo_is_done: false },
    ]);
    setAddTask("");
  }

  async function handleToggleTask(id: number) {
    // On cherche dans le tableau Task la todo dont l'id correspond à celui qu'on reçoit. On continue uniquement si on recup l'info. Donc on en a besoin pour récupérer todo_name qu'on envoie dans le backend via le fetch
    const t = task.find((t) => t.todo_id === id);
    if (!t) return;

    await fetch(`${API_URL}/api/todo/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo_id: id,
        todo_name: t.todo_name,
        todo_is_done: !t.todo_is_done,
      }),
    });
    // la fonction recoit l'id de la tache concernée. le state parcours le tableau avec le .map pour chaque taches et si l'id correspond alors ça inverse completed (true devient false etc) et si l'id ne correspond pas alors elle retourne la tache sans aucune modif
    setTask(
      task.map((t) => {
        if (t.todo_id === id) {
          return { ...t, todo_is_done: !t.todo_is_done };
        }
        return t;
      }),
    );
  }

  function handleEditTask(id: number, text: string) {
    // la fonction mémorise juste quelle tache on édite et quel est son texte actuel
    setEditId(id);
    setEditTask(text);
  }

  async function handleSaveTask() {
    // même raison que pour le handleToggleTask, on a besoin de todo_is_done pour tout envoyer vers le backend
    const t = task.find((t) => t.todo_id === editId);
    if (!t) return;

    await fetch(`${API_URL}/api/todo/${editId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo_id: editId,
        todo_name: editTask,
        todo_is_done: t.todo_is_done,
      }),
    });

    setTask(
      task.map((t) => {
        if (t.todo_id === editId) {
          return { ...t, todo_name: editTask };
        }
        return t;
      }),
    );
    setEditId(null);
  }

  async function handleDeleteTask(id: number) {
    await fetch(`${API_URL}/api/todo/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setTask(task.filter((t) => t.todo_id !== id));
  }

  return (
    <div className="todolist-global">
      <h3 className="todolist-title">
        <ListCheck size={20} />
        To-do list
      </h3>
      <div className="todolist-text">
        <input
          type="text"
          className="task-text"
          onChange={(e) => setAddTask(e.target.value)}
          value={addTask}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        {/*e = evenement déclanché par la frappe de l'utilisateur / e.target l'element html(dans l'input en gros) donc e.target.value c'est le texte qui vie dans l'input*/}
        <button type="button" className="task-add" onClick={handleAddTask}>
          <Plus size={16} />
        </button>
      </div>
      <ul className="task-item-ul">
        {task
          .sort((a, b) => Number(a.todo_is_done) - Number(b.todo_is_done))
          .map((t) => (
            <li key={t.todo_id} className="task-item-li">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={t.todo_is_done}
                onChange={() => handleToggleTask(t.todo_id)}
              />
              {editId === t.todo_id ? (
                <textarea
                  className="task-edit"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveTask()}
                />
              ) : (
                <span
                  className={`task-name ${t.todo_is_done ? "task-done" : ""}`}
                >
                  {t.todo_name}
                </span>
              )}

              <button
                type="button"
                className="task-edit-btn"
                onClick={() =>
                  editId === t.todo_id
                    ? handleSaveTask()
                    : handleEditTask(t.todo_id, t.todo_name)
                }
              >
                <Pencil size={12} />
              </button>
              <button
                type="button"
                className="task-trash"
                onClick={() => handleDeleteTask(t.todo_id)}
              >
                {" "}
                <Trash2 size={12} />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TodoList;
