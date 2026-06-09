import { useEffect, useState } from "react";

import type { EventData, FilterType } from "../../types/Events";

import ButtonAddEvent from "../../components/AddEvents/ButtonAddEvent";
import CardEvents from "../../components/AddEvents/CardEvents";
import Filter from "../../components/AddEvents/Filter";
import ModalAddEvent from "../../components/AddEvents/ModalAddEvent";

import "./HomeEvents.css";

// const events = [
//   {
//     id: 1,
//     image: "https://picsum.photos/400/200",
//     imageAlt: "Concert de jazz",
//     date: "2026-05-10",
//     title: "Festival de Jazz",
//     description: "Une soirée inoubliable avec les meilleurs musiciens de jazz.",
//     location: "Paris, France",
//   },
//   {
//     id: 2,
//     image: "https://picsum.photos/400/201",
//     imageAlt: "Exposition d'art",
//     date: "2026-06-22",
//     title: "Exposition Art Moderne",
//     description:
//       "Découvrez les œuvres d'artistes contemporains du monde entier.",
//     location: "Lyon, France",
//   },
//   {
//     id: 3,
//     image: "https://picsum.photos/400/203",
//     imageAlt: "Exposition d'art",
//     date: "2026-06-15",
//     title: "Expo",
//     description:
//       "Découvrez les œuvres d'artistes contemporains du monde entier.",
//     location: "Lyon, France",
//   },
//   {
//     id: 4,
//     image: "https://picsum.photos/400/204",
//     imageAlt: "Exposition d'art",
//     date: "2026-11-22",
//     title: "Exposition Art Moderne",
//     description:
//       "Découvrez les œuvres d'artistes contemporains du monde entier.",
//     location: "Lyon, France",
//   },
//   {
//     id: 5,
//     image: "https://picsum.photos/400/205",
//     imageAlt: "Exposition d'art",
//     date: "2026-06-03",
//     title: "Exposition Art Moderne",
//     description:
//       "Découvrez les œuvres d'artistes contemporains du monde entier.",
//     location: "Lyon, France",
//   },
//   {
//     id: 6,
//     image: "https://picsum.photos/400/205",
//     imageAlt: "je ne sais pas ",
//     date: "2025-06-02",
//     title: "Je ne sais pas",
//     description: "On ne sais pas ce qui va se passer.",
//     location: "Jenecpaou, Kelkepar",
//   },
// ];

function HomeEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`${import.meta.env.VITE_API_URL}/api/events?userId=${user.id}`) // --> il recupere l'userid pour afficher les events de l'id connecté
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // je met l'heure à 00h00m00s00ms pour comparer les jours sans l'heure

  const filteredEvents = events
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    ) // filtre directement les cards par ordre chronologique
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      if (activeFilter === "ongoing") return eventDate >= today;
      if (activeFilter === "finished") return eventDate < today;
      return true;
    });
  // filtre quand le bouton est activé si c'est en cours ou terminé

  const handleEventCreated = (newEvent: EventData) => {
    setEvents((prev) => [...prev, newEvent]);
  };

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
            key={event.event_id}
            image={event.event_picture}
            imageAlt={event.event_name}
            date={event.event_date}
            title={event.event_name}
            description={event.event_description}
            location={event.event_location}
          />
        ))}
      </div>
      <ModalAddEvent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
}

export default HomeEvents;
