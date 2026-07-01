import "./EventEmpty.css";

function EventEmpty() {
  return (
    <div className="EventEmpty-Global">
      <div className="EventEmpty-TextGlobal">
        <p className="EventEmpty-Text-EventNone">
          Vous n'avez aucun événement pour le moment.
        </p>
        <p className="EventEmpty-Text-Clic">
          Cliquez sur le bouton "Créer ou rejoindre un événement".
        </p>
      </div>
      <svg
        className="EventEmpty-Arrow"
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          className="EventEmpty-Path"
          d="
            M0 330
            C20 300, 220 330, 290 300
            C340 270, 340 200, 270 205
            C220 210, 220 290, 290 290
            C370 300, 450 270, 500 90
          "
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          className="EventEmpty-Head"
          d="M470 120 L500 85 L525 130"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default EventEmpty;
