import { useEffect, useState } from "react";

import type { EventData, FilterType } from "../../types/Events";

import ButtonAddEvent from "../../components/AddEvents/ButtonAddEvent";
import CardEvents from "../../components/AddEvents/CardEvents";
import Filter from "../../components/AddEvents/Filter";
import ModalAddEvent from "../../components/AddEvents/ModalAddEvent";

import "./HomeEvents.css";
import NavBar from "../../components/NavBar/NavBar";

function HomeEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}"); // --> recupere dans le local storage l'user id
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
    <>
      <header>
        <NavBar />
      </header>
      <div className="HomeEvents-Global">
        <div className="HomeEvents-Title">
          <h1>Mes Evénements</h1>
        </div>
        <div className="HomeEvents-FilterAdd">
          <Filter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <ButtonAddEvent onClick={() => setIsModalOpen(true)} />
        </div>
        <div className="HomeEvents-CardGlobal">
          {filteredEvents.map((event) => (
            <CardEvents
              key={event.event_id}
              event_id={event.event_id}
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
    </>
  );
}

export default HomeEvents;
