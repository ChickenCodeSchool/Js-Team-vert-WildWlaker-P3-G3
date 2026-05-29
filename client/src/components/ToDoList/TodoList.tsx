import { useState } from "react";
import "TodoList.css";

type Task = {
  todo_id: number;
  todo_name: string;
  todo_is_done: boolean;
};

function TodoList() {
  //deux states task qui contient les taches, setTask qui les met a jour.
  //la seconde state addTask c'est le string qui contient ce que l'utilisateur tape, setAddTask la met a jour.
  const [task, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState<string>("");

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

  return (
    <div className="todolist-global">
      <h2>Todo List</h2>
      <input
        type="text"
        onChange={(e) => setAddTask(e.target.value)}
        value={addTask}
      />
      {/*e = evenement déclanché par la frappe de l'utilisateur / e.target l'element html(dans l'input en gros) donc e.target.value c'est le texte qui vie dans l'input*/}
      <button type="button" onClick={handleAddTask}>
        +
      </button>
      <ul>
        {task.map((t) => (
          <li key={t.todo_id}>
            <input
              type="checkbox"
              checked={t.todo_is_done}
              onChange={() => handleToggleTask(t.todo_id)}
            />
            {t.todo_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
