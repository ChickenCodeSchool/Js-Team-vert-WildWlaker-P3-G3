import { useState } from "react";

import type { CreateFormProps, EventData } from "../../types/Events";

import "./CreateForm.css";

function CreateForm({ onClose, onEventCreated }: CreateFormProps) {
  const [form, setForm] = useState({
    title: "",
    dateStart: "",
    dateEnd: "",
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
    const formatted =
      name === "dateStart" || name === "dateEnd"
        ? value
        : value.charAt(0).toUpperCase() + value.slice(1);
    setForm((prev) => ({ ...prev, [name]: formatted }));
  }; // met directement une majuscule dans tous les inputs mais exclu dateStart et dateEnd

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
          event_date_start: form.dateStart,
          event_date_end: form.dateEnd,
          event_description: form.description,
          event_location: form.location,
          event_host_id: user_id,
          event_picture: randomPicture,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      const newEvent: EventData = await res.json();
      onEventCreated(newEvent);
      setForm({
        title: "",
        dateStart: "",
        dateEnd: "",
        description: "",
        location: "",
      });
      onClose();
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setIsLoading(false); //remet le bouton a son etat normal apres qu'il ait valider ou qu'il ait une erreur sinon le bouton resterai en valider et il ne pourrait plus cliquer dessus.
    }
  };

  const isFormValid =
    form.title &&
    form.dateStart &&
    form.dateEnd &&
    form.description &&
    form.location; // indique qu'il faut les champs renseignés
  return (
    <>
      <main className="CreateForm-Body">
        <h2 className="CreateForm-Title" id="modal-title">
          Créez votre événement
        </h2>

        {error && <p className="CreateForm-Error">{error}</p>}

        <form className="CreateForm-Field">
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
        </form>

        <form className="CreateForm-Field">
          <article className="CreateForm-DateGlobal">
            <aside className="CreateForm-Date">
              <label className="CreateForm-Label" htmlFor="date">
                DATE DE DEBUT
              </label>
              <input
                id="date"
                className="CreateForm-DateInput"
                type="date"
                name="dateStart"
                value={form.dateStart}
                onChange={handleChange}
              />
            </aside>
            <aside className="CreateForm-Date">
              <label className="CreateForm-Label" htmlFor="date">
                DATE DE FIN
              </label>
              <input
                id="date"
                className="CreateForm-DateInput"
                type="date"
                name="dateEnd"
                value={form.dateEnd}
                onChange={handleChange}
              />
            </aside>
          </article>
        </form>

        <form className="CreateForm-Field">
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
        </form>

        <form className="CreateForm-Field">
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
        </form>
      </main>

      <footer className="CreateForm-Footer">
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
      </footer>
    </>
  );
}

export default CreateForm;
