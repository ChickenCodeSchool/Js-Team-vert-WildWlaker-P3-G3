import "./GalleryModal.css";

import { useState } from "react";

type GalleryModalProps = {
  onClose: () => void;
  onAddPhoto: (imageUrl: string, insertId: number, description: string) => void;
  eventId: number;
  userId: number;
};

function GalleryModal({
  onClose,
  onAddPhoto,
  eventId,
  userId,
}: GalleryModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Seuls les formats JPG, PNG et WEBP sont autorisés.");
      setPreview(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddClick = async () => {
    if (!selectedFile) return;

    try {
      setError("");

      const formData = new FormData();

      formData.append("gallery_id_event", eventId.toString());
      formData.append("gallery_id_user", userId.toString());
      formData.append("gallery_description", description);

      formData.append("photo", selectedFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Erreur serveur interne." }));
        setError(
          errorData.message || "Une erreur est survenue lors de l'envoi.",
        );
        return;
      }

      const data = await response.json();
      onAddPhoto(data.photoUrl, data.insertId, description);
      onClose();
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Impossible de joindre le serveur. Vérifiez votre connexion.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ajouter une photo</h2>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
        />

        <input
          type="text"
          placeholder="Ajouter une description (optionnel)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginTop: "0.5rem", width: "100%", padding: "0.4rem" }}
        />

        {error && (
          <p
            className="error-message"
            style={{ color: "red", marginTop: "0.5rem" }}
          >
            {error}
          </p>
        )}

        {preview && (
          <img src={preview} alt="Prévisualisation" className="preview-image" />
        )}

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Fermer
          </button>

          <button type="button" onClick={handleAddClick} disabled={!preview}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;
