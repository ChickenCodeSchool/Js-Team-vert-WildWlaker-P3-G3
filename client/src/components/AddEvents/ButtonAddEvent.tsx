import type { ButtonAddEventProps } from "../../types/Events";

import "./ButtonAddEvent.css";

function ButtonAddEvent({ onClick }: ButtonAddEventProps) {
  return (
    <button type="button" className="ButtonAddEvent" onClick={onClick}>
      Gérer mes évenement
    </button>
  );
}

export default ButtonAddEvent;
