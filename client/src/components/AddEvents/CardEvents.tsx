import type { CardEventsProps } from "../../types/Events";

import "./CardEvents.css";

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
      <img className="CardEvents-Image" src={image} alt={imageAlt} />

      <div className="CardEvents-Container">
        <span className="CardEvents-Date">{date}</span>
        <h3 className="CardEvents-Title">{title}</h3>
        <p className="CardEvents-Description">{description}</p>
        <span className="CardEvents-Location">📍 {location}</span>
      </div>
    </div>
  );
}

export default CardEvents;
