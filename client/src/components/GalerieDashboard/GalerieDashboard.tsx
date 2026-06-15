import "./GalerieDashboard.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

type Gallery = {
  gallery_id: number;
  gallery_id_event: number;
  gallery_id_user: number;
  gallery_link: string;
  gallery_description: string | null;
  gallery_creation_date: string | null;
};

function GalerieDashboard() {
  const [photos, setPhotos] = useState<Gallery[]>([]);

  const formatImageUrl = (link: string) => {
    if (!link) return "";
    return link.startsWith("http") ? link : `${API_URL}${link}`;
  };
  const { id } = useParams();
  const event = Number(id);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery/${event}`)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error(error));
  }, [event]);

  return (
    <section className="galerie-dash">
      <div className="galerie-header">
        <h1>Galerie récente</h1>
      </div>

      <div className="galerie-grid">
        {photos.map((photo) => (
          <article key={photo.gallery_id} className="galerie-item">
            <img
              src={formatImageUrl(photo.gallery_link)}
              alt={photo.gallery_description ?? "Galerie événement"}
              className="photo"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

export default GalerieDashboard;
