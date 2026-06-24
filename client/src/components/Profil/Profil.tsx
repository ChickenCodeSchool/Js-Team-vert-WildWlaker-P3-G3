import "./Profil.css";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { Camera } from "lucide-react";
import { ShieldUser, User } from "lucide-react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";

function Profil() {
  const navigate = useNavigate();
  const location = useLocation();
  const noneDeconnexion = location.pathname.startsWith("/homeevents");
  const [userName, setUserName] = useState("");
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    setPhoto(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      <AnimatePresence>
        {isMainModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setIsMainModalOpen(false);
              setActiveModal(null);
            }}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
            >
              <h2>Parametre du profil</h2>

              <img
                src={`http://localhost:3310${profilePicture}`}
                alt="photo-profil"
              />

              <button
                type="button"
                onClick={() => setActiveModal("Changer le pseudo")}
              >
                <Pencil size={15} />
                Changer le pseudo
              </button>

              <AnimatePresence>
                {activeModal === "Changer le pseudo" && (
                  <motion.div
                    className="change-pseudo"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <input
                      ref={fileInputRef}
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
                  </motion.div>
                )}
              </AnimatePresence>

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

              <AnimatePresence>
                {activeModal === "Changer la photo de profil" && (
                  <motion.div
                    className="sub-modal"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
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
                      <img
                        src={preview}
                        alt="preview"
                        className="photo-preview"
                      />
                    )}

                    <button type="button" onClick={handleUploadPhoto}>
                      Enregistrer la photo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(isAdminPage ? "/homeevents" : "/admin")
                  }
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
                className={
                  noneDeconnexion ? "deconnexion-none" : "deconnexion-event"
                }
                type="button"
                onClick={() => navigate("/homeevents")}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Profil;
