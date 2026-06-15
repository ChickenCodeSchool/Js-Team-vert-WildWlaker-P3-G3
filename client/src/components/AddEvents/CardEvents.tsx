import { useNavigate } from "react-router";
import { useState } from "react";
import { MapPin, PencilLine } from "lucide-react";
import type { CardEventsProps } from "../../types/Events";

import ModalImagePicker from "./ModalImagePicker";
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
  const [images, setImages] = useState<string[]>([]);

  const openImageModal = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/images`,
    );
    const data = await res.json();
    setImages(data);
    setIsModalOpen(true);
  };
  const handleSelectImage = async (imageUrl: string) => {
    const fullUrl = `${import.meta.env.VITE_API_URL}${imageUrl}`;
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/${event_id}/picture`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_picture: fullUrl }),
      },
    );
    setCurrentImage(fullUrl);
    setIsModalOpen(false);
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
          onClick={openImageModal}
        >
          <PencilLine size={16} />
        </button>
      )}
      <ModalImagePicker
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        onSelectImage={handleSelectImage}
      />
    </>
  );
}

export default CardEvents;
