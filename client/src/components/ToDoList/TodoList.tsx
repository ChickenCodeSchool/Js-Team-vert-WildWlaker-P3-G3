import { useState } from "react";
import "TodoList.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function TodoList() {
  //deux states task qui contient les taches, setTask qui les met a jour.
  //la seconde state addTask c'est le string qui contient ce que l'utilisateur tape, setAddTask la met a jour.
  const [task, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState<string>("");

  function handleAddTask() {
    //quand on clique sur '+' setTask crée un nouveau tableau avec toutes les taches qui existent et ajoute un nouvel objet Task qui a un id, un texte et un état false / setAddTask("") remet l'input à vide
    setTask([...task, { id: Date.now(), text: addTask, completed: false }]);
    // Date.now() fonctionne en local en attendant de se brancher au backend
    setAddTask("");
  }

  function handleToggleTask(id: number) {
    // la fonction recoit l'id de la tache concernée. le state parcourt le tableau avec le .map pour chaque taches et si l'id correspond alors ça inverse completed (true devient false ect) et si l'id ne correspond pas alors elle retourne la tache sans aucune modif
    setTask(
      task.map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    );
  }

  return (
    <div className="todolist-global">
      <h2>todolist</h2>
      <input
        type="text"
        onChange={(e) => setAddTask(e.target.value)}
        value={addTask}
      />
      {/*e = evenement déclanché par la frappe de l'utilisataur / e.target l'element html(dans l'input en gros) donc e.target.value c'est le texte qui vie dans l'input*/}
      <button type="button" onClick={handleAddTask}>
        +
      </button>
      <ul>
        {task.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => handleToggleTask(t.id)}
            />
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
