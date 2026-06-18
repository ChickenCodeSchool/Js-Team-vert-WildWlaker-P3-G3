import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GalerieDashboard from "../GalerieDashboard/GalerieDashboard";
import TodoList from "../ToDoList/TodoList";

type EventDashboard = {
  event_name: string;
  euj_id_user: number | null;
  reservation_id: number | null;
  budget_price: string | number | null;
  event_description: string | null;
};
type ReservationDashboard = {
  event_id: number | null;
  user_name: string;
  reservation_location: string;
  reservation_date: string;
  reservation_id: number;
};
type UserAndBudget = {
  budget_price: string | number | null;
  user_name: string | null;
  event_id: number;
};

function Dashboard() {
  const [eventData, setEventData] = useState<EventDashboard[]>([]);
  const [reservationData, setReservationData] = useState<
    ReservationDashboard[]
  >([]);
  const [userName, setUserName] = useState<string>("");
  const [userAndBudgetData, setUserAndBudgetData] = useState<UserAndBudget[]>(
    [],
  );
  const { id } = useParams();
  const event = Number(id);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3310/api/username/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // vérifie ce que tu reçois vraiment
        setUserName(data.username); // doit matcher ce que retourne l'API
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/reservations/${event}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("reservations:", data);
        setReservationData(Array.isArray(data) ? data : []);
      });
  }, [event]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/users/description/${event}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("eventData:", data);
        setEventData(Array.isArray(data) ? data : []);
      });
  }, [event]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/users/${event}/userAndBudget`)
      .then((res) => res.json())
      .then((data) => {
        console.log("userAndBudget:", data);
        setUserAndBudgetData(Array.isArray(data) ? data : []);
      });
  }, [event]);
  const totalReservations = new Set(
    eventData.map((item) => item.reservation_id).filter((id) => id !== null),
  ).size;

  const totalParticipants = new Set(
    eventData.map((item) => item.euj_id_user).filter((id) => id !== null),
  ).size;

  const totalBudget = eventData.reduce((total, item) => {
    return total + Number(item.budget_price ?? 0);
  }, 0);

  const eventName = eventData[0]?.event_name ?? "Nom de l'event";

  function getInitials(userName: string) {
    return userName
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("");
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR");
  }

  function getReservationStatus(date: string) {
    const today = new Date();
    const reservationDate = new Date(date);

    return reservationDate < today ? "Passé" : "À venir";
  }
  function getReservationStatusCss(date: string) {
    const today = new Date();
    const reservationDate = new Date(date);

    return reservationDate < today ? "passe" : "a_venir";
  }
  return (
    <div className="dashboard">
      <h1 className="event-name">{eventName}</h1>
      <h1 className="user-name">Salut, {userName}</h1>
      <p> {eventData[0]?.event_description}</p>

      <div className="dashboard-stats">
        <div className="stat-1">
          <p>Total de participants</p>
          <h2>{totalParticipants}</h2>
        </div>
        <div className="stat-2">
          <p>Reservations</p>
          <h2>{totalReservations}</h2>
        </div>
        <div className="stat-3">
          <p>Budget total</p>
          <h2>{totalBudget}€</h2>
        </div>
        <div className="stat-4">
          <p>Budget propre</p>
          <h2>{userAndBudgetData[0]?.budget_price || 0}€</h2>
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
              <h4 className="statut">Statut</h4>
            </div>
            <div className="scroll">
              {reservationData.map((reservation) => (
                <div className="row" key={`${reservation.reservation_id}`}>
                  <div className="name">
                    <p className="initials">
                      {getInitials(reservation.user_name)}
                    </p>

                    <p>{reservation.user_name}</p>
                  </div>

                  <p>{reservation.reservation_location}</p>

                  <p>{formatDate(reservation.reservation_date)}</p>

                  <p
                    className={getReservationStatusCss(
                      reservation.reservation_date,
                    )}
                  >
                    {getReservationStatus(reservation.reservation_date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TodoList eventId={event} todo_id_user={userId} />
        <GalerieDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
