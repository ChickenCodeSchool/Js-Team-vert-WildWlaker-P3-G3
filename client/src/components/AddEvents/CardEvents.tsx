import { MapPin, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import type { CardEventsProps, EventData } from "../../types/Events";
import ModalEditEvent from "./ModalEditEvent";
import "./CardEvents.css";

const formatDay = (date: string): string => {
  return `${new Date(date).getDate()}`;
};

const formatMonth = (date: string): string => {
  const months = [
    "Jan",
    "Fév",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];
  return months[new Date(date).getMonth()];
};

function CardEvents({
  event_id,
  event_host_id,
  image,
  imageAlt,
  date,
  title,
  description,
  location,
}: CardEventsProps) {
  const uselocation = useLocation();
  const onTableau = uselocation.pathname.startsWith("/tableaudebord/");
  const { id: user_id } = JSON.parse(localStorage.getItem("user") || "{}");
  const isHost = user_id === event_host_id;
  const [currentImage, setCurrentImage] = useState(image);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [currentDate, setCurrentDate] = useState(date);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEventUpdated = (updatedEvent: EventData) => {
    setCurrentImage(updatedEvent.event_picture);
    setCurrentTitle(updatedEvent.event_name);
    setCurrentDescription(updatedEvent.event_description);
    setCurrentLocation(updatedEvent.event_location);
    setCurrentDate(updatedEvent.event_date_start);
  };
  const handleDeleteReservation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/reservations/delete/${event_id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur suppression");
      }

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="CardEvents-Wrapper">
        <Link to={`/tableaudebord/${event_id}`} className="CardEvents-Global">
          <div className="CardEvents-ImageDate">
            <img
              className="CardEvents-Image"
              src={currentImage}
              alt={imageAlt}
            />
            <span className="CardEvents-Date">
              <span className="CardEvents-Date-Day">
                {formatDay(currentDate)}
              </span>
              <span className="CardEvents-Date-Month">
                {formatMonth(currentDate)}
              </span>
            </span>
          </div>
          <div className="CardEvents-Container">
            <h3 className="CardEvents-Title">{currentTitle}</h3>
            <p className="CardEvents-Description">{currentDescription}</p>
            <span className="CardEvents-Location">
              <MapPin size={14} /> {currentLocation}
            </span>
          </div>
        </Link>

        {isHost && (
          <button
            type="button"
            className="CardEvents-Edit"
            onClick={() => setIsModalOpen(true)}
          >
            <PencilLine size={16} />
          </button>
        )}
        {onTableau && (
          <button
            type="button"
            className="CardEvents-Edit"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 size={16} />
          </button>
        )}
        {isDeleteModalOpen && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Supprimer la réservation</h3>

              <p>Êtes-vous sûr de vouloir supprimer cette réservation ?</p>

              <div className="delete-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Annuler
                </button>

                <button type="button" onClick={handleDeleteReservation}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalEditEvent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{
          event_id,
          event_host_id,
          event_name: currentTitle,
          event_date_start: currentDate,
          event_date_end: currentDate,
          event_description: currentDescription,
          event_location: currentLocation,
          event_picture: currentImage,
          event_link_key: "",
        }}
        onEventUpdated={handleEventUpdated}
      />
    </>
  );
}

export default CardEvents;
