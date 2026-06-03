import { useState } from "react";

import type { FilterType } from "../../types/Events";

import ButtonAddEvent from "../../components/AddEvents/ButtonAddEvent";
import CardEvents from "../../components/AddEvents/CardEvents";
import Filter from "../../components/AddEvents/Filter";
import ModalAddEvent from "../../components/AddEvents/ModalAddEvent";

import "./HomeEvents.css";

const events = [
  {
    id: 1,
    image: "https://picsum.photos/400/200",
    imageAlt: "Concert de jazz",
    date: "2026-05-10",
    title: "Festival de Jazz",
    description: "Une soirée inoubliable avec les meilleurs musiciens de jazz.",
    location: "Paris, France",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/201",
    imageAlt: "Exposition d'art",
    date: "2026-06-22",
    title: "Exposition Art Moderne",
    description:
      "Découvrez les œuvres d'artistes contemporains du monde entier.",
    location: "Lyon, France",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/203",
    imageAlt: "Exposition d'art",
    date: "2026-06-15",
    title: "Expo",
    description:
      "Découvrez les œuvres d'artistes contemporains du monde entier.",
    location: "Lyon, France",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/204",
    imageAlt: "Exposition d'art",
    date: "2026-11-22",
    title: "Exposition Art Moderne",
    description:
      "Découvrez les œuvres d'artistes contemporains du monde entier.",
    location: "Lyon, France",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/205",
    imageAlt: "Exposition d'art",
    date: "2026-06-03",
    title: "Exposition Art Moderne",
    description:
      "Découvrez les œuvres d'artistes contemporains du monde entier.",
    location: "Lyon, France",
  },
];

function HomeEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // je met l'heure à 00h00m00s00ms pour comparer les jours sans l'heure

  const filteredEvents = events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // filtre directement les cards par ordre chronologique
    .filter((event) => {
      const eventDate = new Date(event.date);
      if (activeFilter === "ongoing") return eventDate >= today;
      if (activeFilter === "finished") return eventDate < today;
      return true;
    });
  // filtre quand le bouton est activé si c'est en cours ou terminé

  return (
    <div className="HomeEvents-Global">
      <div className="HomeEvents-Title">
        <h1>Mes Evénements</h1>
      </div>
      <div className="HomeEvents-FilterAdd">
        <Filter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <ButtonAddEvent onClick={() => setIsModalOpen(true)} />
      </div>
      <div className="HomeEvents-CardGlobal">
        {filteredEvents.map((event) => (
          <CardEvents
            key={event.id}
            image={event.image}
            imageAlt={event.imageAlt}
            date={event.date}
            title={event.title}
            description={event.description}
            location={event.location}
          />
        ))}
      </div>
      <ModalAddEvent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default HomeEvents;
