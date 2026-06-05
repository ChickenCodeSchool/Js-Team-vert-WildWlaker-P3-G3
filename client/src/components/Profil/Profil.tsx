import "./Profil.css";
import { Pencil } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { Camera } from "lucide-react";
import { ShieldUser } from "lucide-react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
function Profil() {
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <div className="profil">
      <button
        className="button"
        type="button"
        onClick={() => setIsMainModalOpen(true)}
      >
        <img src="#" alt="#" />
      </button>
      {isMainModalOpen && (
        <button
          type="button"
          className="modal-overlay"
          onClick={() => {
            setIsMainModalOpen(false);
            setActiveModal(null);
          }}
        >
          <button
            type="button"
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Parametre du profil</h2>

            {/* 3 boutons */}
            <button
              type="button"
              onClick={() => setActiveModal("Changer le pseudo")}
            >
              <Pencil size={15} />
              Changer le pseudo
            </button>

            {activeModal === "Changer le pseudo" && (
              <div className="sub-modal">
                <input type="text" placeholder="Nouveau pseudo" />
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveModal("Changer le mot de passe")}
            >
              <LockKeyhole size={15} />
              Changer le mot de passe
            </button>

            {activeModal === "Changer le mot de passe" && (
              <div className="sub-modal">
                <input type="text" placeholder="Changer le mot de passe" />
                <input type="text" placeholder="Valider le mot de passe" />
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveModal("Changer la photo de profil")}
            >
              <Camera size={15} />
              Changer la photo de profil
            </button>

            {activeModal === "Changer la photo de profil" && (
              <div className="sub-modal">
                <textarea />
              </div>
            )}

            <button type="button" onClick={() => navigate("/ProfilAdmin")}>
              <ShieldUser size={15} />
              Profil Admin
            </button>
            <button
              className="deconnexion-event"
              type="button"
              onClick={() => navigate("/HomeEvents")}
            >
              <LogOut size={15} />
              Déconnexion de l'évenement
            </button>
            <button
              className="fermer"
              type="button"
              onClick={() => {
                setIsMainModalOpen(false);
                setActiveModal(null);
              }}
            >
              Fermer
            </button>
          </button>
        </button>
      )}
    </div>
  );
}
export default Profil;
