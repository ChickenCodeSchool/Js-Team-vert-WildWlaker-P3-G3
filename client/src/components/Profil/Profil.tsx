import "./Profil.css";
import { Pencil } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { Camera } from "lucide-react";
import { ShieldUser, User } from "lucide-react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

function Profil() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const isAdminPage = location.pathname === "/admin";
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  useEffect(() => {
    fetch(`http://localhost:3310/api/users/${userId}/photo`)
      .then((res) => res.json())
      .then((data) => {
        setProfilePicture(data.user_profile_picture);
      });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3310/api/users/admin/${userId}`)
      .then((res) => res.json())
      .then((data) => setIsAdmin(Boolean(data.user_is_admin)))
      .catch((err) => console.error(err));
  }, [userId]);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleUploadPhoto() {
    if (!photo) {
      alert("Choisis une image");
      return;
    }

    if (!userId) {
      alert("Utilisateur introuvable");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    const response = await fetch(
      `http://localhost:3310/api/users/${userId}/photo`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    setProfilePicture(data.photoUrl);
    alert("Photo uploadée avec succès");
  }

  async function updateUserName(user_name: string, user_id: number) {
    if (!user_name.trim()) {
      setErrorMessage("Rentrer un pseudo");
      return;
    }

    try {
      setErrorMessage("");

      const response = await fetch(
        `http://localhost:3310/api/users/${user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name,
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      setUserName("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="profil">
      <button
        className="button"
        type="button"
        onClick={() => setIsMainModalOpen(true)}
      >
        <img
          src={`http://localhost:3310${profilePicture}`}
          alt="photo-profil"
        />
      </button>
      {isMainModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            setIsMainModalOpen(false);
            setActiveModal(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActiveModal(null);
            }
          }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveModal(null);
              }
            }}
          >
            <h2>Parametre du profil</h2>

            <button
              type="button"
              onClick={() => setActiveModal("Changer le pseudo")}
            >
              <Pencil size={15} />
              Changer le pseudo
            </button>

            {activeModal === "Changer le pseudo" && (
              <div className="change-pseudo">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Changer le nom"
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <button
                  type="button"
                  onClick={() => updateUserName(userName, userId)}
                >
                  Valider
                </button>
              </div>
            )}

            <button type="button" onClick={() => navigate("/changepassword")}>
              <LockKeyhole size={15} />
              Changer le mot de passe
            </button>

            <button
              type="button"
              onClick={() => setActiveModal("Changer la photo de profil")}
            >
              <Camera size={15} />
              Changer la photo de profil
            </button>

            {activeModal === "Changer la photo de profil" && (
              <div className="sub-modal">
                <label htmlFor="photo-upload" className="custom-upload">
                  Choisir une image
                </label>

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden-input"
                />
                {preview && (
                  <img src={preview} alt="preview" className="photo-preview" />
                )}
                <button type="button" onClick={handleUploadPhoto}>
                  Enregistrer la photo
                </button>
              </div>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={() => navigate(isAdminPage ? "/HomeEvents" : "/admin")}
              >
                {isAdminPage ? (
                  <>
                    <User size={15} />
                    Profil User
                  </>
                ) : (
                  <>
                    <ShieldUser size={15} />
                    Profil Admin
                  </>
                )}
              </button>
            )}
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
          </div>
        </div>
      )}
    </div>
  );
}
export default Profil;
