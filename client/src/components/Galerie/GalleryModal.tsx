import "./GalleryModal.css";

import { useState } from "react";

type GalleryModalProps = {
  onClose: () => void;
  onAddPhoto: (imageUrl: string) => void;
};

function GalleryModal({ onClose, onAddPhoto }: GalleryModalProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Seuls les formats JPG, PNG et WEBP sont autorisés.");

      setPreview(null);

      return;
    }

    setError("");

    setPreview(URL.createObjectURL(file));
  };

  const handleAddClick = () => {
    if (!preview) {
      return;
    }

    onAddPhoto(preview);
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

        {error && <p className="error-message">{error}</p>}

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
