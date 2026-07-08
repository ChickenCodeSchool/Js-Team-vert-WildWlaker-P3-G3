import { useEffect, useRef, useState } from "react";

import type { ModalAddEventProps } from "../../types/Events";

import CreateForm from "./CreateForm";
import JoinForm from "./JoinForm";

import "./ModalAddEvent.css";

type Tab = "create" | "join"; // deux onglet creer et joindre

function ModalAddEvent({
  isOpen,
  onClose,
  onEventCreated,
}: ModalAddEventProps) {
  const [activeTab, setActiveTab] = useState<Tab>("create"); // met le modal directement sur l'onglet creer un evenement

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      const firstInput = dialogRef.current?.querySelector("input");
      firstInput?.focus(); // --> met le focus sur le 1er input pour taper directement dans le modal
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]); //le const dialogRef et le useEffect indique que si on ouvre le modal ca l'affiche sinon il est fermé

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  }; // quand tu clique en dehors du modal ca le ferme

  return (
    <dialog
      ref={dialogRef}
      className="ModalAddEvent-Backdrop"
      onClick={handleBackdropClick}
      onKeyUp={() => {}}
      onCancel={onClose}
      aria-labelledby="modal-title"
    >
      {" "}
      {/* la balise dialog est faite expres pour le modal 
      aria indique pour les personnes non voyante que c'est un modal avec le titre (pour le referencement et l'accessibilité) */}
      <div className="ModalAddEvent-Global">
        <div className="ModalAddEvent-Tabs">
          <button
            type="button"
            role="tab"
            id="tab-create"
            aria-selected={activeTab === "create"}
            aria-controls="panel-create"
            className={`ModalAddEvent-Tab ${activeTab === "create" ? "ModalAddEvent-Tab--active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Créer un événement
          </button>
          <button
            type="button"
            role="tab"
            id="tab-join"
            aria-selected={activeTab === "join"}
            aria-controls="panel-join"
            className={`ModalAddEvent-Tab ${activeTab === "join" ? "ModalAddEvent-Tab--active" : ""}`}
            onClick={() => setActiveTab("join")}
          >
            Rejoindre un événement
          </button>
        </div>
        {activeTab === "create" ? (
          <div role="tabpanel" id="panel-create" aria-labelledby="tab-create">
            <CreateForm onClose={onClose} onEventCreated={onEventCreated} />
          </div>
        ) : (
          <div role="tabpanel" id="panel-join" aria-labelledby="tab-join">
            <JoinForm onClose={onClose} onEventCreated={onEventCreated} />
          </div>
        )}
      </div>
    </dialog>
  );
}

export default ModalAddEvent;
