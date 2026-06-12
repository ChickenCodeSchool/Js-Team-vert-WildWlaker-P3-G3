import { useState } from "react";

import type { CreateFormProps, EventData } from "../../types/Events";

import "./CreateForm.css";

function CreateForm({ onClose, onEventCreated }: CreateFormProps) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
  }); //etat et valeurs de titre, date, description et ville donc vide au depart

  const { id: user_id } = JSON.parse(localStorage.getItem("user") || "{}"); // --> recupere dans localstorage "user" l'id pour le passer en user_id

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomImage = async (): Promise<string> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/random-image`,
    );
    const data = await res.json();
    return `${import.meta.env.VITE_API_URL}${data.url}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    }));
  }; // met a jour l'etat et la valeur du champs modifier + met directement une majuscule dans tous les inputs

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const randomPicture = await getRandomImage();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: form.title,
          event_date: form.date,
          event_description: form.description,
          event_location: form.location,
          event_host_id: user_id,
          event_picture: randomPicture,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      const newEvent: EventData = await res.json();
      onEventCreated(newEvent);
      setForm({ title: "", date: "", description: "", location: "" });
      onClose();
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setIsLoading(false); //remet le bouton a son etat normal apres qu'il ait valider ou qu'il ait une erreur sinon le bouton resterai en valider et il ne pourrait plus cliquer dessus.
    }
  };

  const isFormValid =
    form.title && form.date && form.description && form.location; // indique qu'il faut les champs renseignés
  return (
    <>
      <div className="CreateForm-Body">
        <h2 className="CreateForm-Title" id="modal-title">
          Créez votre événement
        </h2>

        {error && <p className="CreateForm-Error">{error}</p>}

        <div className="CreateForm-Field">
          <label className="CreateForm-Label" htmlFor="title">
            {/* htmlFor permet de mettre le curseur dans l'input quand on clique sur le nom du champs */}
            NOM DE VOTRE EVENEMENT
          </label>
          <input
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
          disabled={isLoading}
        >
          Annuler
        </button>
        <button
          type="button"
          className="CreateForm-ButtonSubmit"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Création..." : "Créer l'événement"}
        </button>
      </div>
    </>
  );
}

export default CreateForm;
