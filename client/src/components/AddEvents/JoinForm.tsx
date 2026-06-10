import { useEffect, useRef, useState } from "react";

import type { EventData, JoinFormProps } from "../../types/Events";

import "./JoinForm.css";

function JoinForm({ onClose, onEventCreated }: JoinFormProps) {
  const [code, setCode] = useState("");
  const { id: user_id } = JSON.parse(localStorage.getItem("user") || "{}");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []); // le useRef et useEffect met directement le curseur dans le champs

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_link_key: code.trim().toUpperCase(),
            user_id,
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const newEvent: EventData = await res.json();
      onEventCreated(newEvent);
      setCode("");
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="JoinForm-Body">
        <h2 className="JoinForm-Title" id="modal-title">
          Rejoingnez un événement
        </h2>
        <div className="JoinForm-Field">
          <label className="JoinForm-Label" htmlFor="code">
            Pour rejoindre un événement, veuillez renseigner le code événement
            partagé par l'organisateur.
          </label>
          <input
            ref={inputRef}
            id="code"
            className="JoinForm-Input JoinForm-Input--code"
            type="text"
            name="code"
            placeholder="Ex : ABC123"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6} // limite a 6 caracteres
          />
        </div>
      </div>
      <div className="JoinForm-Footer">
        <button
          type="button"
          className="JoinForm-ButtonCancel"
          onClick={onClose}
        >
          Annuler
        </button>
        {error && <p className="JoinForm-Error">{error}</p>}
        <button
          type="button"
          className="JoinForm-ButtonSubmit"
          onClick={handleSubmit}
          disabled={!code.trim() || isLoading}
        >
          {isLoading ? "Vérification..." : "Rejoindre"}
        </button>
      </div>
    </>
  );
}

export default JoinForm;
