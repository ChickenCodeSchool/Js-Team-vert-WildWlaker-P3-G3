import type { CardEventsProps } from "../../types/Events";

import { MapPin } from "lucide-react";

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
  image,
  imageAlt,
  date,
  title,
  description,
  location,
}: CardEventsProps) {
  return (
    <div className="CardEvents-Global">
      <div className="CardEvents-ImageDate">
        <img className="CardEvents-Image" src={image} alt={imageAlt} />
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
    </div>
  );
}

export default CardEvents;
