import "./Dashboard.css";
import { motion } from "framer-motion";
import {
  Book,
  CalendarClock,
  Hand,
  HandCoins,
  PiggyBank,
  UsersRound,
} from "lucide-react";
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
  const MotionHand = motion(Hand);
  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="event-name"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {eventName}
      </motion.h1>

      <motion.h1
        className="user-name"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Salut, {userName}
        <MotionHand
          size={20}
          animate={{ rotate: [0, 25, -25, 25, -25, 25, -25, 25, -25, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.5,
          }}
        />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {eventData[0]?.event_description}
      </motion.p>

      <div className="dashboard-stats">
        {[
          {
            icon: <UsersRound size={20} />,
            title: "Total de participants",
            value: totalParticipants,
            className: "stat-1",
          },
          {
            icon: <Book size={20} />,
            title: "Reservations",
            value: totalReservations,
            className: "stat-2",
          },
          {
            icon: <HandCoins size={20} />,
            title: "Budget total",
            value: `${totalBudget}€`,
            className: "stat-3",
          },
          {
            icon: <PiggyBank size={20} />,
            title: "Budget propre",
            value: `${userAndBudgetData[0]?.budget_price || 0}€`,
            className: "stat-4",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className={stat.className}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: index * 0,
            }}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
          >
            <p>
              {stat.icon}
              {stat.title}
            </p>
            <h2>{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-components">
        <motion.div
          className="component-recent-reservations"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="component-header">
            <h3>
              <CalendarClock size={20} />
              Réservations récentes
            </h3>
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
              {reservationData.map((reservation, index) => (
                <motion.div
                  className="row"
                  key={reservation.reservation_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.45 + index * 0.05,
                  }}
                >
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
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <TodoList eventId={event} todo_id_user={userId} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GalerieDashboard />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
