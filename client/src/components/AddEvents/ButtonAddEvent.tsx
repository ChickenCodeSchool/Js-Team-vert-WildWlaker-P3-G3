import type { ButtonAddEventProps } from "../../types/Events";

import "./ButtonAddEvent.css";

function ButtonAddEvent({ onClick }: ButtonAddEventProps) {
  return (
    <button type="button" className="ButtonAddEvent" onClick={onClick}>
      + Créer un événement
    </button>
  );
}

export default ButtonAddEvent;
