import "./Dashboard.css";

function Dashboard() {
  const reservations = [
    {
      organizer: "Jean Dupont",
      initials: "JD",
      place: "Paris",
      date: "12/12/2024",
      status: "Confirmé",
    },
    {
      organizer: "Marie Martin",
      initials: "MM",
      place: "Toulouse",
      date: "14/12/2024",
      status: "En attente",
    },
    {
      organizer: "Paul Bernard",
      initials: "PB",
      place: "Lyon",
      date: "18/12/2024",
      status: "Confirmé",
    },
  ];

  return (
    <div className="dashboard">
      <h1>Nom de l'event</h1>
      <h1>Salut, User </h1>
      <p>Description Event</p>

      <div className="dashboard-stats">
        <div className="stat-1">
          <p>Total de participants</p>
          <h2>125</h2>
        </div>
        <div className="stat-2">
          <p>Nombre de reservations</p>
          <h2>12</h2>
        </div>
        <div className="stat-3">
          <p>Budget total</p>
          <h2>5000€</h2>
        </div>
        <div className="stat-4">
          <p>Budget propre</p>
          <h2>3000€</h2>
        </div>
      </div>

      <div className="dashboard-components">
        <div className="component-recent-reservations">
          <div className="component-header">
            <h3>Réservations récentes</h3>

            <button type="button">Voir tout</button>
          </div>

          <div className="component-array">
            <div className="row-title">
              <h4>Organisateur</h4>
              <h4>Lieux</h4>
              <h4>Date</h4>
              <h4>Statut</h4>
            </div>

            {reservations.map((reservation) => (
              <div
                className="row"
                key={`${reservation.organizer}-${reservation.date}`}
              >
                <div className="name">
                  <p className="initials">{reservation.initials}</p>

                  <p>{reservation.organizer}</p>
                </div>

                <p>{reservation.place}</p>

                <p>{reservation.date}</p>

                <p>{reservation.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* component todo */}
        {/* component galerie */}
      </div>
    </div>
  );
}

export default Dashboard;
