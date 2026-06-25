import "./Galerie.css";

import { ImagePlus, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import GalleryModal from "./GalleryModal";

const API_URL = import.meta.env.VITE_API_URL;

type User = {
  id: number;
};

type Gallery = {
  gallery_id: number;
  gallery_id_event: number;
  gallery_id_user: number;
  gallery_link: string;
  gallery_description: string | null;
  gallery_creation_date: string | null;
  event_host_id: number;
};

const getUserFromStorage = (): User => {
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      return { id: parsed.id ?? 0 };
    }
    return { id: 0 };
  } catch {
    return { id: 0 };
  }
};

function Galerie() {
  const segments = window.location.pathname.split("/");
  const id = segments[segments.indexOf("galerie") - 1] || segments[2];

  const currentUser = getUserFromStorage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Gallery[]>([]);
  const [eventName, setEventName] = useState<string>("Chargement...");
  const [photoToEdit, setPhotoToEdit] = useState<Gallery | null>(null);
  const [newDescription, setNewDescription] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [userInEvent, setUserInEvent] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      const response = await fetch(
        `${API_URL}/api/user-in-event/${id}/${currentUser.id}`,
      );
      const data = await response.json();
      setUserInEvent(data.joined);
    };
    fetchTest();

    const controller = new AbortController();

    const loadGalleryAndEvent = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const galleryResponse = await fetch(`${API_URL}/api/gallery/${id}`, {
          signal: controller.signal,
        });

        if (galleryResponse.ok) {
          const galleryData = await galleryResponse.json();
          setPhotos(galleryData);
        } else {
          setError("Impossible de charger la galerie.");
        }

        try {
          const eventResponse = await fetch(`${API_URL}/api/events/${id}`, {
            signal: controller.signal,
          });

          if (eventResponse.ok) {
            const eventData = await eventResponse.json();
            setEventName(eventData.event_name || "Mon Événement");
          } else {
            setEventName("Mon Événement");
          }
        } catch (e) {
          if ((e as Error).name !== "AbortError") {
            setEventName("Mon Événement");
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Erreur générale de chargement :", err);
          setError("Erreur lors du chargement des données.");
          setEventName("Mon Événement");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryAndEvent();

    return () => controller.abort();
  }, [id, currentUser]);

  const handleAddPhoto = (imageUrl: string, insertId: number) => {
    setPhotos((currentPhotos) => [
      {
        gallery_id: insertId,
        gallery_id_event: Number(id),
        gallery_id_user: currentUser.id,
        gallery_link: imageUrl,
        gallery_description: "Ajout galerie",
        gallery_creation_date: new Date().toISOString(),
        event_host_id: currentPhotos[0]?.event_host_id ?? 0,
      },
      ...currentPhotos,
    ]);

    setIsModalOpen(false);
    setError(null);
  };

  const confirmDeletePhoto = async () => {
    if (photoToDelete === null) return;

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
        setError(null);
      } else {
        setError("Impossible de supprimer la photo.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setError("Erreur réseau lors de la suppression.");
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
        setError(null);
      } else {
        setError("Impossible de modifier la description.");
      }
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
      setError("Erreur réseau lors de la modification.");
    }
  };

  const formatImageUrl = (link: string): string => {
    if (!link) return "";
    return link.startsWith("http") ? link : `${API_URL}${link}`;
  };

  const dismissError = () => setError(null);

  if (userInEvent === null) {
    return <p>Chargement...</p>;
  }

  if (userInEvent === false) {
    return <p>Vous n'êtes pas inscrit à cet événement.</p>;
  }

  return (
    <section className="galerie">
      <div className="galerie-header">
        <h1>{eventName}</h1>

        <button
          type="button"
          className="galerie-button"
          onClick={() => setIsModalOpen(true)}
        >
          <ImagePlus size={20} />
          Ajouter une photo
        </button>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="error-dismiss"
            onClick={dismissError}
            aria-label="Fermer le message d'erreur"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading-indicator">
          <p>Chargement de la galerie...</p>
        </div>
      )}

      {!isLoading && photos.length === 0 && !error && (
        <div className="galerie-empty">
          <p>Aucune photo dans cette galerie. Ajoutez-en une !</p>
        </div>
      )}

      {!isLoading && photos.length > 0 && (
        <div className="galerie-grid" aria-label="Galerie de l'événement">
          {photos.map((photo) => (
            <article key={photo.gallery_id} className="galerie-item">
              <button
                type="button"
                className="photo-button"
                onClick={() =>
                  setSelectedPhoto(formatImageUrl(photo.gallery_link))
                }
              >
                <img
                  src={formatImageUrl(photo.gallery_link)}
                  alt={photo.gallery_description ?? "Photo de la galerie"}
                  className="photo"
                  loading="lazy"
                />
              </button>

              <div className="photo-description">
                {photo.gallery_description ?? "Aucune description"}
              </div>

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
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <GalleryModal
          onClose={() => setIsModalOpen(false)}
          onAddPhoto={handleAddPhoto}
          eventId={Number(id)}
          userId={currentUser.id}
        />
      )}

      {photoToEdit !== null && (
        <div className="modal-overlay">
          <dialog className="modal" aria-modal="true" open>
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
          </dialog>
        </div>
      )}

      {photoToDelete !== null && (
        <div className="modal-overlay">
          <div className="modal" role="alertdialog" aria-modal="true">
            <h2>Supprimer cette photo ?</h2>

            <p>Cette action est irréversible.</p>

            <div className="modal-actions">
              <button type="button" onClick={() => setPhotoToDelete(null)}>
                Annuler
              </button>
              <button
                type="button"
                className="delete-confirm"
                onClick={confirmDeletePhoto}
              >
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
          >
            <X size={32} />
          </button>

          <img
            src={selectedPhoto}
            alt="Aperçu en plein écran"
            className="image-modal"
          />
        </div>
      )}
    </section>
  );
}

export default Galerie;
