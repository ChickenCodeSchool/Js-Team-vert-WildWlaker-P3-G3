import { useEffect, useRef, useState } from "react";

import type { CreateFormProps } from "../../types/Events";

import "./CreateForm.css";

function CreateForm({ onClose }: CreateFormProps) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
  }); //etat et valeurs de titre, date, description et ville

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }; // met a jour l'etat et la valeur du champs modifier

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log("Nouvel événement :", form); // en attendant le fetch ca permet de vérifier dans la console si c'est bien pris en compte
    setForm({ title: "", date: "", description: "", location: "" });
    onClose();
  };

  const isFormValid =
    form.title && form.date && form.description && form.location; // indique qu'il faut les champs renseignés

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []); // le useRef et useEffect met directement le curseur dedans

  return (
    <>
      <div className="CreateForm-Body">
        <h2 className="CreateForm-Title" id="modal-title">
          Créez votre événement
        </h2>
        <div className="CreateForm-Field">
          <label className="CreateForm-Label" htmlFor="title">
            {/* htmlFor permet de mettre le curseur dans l'input quand on clique sur le nom du champs */}
            NOM DE VOTRE EVENEMENT
          </label>
          <input
            ref={inputRef}
            id="title"
            className="CreateForm-Input"
            type="text"
            name="title"
            placeholder="Ex : Festival de Jazz"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="CreateForm-Field">
          <label className="CreateForm-Label" htmlFor="date">
            DATE
          </label>
          <input
            id="date"
            className="CreateForm-Input"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="CreateForm-Field">
          <label className="CreateForm-Label" htmlFor="description">
            DESCRIPTION
          </label>
          <textarea
            id="description"
            className="CreateForm-TextArea"
            name="description"
            placeholder="Décrivez votre événement..."
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="CreateForm-Field">
          <label className="CreateForm-Label" htmlFor="location">
            LIEUX
          </label>
          <input
            id="location"
            className="CreateForm-Input"
            name="location"
            placeholder="Ex : Paris"
            value={form.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="CreateForm-Footer">
        <button
          type="button"
          className="CreateForm-ButtonCancel"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          type="button"
          className="CreateForm-ButtonSubmit"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Créer l'événement
        </button>
      </div>
    </>
  );
}

export default CreateForm;
