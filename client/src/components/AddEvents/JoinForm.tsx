import { useEffect, useRef, useState } from "react";

import type { JoinFormProps } from "../../types/Events";

function JoinForm({ onClose }: JoinFormProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ca empeche de recharger la page quand on clique
    // console.log("Code pour rejoindre :", code); // en attendant le fetch ca permet de vérifier dans la console si c'est bien pris en compte
    setCode(""); // ca remet le code a zero
    onClose(); // ca ferme le modal
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []); // le useRef et useEffect met directement le curseur dans le champs

  return (
    <>
      <div className="JoinForm-Body">
        <div className="JoinForm-Field">
          <label className="JoinForm-Label" htmlFor="code">
            Code de l'événement
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
          <span className="JoinForm-Hint">
            Entrez le code partagé par l'organisateur.
          </span>
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
        <button
          type="button"
          className="JoinForm-ButtonSubmit"
          onClick={handleSubmit}
          disabled={!code.trim()}
        >
          Rejoindre
        </button>
      </div>
    </>
  );
}

export default JoinForm;
