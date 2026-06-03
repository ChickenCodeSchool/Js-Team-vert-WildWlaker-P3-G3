import { useEffect, useRef, useState } from "react";

import type { ModalAddEventProps } from "../../types/Events";

import CreateForm from "./CreateForm";
import JoinForm from "./JoinForm";

import "./ModalAddEvent.css";

type Tab = "create" | "join"; // deux onglet creer et joindre

function ModalAddEvent({ isOpen, onClose }: ModalAddEventProps) {
  const [activeTab, setActiveTab] = useState<Tab>("create"); // met le modal directement sur l'onglet creer un evenement

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]); //le const dialogRef et le useEffect indique que si on ouvre le modal ca l'affiche sinon il est fermé

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  }; // quand tu clique en dehors du modal ca le ferme

  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (
      (e.key === "Escape" || e.key === "Enter") &&
      e.target === e.currentTarget
    )
      onClose();
  }; // pareil avec echap et entrer

  return (
    <dialog
      ref={dialogRef}
      className="ModalAddEvent-Backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      aria-labelledby="modal-title"
    >
      {" "}
      {/* la balise dialog est faite expres pour le modal 
      aria indique pour les personnes non voyante que c'est un modal avec le titre (pour le referencement et l'accessibilité) */}
      <div className="ModalAddEvent-Global">
        <div className="ModalAddEvent-Header">
          <h2 className="ModalAddEvent-Title" id="modal-title">
            Créer un événement
          </h2>
          <button
            type="button"
            className="ModalAddEvent-Close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="ModalAddEvent-Tabs">
          <button
            type="button"
            className={`ModalAddEvent-Tab ${activeTab === "create" ? "ModalAddEvent-Tab--active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Créer un événement
          </button>
          <button
            type="button"
            className={`ModalAddEvent-Tab ${activeTab === "join" ? "ModalAddEvent-Tab--active" : ""}`}
            onClick={() => setActiveTab("join")}
          >
            Rejoindre un événement
          </button>
        </div>

        {activeTab === "create" ? (
          <CreateForm onClose={onClose} />
        ) : (
          <JoinForm onClose={onClose} />
        )}
      </div>
    </dialog>
  );
}

export default ModalAddEvent;
