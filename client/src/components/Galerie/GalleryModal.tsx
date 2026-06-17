import "./GalleryModal.css";

import { useState } from "react";

type GalleryModalProps = {
  onClose: () => void;
  onAddPhoto: (imageUrl: string, insertId: number) => void;
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
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("gallery_id_event", eventId.toString());
      formData.append("gallery_id_user", userId.toString());

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || "Une erreur est survenue lors de l'envoi.",
        );
        return;
      }

      const data = await response.json();

      onAddPhoto(data.photoUrl, data.insertId);
      onClose();
    } catch (error) {
      console.error(error);
      setError("Impossible de contacter le serveur.");
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

        {error && (
          <p className="error-message" style={{ color: "red" }}>
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
