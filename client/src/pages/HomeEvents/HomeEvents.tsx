import { useEffect, useState } from "react";

import type { EventData, FilterType } from "../../types/Events";

import ButtonAddEvent from "../../components/AddEvents/ButtonAddEvent";
import CardEvents from "../../components/AddEvents/CardEvents";
import Filter from "../../components/AddEvents/Filter";
import ModalAddEvent from "../../components/AddEvents/ModalAddEvent";
import NavBar from "../../components/NavBar/NavBar";
import Profil from "../../components/Profil/Profil";

import "./HomeEvents.css";
import EventEmpty from "../../components/AddEvents/EventEmpty";
type User = {
  id: number;
};

function HomeEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterType>("ongoing");
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/authVerif`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/events?userId=${user.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, [user?.id]);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // je met l'heure à 00h00m00s00ms pour comparer les jours sans l'heure

  const filteredEvents = events
    .filter((event) => {
      const endDate = new Date(event.event_date_end);
      if (activeFilter === "ongoing") return endDate >= today;
      if (activeFilter === "finished") return endDate < today;
      return true;
    }) // filtre quand le bouton est activé si c'est en cours ou terminé
    .sort((a, b) => {
      if (activeFilter === "finished") {
        return (
          new Date(b.event_date_end).getTime() -
          new Date(a.event_date_end).getTime()
        );
      }
      return (
        new Date(a.event_date_start).getTime() -
        new Date(b.event_date_start).getTime()
      );
    }); // filtre directement les cards par ordre chronologique

  const handleEventCreated = (newEvent: EventData) => {
    setEvents((prev) => [...prev, newEvent]);
  };
  const handleEventDeleted = (deletedId: number) => {
    setEvents((prev) => prev.filter((ev) => ev.event_id !== deletedId));
  };

  return (
    <>
      <header className="HomeEvents-NavBar">
        <NavBar />
        <Profil />
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
          {filteredEvents.length === 0 ? (
            <EventEmpty />
          ) : (
            filteredEvents.map((event) => (
              <CardEvents
                key={event.event_id}
                user_id={user?.id ?? 0}
                event_id={event.event_id}
                event_id_host={event.event_id_host}
                image={event.event_picture}
                imageAlt={event.event_name}
                dateStart={event.event_date_start}
                dateEnd={event.event_date_end}
                title={event.event_name}
                description={event.event_description}
                location={event.event_location}
                onEventDeleted={handleEventDeleted}
              />
            ))
          )}
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
