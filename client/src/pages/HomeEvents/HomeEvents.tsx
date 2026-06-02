import { useState } from "react";

import ButtonAddEvent from "../../components/AddEvents/ButtonAddEvent";
import CardEvents from "../../components/AddEvents/CardEvents";
import ModalAddEvent from "../../components/AddEvents/ModalAddEvent";

import "./HomeEvents.css";

const events = [
  {
    id: 1,
    image: "https://picsum.photos/400/200",
    imageAlt: "Concert de jazz",
    date: "15 juin 2025",
    title: "Festival de Jazz",
    description: "Une soirée inoubliable avec les meilleurs musiciens de jazz.",
    location: "Paris, France",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/201",
    imageAlt: "Exposition d'art",
    date: "22 juin 2025",
    title: "Exposition Art Moderne",
    description:
      "Découvrez les œuvres d'artistes contemporains du monde entier.",
    location: "Lyon, France",
  },
];

function HomeEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="HomeEvents-Global">
      <div className="HomeEvents-Title">
        <h1>Mes Evénements</h1>
        <ButtonAddEvent onClick={() => setIsModalOpen(true)} />
      </div>
      <div className="HomeEvents-CardGlobal">
        {events.map((event) => (
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
