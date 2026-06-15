import { MapPin, PencilLine } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const { id: user_id } = JSON.parse(localStorage.getItem("user") || "{}");
  const isHost = user_id === event_host_id;
  const [currentImage, setCurrentImage] = useState(image);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventUpdated = (updatedEvent: EventData) => {
    setCurrentImage(updatedEvent.event_picture);
  };
  return (
    <>
      <button
        type="button"
        className="CardEvents-Global"
        onClick={() => navigate(`/tableaudebord/${event_id}`)}
        onKeyUp={(e) =>
          e.key === "Enter" && navigate(`/tableaudebord/${event_id}`)
        }
      >
        <div className="CardEvents-ImageDate">
          <img className="CardEvents-Image" src={currentImage} alt={imageAlt} />
          <span className="CardEvents-Date">
            <span className="CardEvents-Date-Day">{formatDay(date)}</span>
            <span className="CardEvents-Date-Month">{formatMonth(date)}</span>
          </span>
        </div>

        <div className="CardEvents-Container">
          <h3 className="CardEvents-Title">{title}</h3>
          <p className="CardEvents-Description">{description}</p>
          <span className="CardEvents-Location">
            <MapPin size={14} /> {location}
          </span>
        </div>
      </button>
      {isHost && (
        <button
          type="button"
          className="CardEvents-EditImage"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <PencilLine size={16} />
        </button>
      )}
      <ModalEditEvent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{
          event_id,
          event_host_id,
          event_name: title,
          event_date_start: date,
          event_date_end: date,
          event_description: description,
          event_location: location,
          event_picture: currentImage,
          event_link_key: "",
        }}
        onEventUpdated={handleEventUpdated}
      />
    </>
  );
}

export default CardEvents;
