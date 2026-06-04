import "./Galerie.css";

import { useState } from "react";

import { ImagePlus } from "lucide-react";

import GalleryModal from "./GalleryModal";

import campfire from "../../assets/images/campfire.png";
import champagne from "../../assets/images/champagne.png";
import cocktail from "../../assets/images/cocktail.png";
import dessert from "../../assets/images/dessert.png";
import eventMain from "../../assets/images/event-main.png";
import lounge from "../../assets/images/lounge.png";
import music from "../../assets/images/music.png";

function Galerie() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const photos = [
    {
      id: 1,
      link: eventMain,
      description: "Réception de mariage au coucher du soleil",
    },
    {
      id: 2,
      link: cocktail,
      description: "Cocktails servis pendant la réception",
    },
    {
      id: 3,
      link: campfire,
      description: "Invités réunis autour d'un feu de camp",
    },
    {
      id: 4,
      link: music,
      description: "Groupe de musique jouant en soirée",
    },
    {
      id: 5,
      link: dessert,
      description: "Buffet de desserts pour les invités",
    },
    {
      id: 6,
      link: champagne,
      description: "Toast au champagne pendant la célébration",
    },
    {
      id: 7,
      link: lounge,
      description: "Espace lounge décoré pour l'événement",
    },
  ];

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
          <article key={photo.id} className="galerie-item">
            <img src={photo.link} alt={photo.description} className="photo" />
          </article>
        ))}
      </div>

      {isModalOpen && <GalleryModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}

export default Galerie;
