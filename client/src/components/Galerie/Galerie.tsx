import "./Galerie.css";

import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import GalleryModal from "./GalleryModal";

const API_URL = import.meta.env.VITE_API_URL;

type Gallery = {
  gallery_id: number;
  gallery_id_event: number;
  gallery_id_user: number;
  gallery_link: string;
  gallery_description: string | null;
  gallery_creation_date: string | null;
  event_host_id: number;
};

function Galerie() {
  const currentUser = JSON.parse(localStorage.getItem("user") || '{"id": 0}');

  const [eventHostId, setEventHostId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Gallery[]>([]);

  const [photoToEdit, setPhotoToEdit] = useState<Gallery | null>(null);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gallery/2`);

        const data = await response.json();

        setPhotos(data);

        if (data.length > 0 && data[0].event_host_id) {
          setEventHostId(data[0].event_host_id);
        }
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
        gallery_id_event: 2,
        gallery_id_user: currentUser.id,
        gallery_link: imageUrl,
        gallery_description: "Ajout galerie",
        gallery_creation_date: null,
        event_host_id: eventHostId ?? 0,
      } as Gallery,
      ...currentPhotos,
    ]);

    setIsModalOpen(false);
  };

  const confirmDeletePhoto = async () => {
    if (photoToDelete === null) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/gallery/${photoToDelete}/${currentUser.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setPhotos((currentPhotos) =>
          currentPhotos.filter((photo) => photo.gallery_id !== photoToDelete),
        );
        console.log("Photo supprimée avec succès !");
      } else {
        console.error("Le serveur a refusé de supprimer la photo.");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API :", error);
    } finally {
      setPhotoToDelete(null);
    }
  };

  const handleUpdateDescription = async () => {
    if (!photoToEdit) return;

    try {
      const response = await fetch(
        `${API_URL}/api/gallery/${photoToEdit.gallery_id}/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ gallery_description: newDescription }),
        },
      );

      if (response.ok) {
        setPhotos((currentPhotos) =>
          currentPhotos.map((photo) =>
            photo.gallery_id === photoToEdit.gallery_id
              ? { ...photo, gallery_description: newDescription }
              : photo,
          ),
        );
        setPhotoToEdit(null);
        console.log("Description mise à jour en BDD avec succès !");
      } else {
        console.error("Le serveur a refusé la modification.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const formatImageUrl = (link: string) => {
    if (!link) return "";
    return link.startsWith("http") ? link : `${API_URL}${link}`;
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
        {photos.map((photo) => {
          const estAuteur = photo.gallery_id_user === currentUser.id;
          const estHoteEvenement = currentUser.id === eventHostId;
          const aLeDroitDeModifier = estAuteur || estHoteEvenement;

          return (
            <article key={photo.gallery_id} className="galerie-item">
              <button
                type="button"
                className="photo-button"
                onClick={() => setSelectedPhoto(photo.gallery_link)}
              >
                <img
                  src={formatImageUrl(photo.gallery_link)}
                  alt={photo.gallery_description ?? "Galerie événement"}
                  className="photo"
                />
              </button>

              <p className="photo-description">
                {photo.gallery_description ?? "Aucune description"}
              </p>

              {aLeDroitDeModifier && (
                <div className="photo-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => {
                      setPhotoToEdit(photo);
                      setNewDescription(photo.gallery_description ?? "");
                    }}
                    aria-label="Modifier la description"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => setPhotoToDelete(photo.gallery_id)}
                    aria-label="Supprimer la photo"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {isModalOpen && (
        <GalleryModal
          onClose={() => setIsModalOpen(false)}
          onAddPhoto={handleAddPhoto}
          eventId={2}
          userId={currentUser.id}
        />
      )}

      {photoToEdit !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Modifier la description</h2>
            <p>Donnez une nouvelle légende à votre image :</p>

            <input
              type="text"
              className="modal-input"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Écrivez ici..."
            />

            <div className="modal-actions">
              <button type="button" onClick={() => setPhotoToEdit(null)}>
                Annuler
              </button>
              <button type="button" onClick={handleUpdateDescription}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
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

      {selectedPhoto && (
        <div className="image-modal-overlay">
          <button
            type="button"
            className="overlay-close"
            aria-label="Fermer l'aperçu"
            onClick={() => setSelectedPhoto(null)}
          />

          <img
            src={formatImageUrl(selectedPhoto)}
            alt="Agrandissement"
            className="image-modal"
          />
        </div>
      )}
    </section>
  );
}

export default Galerie;
