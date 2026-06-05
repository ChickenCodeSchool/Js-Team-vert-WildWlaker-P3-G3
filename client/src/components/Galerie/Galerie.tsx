import "./Galerie.css";

import { useEffect, useState } from "react";

import { ImagePlus, Trash2 } from "lucide-react";

import GalleryModal from "./GalleryModal";

import { getGallery } from "../../services/galleryService";

type Gallery = {
  gallery_id: number;
  gallery_id_event: number;
  gallery_id_user: number;
  gallery_link: string;
  gallery_description: string | null;
  gallery_creation_date: string | null;
};

function Galerie() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);

  const [photos, setPhotos] = useState<Gallery[]>([]);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await getGallery(2);

        setPhotos(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadGallery();
  }, []);

  const handleAddPhoto = (imageUrl: string) => {
    setPhotos((currentPhotos) => [
      {
        gallery_id: Date.now(),
        gallery_id_event: 1,
        gallery_id_user: 1,
        gallery_link: imageUrl,
        gallery_description: "Photo ajoutée",
        gallery_creation_date: null,
      },
      ...currentPhotos,
    ]);

    setIsModalOpen(false);
  };

  const confirmDeletePhoto = () => {
    if (photoToDelete === null) {
      return;
    }

    setPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => photo.gallery_id !== photoToDelete),
    );

    setPhotoToDelete(null);
  };

  return (
    <section className="galerie">
      <div className="galerie-header">
        <h1>Nom de l'événement</h1>

        <button
          type="button"
          className="galerie-button"
          onClick={() => setIsModalOpen(true)}
        >
          <ImagePlus size={18} />
          Ajouter une photo
        </button>
      </div>

      <div className="galerie-grid" aria-label="Galerie de l'événement">
        {photos.map((photo) => (
          <article key={photo.gallery_id} className="galerie-item">
            <img
              src={photo.gallery_link}
              alt={photo.gallery_description ?? "Photo de la galerie"}
              className="photo"
            />

            <button
              type="button"
              className="delete-button"
              onClick={() => setPhotoToDelete(photo.gallery_id)}
            >
              <Trash2 size={18} />
            </button>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <GalleryModal
          onClose={() => setIsModalOpen(false)}
          onAddPhoto={handleAddPhoto}
        />
      )}

      {photoToDelete !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Supprimer cette photo ?</h2>

            <p>Cette action est irréversible.</p>

            <div className="modal-actions">
              <button type="button" onClick={() => setPhotoToDelete(null)}>
                Annuler
              </button>

              <button type="button" onClick={confirmDeletePhoto}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Galerie;
