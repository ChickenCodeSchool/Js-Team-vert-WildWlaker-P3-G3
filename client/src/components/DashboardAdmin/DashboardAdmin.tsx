import { useEffect, useState } from "react";
import "./DashboardAdmin.css";
import { Calendar, TriangleAlert, Users } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AllReports = {
  reported_user_id: number;
  reported_event_id: number;
  reported_bug_id: number;
};
type AllUsers = {
  user_id: number;
};
type AllEvents = {
  event_id: number;
};
type ArrayReport = {
  user_name: string;
  report_type: "user" | "bug" | "event";
  description: string;
  report_date: string;
};
type ArrayUser = {
  user_id: number;
  user_name: string;
  user_username: string;
  user_profile_picture: string;
  user_joining_date: string;
};
type GraphicAdmin = {
  month_number: number;
  month: string;
  users: number;
  events: number;
  reports: number;
};
function DashboardAdmin() {
  const [reportBug, setReportBug] = useState<AllReports[]>([]);
  const [reportUser, setReportUser] = useState<AllReports[]>([]);
  const [reportEvent, setReportEvent] = useState<AllReports[]>([]);
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [allEvents, setAllEvents] = useState<AllEvents[]>([]);
  const [arrayReport, setArrayReport] = useState<ArrayReport[]>([]);
  const [arrayUser, setArrayUser] = useState<ArrayUser[]>([]);
  const [graphic, setGraphic] = useState<GraphicAdmin[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportUser")
      .then((res) => res.json())
      .then((data) => setReportUser(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportBug")
      .then((res) => res.json())
      .then((data) => setReportBug(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportEvent")
      .then((res) => res.json())
      .then((data) => setReportEvent(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/events")
      .then((res) => res.json())
      .then((data) => setAllEvents(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/arrayReport")
      .then((res) => res.json())
      .then((data) => setArrayReport(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/arrayUser")
      .then((res) => res.json())
      .then((data) => setArrayUser(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/dashboard-chart")
      .then((res) => res.json())
      .then((data) => {
        console.log("GRAPHIC DATA =", data);

        if (Array.isArray(data)) {
          setGraphic(data);
        } else if (Array.isArray(data.result)) {
          setGraphic(data.result);
        } else if (Array.isArray(data.rows)) {
          setGraphic(data.rows);
        } else {
          setGraphic([]);
        }
      });
  }, []);

  const totalIdsUsers = allUsers.reduce((total, report) => {
    return total + (report.user_id ? 1 : 0);
  }, 0);

  const totalIdsEvents = allEvents.reduce((total, report) => {
    return total + (report.event_id ? 1 : 0);
  }, 0);

  const totalReports =
    reportBug.length + reportEvent.length + reportUser.length;

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR");
  }

  return (
    <main className="admin-dashboard">
      <section className="stats-grid">
        <article className="stat-card">
          <Calendar />
          <p>Total des evenements</p>
          <h2>{totalIdsEvents}</h2>
        </article>

        <article className="stat-card">
          <Users />
          <p>Total des utilisateurs</p>
          <h2>{totalIdsUsers}</h2>
        </article>

        <article className="stat-card">
          <TriangleAlert />
          <p>Rapports actifs</p>
          <h2>{totalReports}</h2>
        </article>
      </section>

      <section className="chart-card">
        <div className="chart-header">
          <div>
            <h2>Activité de la plateforme</h2>
            <p>Évolution mensuelle des utilisateurs, événements et reports</p>
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={graphic}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" axisLine={false} tickLine={false} />

              <YAxis axisLine={false} tickLine={false} />

              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="users"
                name="Utilisateurs"
                stroke="#ff7e5f"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="events"
                name="Événements"
                stroke="#3b82f6"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="reports"
                name="Reports"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bottom-grid">
        <article className="reports-card">
          <div className="card-title">
            <h2>Rapports récents</h2>
          </div>

          <div className="tableau-rapport">
            <div className="titre-tableau-rapport">
              <h3>Utilisateur</h3>
              <h3>Ticket</h3>
              <h3>Description</h3>
              <h3>Date</h3>
            </div>
            <div className="contenu-tableau-rapport">
              {arrayReport.map((report) => (
                <div key={`${report.user_name}-${report.report_date}`}>
                  <p>{report.user_name}</p>
                  <p>{report.report_type}</p>
                  <p>{report.description}</p>
                  <p>{formatDate(report.report_date)}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="users-card">
          <div className="card-title">
            <h2>Nouveaux utilisateurs</h2>
          </div>

          <div className="users-list">
            {arrayUser.map((user) => (
              <div className="user-row" key={user.user_id}>
                <img
                  src={`http://localhost:3310${user.user_profile_picture}`}
                  alt={user.user_name}
                />

                <div>
                  <h3>{user.user_name}</h3>
                  <p>
                    {user.user_username} • Rejoint le{" "}
                    {formatDate(user.user_joining_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
export default DashboardAdmin;
