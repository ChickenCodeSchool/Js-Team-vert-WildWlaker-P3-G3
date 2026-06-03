import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import "./TodoList.css";

type Task = {
  todo_id: number;
  todo_name: string;
  todo_is_done: boolean;
};

function TodoList() {
  //deux states task qui contient les taches, setTask qui les met a jour. Pour la seconde state addTask c'est le string qui contient ce que l'utilisateur tape, setAddTask la met a jour.
  // editId garde l'id de la tache en cours d'édition, est null si aucune tache n'est éditée & editTask stock le texte modifié par l'utilisateur
  const [task, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  function handleAddTask() {
    //quand on clique sur '+' setTask crée un nouveau tableau avec toutes les taches qui existent et ajoute un nouvel objet Task qui a un id, un texte et un état false / setAddTask("") remet l'input à vide
    setTask([
      ...task,
      { todo_id: Date.now(), todo_name: addTask, todo_is_done: false },
    ]);
    // Date.now() fonctionne en local en attendant de se brancher au backend
    setAddTask("");
  }

  function handleToggleTask(id: number) {
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

  function handleSaveTask() {
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

  function handleDeleteTask(id: number) {
    setTask(task.filter((t) => t.todo_id !== id));
  }

  return (
    <div className="todolist-global">
      <h2 className="todolist-title">To-do list</h2>
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
