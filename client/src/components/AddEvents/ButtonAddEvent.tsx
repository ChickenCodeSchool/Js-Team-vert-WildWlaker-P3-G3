import type { ButtonAddEventProps } from "../../types/Events";

import "./ButtonAddEvent.css";

function ButtonAddEvent({ onClick }: ButtonAddEventProps) {
  return (
    <button type="button" className="ButtonAddEvent-Global" onClick={onClick}>
      + Créer un événement
    </button>
  );
}

export default ButtonAddEvent;
