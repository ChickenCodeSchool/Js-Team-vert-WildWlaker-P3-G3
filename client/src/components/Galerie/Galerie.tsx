import "./Galerie.css";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import GalleryModal from "./GalleryModal";
import { PhotoItem } from "./PhotoItem";

const API_URL = import.meta.env.VITE_API_URL;

type User = { id: number };
type Gallery = {
  gallery_id: number;
  gallery_id_event: number;
  gallery_id_user: number;
  gallery_link: string;
  gallery_description: string | null;
  gallery_creation_date: string | null;
  event_host_id: number;
  like_count: number;
};

const getUserFromStorage = (): User => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? { id: JSON.parse(stored).id ?? 0 } : { id: 0 };
  } catch {
    return { id: 0 };
  }
};

function Galerie() {
  const segments = window.location.pathname.split("/");
  const id = segments[segments.indexOf("galerie") - 1] || segments[2];

  // Utilisation directe de l'ID pour éviter les boucles infinies sur l'objet currentUser
  const currentUser = getUserFromStorage();
  const currentUserId = currentUser.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Gallery[]>([]);
  const [eventName, setEventName] = useState<string>("Chargement...");
  const [photoToEdit, setPhotoToEdit] = useState<Gallery | null>(null);
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);

  const formatImageUrl = (link: string): string => {
    if (!link) return "";
    return link.startsWith("http") ? link : `${API_URL}${link}`;
  };

  useEffect(() => {
    if (!id || currentUserId === 0) return;
    fetch(`${API_URL}/api/gallery/${id}/likes/${currentUserId}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setLikedPhotos(data))
      .catch((err) => console.error("Erreur likes:", err));
  }, [id, currentUserId]);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const galRes = await fetch(`${API_URL}/api/gallery/${id}`, {
          signal: controller.signal,
        });
        if (galRes.ok) {
          setPhotos(await galRes.json());
        } else {
          setError("Impossible de charger la galerie.");
        }

        const evRes = await fetch(`${API_URL}/api/events/${id}`, {
          signal: controller.signal,
        });
        if (evRes.ok) {
          setEventName((await evRes.json()).event_name || "Mon Événement");
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Erreur réseau lors du chargement.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    return () => controller.abort();
  }, [id]);

  const toggleLike = async (photoId: number) => {
    const isAlreadyLiked = likedPhotos.includes(photoId);
    try {
      const url = `${API_URL}/api/gallery/${photoId}/like${isAlreadyLiked ? `/${currentUserId}` : ""}`;
      const response = await fetch(url, {
        method: isAlreadyLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: isAlreadyLiked
          ? undefined
          : JSON.stringify({ user_id: currentUserId }),
      });

      if (response.ok) {
        setLikedPhotos((prev) =>
          isAlreadyLiked
            ? prev.filter((fid) => fid !== photoId)
            : [...prev, photoId],
        );
        setPhotos((prev) =>
          prev.map((p) =>
            p.gallery_id === photoId
              ? {
                  ...p,
                  like_count: Math.max(
                    0,
                    p.like_count + (isAlreadyLiked ? -1 : 1),
                  ),
                }
              : p,
          ),
        );
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleAddPhoto = (
    imageUrl: string,
    insertId: number,
    textDescription: string,
  ) => {
    setPhotos((prev) => [
      {
        gallery_id: insertId,
        gallery_id_event: Number(id),
        gallery_id_user: currentUserId,
        gallery_link: imageUrl,
        gallery_description: textDescription || "Ajout galerie",
        gallery_creation_date: new Date().toISOString(),
        event_host_id: prev[0]?.event_host_id ?? 0,
        like_count: 0,
      },
      ...prev,
    ]);
    setIsModalOpen(false);
  };

  const confirmDeletePhoto = async () => {
    if (photoToDelete === null) return;
    try {
      const res = await fetch(
        `${API_URL}/api/gallery/${photoToDelete}/${currentUserId}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.gallery_id !== photoToDelete));
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    } finally {
      setPhotoToDelete(null);
    }
  };

  const handleUpdateDescription = async () => {
    if (!photoToEdit) return;
    try {
      const res = await fetch(
        `${API_URL}/api/gallery/${photoToEdit.gallery_id}/${currentUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gallery_description: newDescription }),
        },
      );
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) =>
            p.gallery_id === photoToEdit.gallery_id
              ? { ...p, gallery_description: newDescription }
              : p,
          ),
        );
        setPhotoToEdit(null);
      }
    } catch (err) {
      console.error("Erreur modification:", err);
    }
  };

  return (
    <section className="galerie">
      <div className="galerie-header">
        <h1>{eventName}</h1>
        <button
          type="button"
          className="galerie-button"
          onClick={() => setIsModalOpen(true)}
        >
          <ImagePlus size={20} /> Ajouter une photo
        </button>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="error-dismiss"
            onClick={() => setError(null)}
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

      {!isLoading && photos.length === 0 && (
        <div className="galerie-empty">
          <p>Aucune photo. Ajoutez-en une !</p>
        </div>
      )}

      {!isLoading && photos.length > 0 && (
        <div className="galerie-grid" aria-label="Galerie de l'événement">
          {photos.map((photo) => (
            <PhotoItem
              key={photo.gallery_id}
              photo={{
                ...photo,
                gallery_link: formatImageUrl(photo.gallery_link),
              }}
              isLiked={likedPhotos.includes(photo.gallery_id)}
              onPreview={(url) => setSelectedPhoto(url)}
              onLike={toggleLike}
              onDelete={(fid) => setPhotoToDelete(fid)}
              onEdit={(p) => {
                setPhotoToEdit(p);
                setNewDescription(p.gallery_description ?? "");
              }}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <GalleryModal
          onClose={() => setIsModalOpen(false)}
          onAddPhoto={handleAddPhoto}
          eventId={Number(id)}
          userId={currentUserId}
        />
      )}

      {photoToEdit !== null && (
        <div className="modal-overlay">
          <dialog className="modal" open>
            <h2>Modifier la description</h2>
            <input
              type="text"
              className="modal-input"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
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
          <div className="modal" role="alertdialog">
            <h2>Supprimer cette photo ?</h2>
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
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>
          <img src={selectedPhoto} alt="Aperçu" className="image-modal" />
        </div>
      )}
    </section>
  );
}

export default Galerie;
